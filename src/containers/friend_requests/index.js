import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import ExtendedUserCard from '../../modules/user_card/extended';
import {FetchStatus} from '../../store/modules/base';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Timeline from '../timeline';

@inject('friendRequestsStore')
@observer
export default class FriendRequestsScreen extends Timeline {

    componentDidMount() {
      this.getListStore().loadNextPage({

      });
    }

    renderItem = ({item}) => {
      return ExtendedUserCard({
          navigation: this.props.navigation,
          item
      })
    }

    listStoreName = 'friendRequestsStore';

}