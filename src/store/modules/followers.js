import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

export default class FollowersStore extends TimelineStore {

    timeline_key = 'followers';

    async load(options = {}) {
        const resp = await callAPI('getLatestLoggedFollowers', options);

        return resp;
    }

}
