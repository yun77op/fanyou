import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

class PhotoTimelineStore extends TimelineStore {

    timeline_key = 'photoTimeline';

    async load(options = {}) {
        const resp = await callAPI('getPhotoTimeline', options);

        return resp;
    }

}

export default new PhotoTimelineStore();
