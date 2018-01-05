import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import Status from '../../modules/status';
import {FetchStatus} from '../../store/modules/base';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Timeline from '../timeline';
import {loadLocalUser, setupAccount} from '../../store/fanfou';

@inject('homeTimelineStore')
@observer
export default class HomeTimelineScreen extends Timeline {

    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            style={tabStyles.tabBarIcon}
            source={require('../../res/icon/home.png')}
          />
        ),
    };

    componentDidMount() {
      this.getListStore().loadNextPage({
      });
    }

    listStoreName = 'homeTimelineStore';

}
