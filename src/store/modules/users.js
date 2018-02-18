import {observable, computed, action, runInAction} from 'mobx';
import BaseStore from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';

class UserStore extends BaseStore {

    @observable users = observable.map();

    @observable loggedUserId = '';

    @computed get loggedUser() {
        if (this.loggedUserId === '') {
            return null;
        }
        return this.users.get(this.loggedUserId);
    }

    @action async addFriend(options) {
        const resp = await callAPI('addFriend', options);

        return resp;
    }

    getById(id) {
        return this.users.get(id);
    }

    hasRecord(id) {
        return !!this.users.get(id);
    }

    @action async removeFriend(options) {
        const resp = await callAPI('removeFriend', options);

        return resp;
    }

    @action async fetch(id) {
        const data = id ? {id} : {};
        const resp = await callAPI('showUser', data);

        runInAction(() => {
            if (id === undefined) {
                this.loggedUserId = resp.id;
            }
            this.users.set(resp.id, resp);
        });

        return resp;
    }


    @action async update(options) {
        const resp = await callAPI('updateProfile', options);

        const updatedUser = {...this.loggedUser, ...resp};

        this.users.set(this.loggedUserId, updatedUser);

        return resp;
    }
}

export default new UserStore();
