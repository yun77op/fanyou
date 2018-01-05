import React, { Component } from 'react';
import { Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Timeline from '../timeline';

@inject('mentionsStore')
@observer
export default class MentionsScreen extends Timeline {

    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            style={tabStyles.tabBarIcon}
            source={require('../../res/icon/mention.png')}
          />
        ),
    };

    componentDidMount() {
      this.getListStore().loadNextPage();
    }

    listStoreName = 'mentionsStore';

}