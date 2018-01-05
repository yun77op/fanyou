import {observable, action, runInAction} from 'mobx';
import BaseStore from './base';
import {callAPI} from '../fanfou'; 
import ProfileStore from './profile';

class ProfileStoreManager extends BaseStore {
    store = {};

    getById(id) {
        const record = this.store[id];
        if (record === undefined) {
            return new ProfileStore();
        }

        return record;
    }
}

export default ProfileStoreManager;