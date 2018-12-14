import {observable, action} from 'mobx';
import BaseStore from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';

class StatusStore extends BaseStore {

    @observable statuses = new Map();

    @action async showStatus(id) {
        const resp = await callAPI('showStatus', {
            id
        });

        if (!resp.error) {
            this.statuses.set(resp.id, resp)
        }

        return resp;
    }

    @action async addFavorite() {
        const resp = await callAPI('addFavorite', {
            id: this.status.id
        });

        this.status = resp;
    }

    @action async removeFavorite() {
        const resp = await callAPI('removeFavorite', {
            id: this.status.id
        });

        this.status = resp;
    }

    @action async update(options) {
        const actionName = options.photo ? 'postPhoto' : 'postStatus';

        const resp = await callAPI(actionName, {
            mode: 'lite',
            ...options
        });

        return resp;
    }
}

export default new StatusStore();
