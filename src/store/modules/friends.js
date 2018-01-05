import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

export default class FriendsStore extends TimelineStore {

    timeline_key = 'friends';

    async load(options = {}) {
        const resp = await callAPI('getLatestLoggedFriends', options);

        return resp;
    }

}
