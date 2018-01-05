import {observable, action, runInAction} from 'mobx';
import BaseStore from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';

class UserStore extends BaseStore {

    @observable user;

    @action async fetch() {
        try {
            const resp = await callAPI('showUser');
            runInAction(() => {
                this.user = resp;
            });
        } catch(e) {
        }
    }


    @action async update(options) {
        try {
            const resp = await callAPI('updateProfile', options);
            runInAction(() => {
                this.user = resp;
            });
        } catch(e) {
        }
    }
}

export default new UserStore();
