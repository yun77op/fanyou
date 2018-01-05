import {observable, action} from 'mobx';


export const FetchStatus = {
    NONE: 'NONE',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    FAILED: 'FAILED'
};

export default class BaseStore {
    @observable fetchStatus = FetchStatus.NONE;

    

}