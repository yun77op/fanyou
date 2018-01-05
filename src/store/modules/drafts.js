import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {Alert, AsyncStorage} from 'react-native';


class DraftsStore extends BaseStore {

    @observable list = undefined;

    @action async fetch() {
        let resp;

        this.fetchStatus = FetchStatus.LOADING;

        try {
            resp  = await AsyncStorage.getItem('@Fanyou:drafts');

            resp = resp === null ? [] : JSON.parse(resp);
        } catch(error) {
            console.log(error);
            this.fetchStatus = FetchStatus.FAILED;
            return;
        }

        this.fetchStatus = FetchStatus.LOADED;
        this.list = resp;

        return resp;
    }

    @action async delete(index) {
        const removedItemArray = this.list.splice(index, 1);

        const error = await this.save(this.list);

        if (error) {
            if (index === 0) {
                this.list.unshift(removedItemArray[0]);
            } else {
                this.list.splice(index - 1, 0, removedItemArray[0]);
            }
        }

        return error;
    }

    @action async add(item) {
        let list = this.list;

        if (list === undefined) {
            list = await this.fetch();

            if (list === undefined) {
                return;
            }
        }

        list.push(item);

        const error = await this.save(list);

        if (!error) {
            this.list = list;
            
            return list;
        }
    }

    async save(list) {
        try {
            await AsyncStorage.setItem('@Fanyou:drafts', JSON.stringify(list.slice()));
        } catch(error) {
            return error;
        }
    }
}

export default new DraftsStore();
