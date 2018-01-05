import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import MentionItem from './item';
import {FetchStatus} from '../../../store/modules/base';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../../modules/tab';
import Timeline from '../../timeline';

@inject('friendsStore', 'userStore')
@observer
export default class FriendsTimeline extends Timeline {

  constructor(options) {
    super(options);

    this.state = {
      selected: {}
    }
  }

  componentWillMount() {
    if (this.props.userStore.user === undefined) {
      this.props.userStore.fetch();
    } else {
      this.getListStore().setTimelineSlug(this.props.userStore.user.id);
    }
  }
  
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.userStore.user === undefined && nextProps.userStore.user !== undefined) {
  //   }
  // }

    componentDidMount() {
      if (this.props.userStore.user !== undefined) {
        this.getListStore().loadNextPage({
          id: this.props.userStore.user.id
        });
      }
    }

    getValue() {
      const values = [];

      for (const key in this.state.selected) {
        if (this.state.selected.hasOwnProperty(key) &&
            this.state.selected[key]) {
              values.push(key);
        }
      }

      return values;
    }

    onPress = (item, value) => {
      this.setState(() => {
        return {
          selected: {
            ...this.state.selected,
            [item.id]: value
          }
        }
      })
    }

    renderItem = ({item, index}) => {
        const fItem = {...item, value: this.state.selected[item.id] || false};
        return <MentionItem index={index} item={fItem} onPress={this.onPress} />
    }

    componentWillReact() {
      if (this.props.userStore.user) {
        this.getListStore().setTimelineSlug(this.props.userStore.user.id);
        this.getListStore().loadNextPage({
          id: this.props.userStore.user.id
        });
      }
    }


    listStoreName = 'friendsStore';

    render() {
      const user = this.props.userStore.user; // place here in order rerender
      const timelineStore = this.getListStore();
      
      const ListFooterComponent = timelineStore.fetchStatus === FetchStatus.LOADING ?
                      <ActivityIndicator animating={true} /> : null;
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

