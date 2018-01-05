import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

class HomeTimelineStore extends TimelineStore {

    timeline_key = 'homeTimeline';

    async load(options = {}) {
        const resp = await callAPI('getHomeTimeline', options);
        
        return resp;
    }

}

export default new HomeTimelineStore();
