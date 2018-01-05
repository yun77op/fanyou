import React, { Component } from 'react';
import { ScrollView, FlatList, Text, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../../modules/util';
import ExtendedStatus from '../../../modules/status/extended';
import { inject, observer } from 'mobx-react';


@inject('userTimelineStore')
@observer
export default class ProfileUserTimeline extends Component {


    renderItem = ({item}) => {
        return ExtendedStatus({
            navigation: this.props.navigation,
            item
        })
    }

    _keyExtractor = (item, index) => item.id;

    componentWillMount() {
        const {id, userTimelineStore} = this.props;
    
        userTimelineStore.setTimelineSlug(id);
      }

    componentDidMount() {
        const {id, userTimelineStore} = this.props;

        userTimelineStore.loadNextPage({
            id
        });
    }

    render() {
        const ListFooterComponent = <TouchableOpacity><Text style={styles.moreStatus}>查看全部</Text></TouchableOpacity>;

        return (
            <View>
                <FlatList
                keyExtractor={this._keyExtractor} 
                data={this.props.userTimelineStore.firstPageList}
                ListFooterComponent={ListFooterComponent}
                renderItem={this.renderItem} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    moreStatus: {
        textAlign: 'center'
    }
});
