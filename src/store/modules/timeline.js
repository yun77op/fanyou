import {observable, action, computed, runInAction} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou';
import { normalize, schema, denormalize } from 'normalizr';


const userSchema = new schema.Entity('users');
const statusSchema = new schema.Entity('statuses', {
    user: userSchema
});

const statusesSchema = new schema.Array(statusSchema);

export default class TimelineStore extends BaseStore {

    @observable normalizedList = observable([]);
    entities = {};

    @observable refreshing = false;

    min_id = undefined;
    max_id = undefined;
    timeline_key = undefined;

    count = 20;

    stores = {}
    id = undefined;

    setTimelineSlug(id) {
        let store;

        if (this.timeline_key) {
            this.stores[this.timeline_key] = this.stores[this.timeline_key] || {};
            store = this.stores[this.timeline_key];

            if (this.id) {
                store[this.id] = {
                    normalizedList: this.normalizedList,
                    entities: this.entities,
                    min_id: this.min_id,
                    max_id: this.max_id
                };
            }
        }

        this.id = id;

        const record = store && store[this.id] ? store[this.id] : {};

        this.min_id = record.min_id;
        this.max_id = record.max_id;
        this.normalizedList = record.normalizedList || observable([]);
        this.entities = record.entities || {};
    }

    @action addToList(list) {
        if (list.length === 0) return;

        if (this.max_id === undefined) {
            this.max_id = list[0].id;
        }

        this.min_id = list[list.length - 1].id;

        const concatedList = this.list.concat(list);
        this.normalizeList(concatedList);
    }

    @action normalizeList(list) {
        const normalizedData = normalize(list, statusesSchema);

        this.normalizedList = normalizedData.result;
        this.entities = normalizedData.entities;
    }

    @action shiftToList(list) {
        if (list.length === 0) return;

        this.max_id = list[0].id;

        if (this.min_id === undefined) {
            this.min_id = list[list.length - 1].id;
        }

        const concatedList = list.concat(this.list);
        this.normalizeList(concatedList);
    }

    @computed get list() {
        const denormalizedData = denormalize(this.normalizedList.toJS(), statusesSchema, this.entities);

        return denormalizedData;
    }

    @computed get firstPageList() {
        const list = this.normalizedList.slice(0, 5);
        const denormalizedData = denormalize(list, statusesSchema, this.entities);

        return denormalizedData;
    }

    @action async loadNextPage(options = {}) {

        if (this.fetchStatus === FetchStatus.LOADING ||
            this.fetchStatus === FetchStatus.LOADED) {
            return;
        }

        this.fetchStatus = FetchStatus.LOADING;

        let resp;

        try {
            resp = await this.load({
                max_id: this.min_id,
                ...options
            });
        } catch(e) {
            // console.error(e);
            runInAction(() => {
                this.fetchStatus = FetchStatus.FAILED;
            });
            return;
        }

        runInAction(() => {
            const count = this.count;
            
            if (resp.length > 0) {
                this.addToList(resp);
            }

            if (resp.length < count) {
                this.fetchStatus = FetchStatus.LOADED;
            } else {
                this.fetchStatus = FetchStatus.NONE;
            }
        });
    }

    @action async pullRefresh() {
        if (this.refreshing) {
            return;
        }

        this.refreshing = true;

        const resp = await this.load({
            since_id: this.max_id
        });

        runInAction(() => {
            if (resp.length > 0) {
                this.shiftToList(resp);
            }

            this.refreshing = false;
        });
    }
}
