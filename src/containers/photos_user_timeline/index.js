import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import ExtendedPhotoCard from '../../modules/photo_card/extended';
import {FetchStatus} from '../../store/modules/base';
import { inject, observer } from 'mobx-react';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Timeline from '../timeline';

@inject('photoTimelineStore')
@observer
export default class PhotosUserTimelineScreen extends Timeline {

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
      return ExtendedPhotoCard({
          navigation: this.props.navigation,
          item
      })
    }

    listStoreName = 'photoTimelineStore';

    render() {

      const timelineStore = this.getListStore();
      
        const ListFooterComponent = timelineStore.fetchStatus === FetchStatus.LOADING ?
                        <ActivityIndicator animating={true} /> : null;
        const refreshing = timelineStore.refreshing;

        const numColumns = 3;
        return (
            <View>
                <FlatList
                // contentContainerStyle={styles.contentContainer}
                numColumns={numColumns}
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


const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start'
  }
});