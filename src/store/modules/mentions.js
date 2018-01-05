import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

class MentionsStore extends TimelineStore {

    timeline_key = 'mentions';

    async load(options = {}) {
        const resp = await callAPI('getMentions', options);

        return resp;
    }

}

export default new MentionsStore();
