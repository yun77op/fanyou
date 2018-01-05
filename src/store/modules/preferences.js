import {observable, action} from 'mobx';
import BaseStore, {FetchStatus} from './base';
import {AsyncStorage} from 'react-native';

class PreferencesStore extends BaseStore {

    @observable smartPic = true;

    sync = false;

    @action async fetch() {
        let resp;

        if (this.fetchStatus === FetchStatus.LOADING) {
            return;
        }

        this.fetchStatus = FetchStatus.LOADING;

        try {
            resp  = await AsyncStorage.getItem('@Fanyou:preferences');

            resp = resp === null ? {} : JSON.parse(resp);
        } catch(error) {
            console.log(error);
            this.fetchStatus = FetchStatus.FAILED;
            return;
        }

        this.fetchStatus = FetchStatus.LOADED;

        if (resp.smartPic !== undefined) {
            this.smartPic = resp.smartPic;
        }

        this.sync = true;

        return resp;
    }
 
    async save() {
        const store = {
            smartPic: this.smartPic
        };

        try {
            await AsyncStorage.setItem('@Fanyou:preferences', JSON.stringify(store));
        } catch(error) {
            return error;
        }
    }
}

export default new PreferencesStore();
