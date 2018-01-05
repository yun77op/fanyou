import React, { Component } from 'react';
import { ScrollView, FlatList, Text, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../../modules/util';
import ExtendedPhotoCard from '../../../modules/photo_card/extended';
import { inject, observer } from 'mobx-react';


@inject('photoTimelineStore')
@observer
export default class ProfilePhotosUserLastest extends Component {


    renderItem = ({item}) => {
        return ExtendedPhotoCard({
            navigation: this.props.navigation,
            item
        })
    }

    _keyExtractor = (item, index) => item.id;

    componentWillMount() {
        const {id, photoTimelineStore} = this.props;
    
        photoTimelineStore.setTimelineSlug(id);
      }

    componentDidMount() {
        const {user, photoTimelineStore} = this.props;

        photoTimelineStore.loadNextPage({
            id: user.id
        });
    }

    render() {
        return (
            <View>
                <FlatList horizontal
                keyExtractor={this._keyExtractor} 
                data={this.props.photoTimelineStore.firstPageList}
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
