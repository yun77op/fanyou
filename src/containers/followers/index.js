import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import ExtendedUserCard from '../../modules/user_card/extended';
import {FetchStatus} from '../../store/modules/base';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Timeline from '../timeline';

@inject('followersStore')
@observer
export default class FollowersScreen extends Timeline {

  componentWillMount() {
    const {user} = this.props.navigation.state.params;

    this.getListStore().setTimelineSlug(user.id);
  }

    componentDidMount() {
      const {user} = this.props.navigation.state.params;

      this.getListStore().loadNextPage({
        id: user.id
      });
    }

    renderItem = ({item}) => {
      return ExtendedUserCard({
          navigation: this.props.navigation,
          item
      })
    }

    listStoreName = 'followersStore';

}