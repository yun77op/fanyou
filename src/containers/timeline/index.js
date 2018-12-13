import React, { Component } from 'react';
import { Alert, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import ExtendedStatus from '../../modules/status/extended';
import {FetchStatus} from '../../store/modules/base';
import { inject, observer } from 'mobx-react';
import PactivityIndicator from '../../modules/activity_indicator';

export default class Timeline extends Component {

    getListStore() {
        return this.props[this.listStoreName];
    }

    renderItem = ({item}) => {
        return <ExtendedStatus item={item}/>
    }

    onEndReached = () => {
        this.getListStore().loadNextPage();
    }

    onRefresh = () => {
        this.getListStore().pullRefresh();
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        const timelineStore = this.getListStore();

        const ListFooterComponent = timelineStore.fetchStatus === FetchStatus.LOADING ?
                        <PactivityIndicator /> : null;
        const refreshing = timelineStore.refreshing;

        return (
            <View>
                <FlatList
                 keyExtractor={this._keyExtractor} 
                 onEndReached={this.onEndReached} 
                 data={timelineStore.list}
                 ListFooterComponent={ListFooterComponent}
                 onRefresh={this.onRefresh}
                 refreshing={refreshing}
                 renderItem={this.renderItem} />
            </View>
        )
    }
}
