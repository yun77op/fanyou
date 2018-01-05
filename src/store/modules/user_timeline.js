import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

export default class UserTimlineStore extends TimelineStore {

    timeline_key = 'userTimeline';

    async load(options = {}) {
        const resp = await callAPI('getUserTimeline', options);

        return resp;
    }

}
