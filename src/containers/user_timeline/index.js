import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import ExtendedStatus from '../../modules/status/extended';
import {FetchStatus} from '../../store/modules/base';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Timeline from '../timeline';

@inject('userTimelineStore')
@observer
export default class UserTimelineScreen extends Timeline {

    componentDidMount() {

        const {user} = this.props.navigation.state.params;
        
        this.getListStore().loadNextPage({
            id: user.id
        });
    }

    renderItem = ({item}) => {
        return ExtendedStatus({
            navigation: this.props.navigation,
            item
        })
    }

    listStoreName = 'userTimelineStore';
}
