import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {callAPI} from '../fanfou'; 
import {Alert, AsyncStorage} from 'react-native';
import TimelineStore from './timeline';

export default class FavouritesStore extends TimelineStore {

    timeline_key = 'favorites';

    async load(options = {}) {
        const resp = await callAPI('getFavorites', options);

        return resp;
    }

}
