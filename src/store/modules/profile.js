import {observable, action, runInAction} from 'mobx';
import BaseStore from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';

class ProfileStoreManager extends BaseStore {


    @observable user;

    @action async addFriend(options) {
        const resp = await callAPI('addFriend', options);

        return resp;
    }


    @action async removeFriend(options) {
        const resp = await callAPI('removeFriend', options);

        return resp;
    }
}

export default ProfileStoreManager;
