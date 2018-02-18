import React, { Component } from 'react';
import { ScrollView, FlatList, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import { inject, observer } from 'mobx-react';
import ListItem from './list_item';


export default class ProfileFooterList extends Component {

    onPhotoPress = () => {
        const {user} = this.props;
        const { navigate } = this.props.navigation;
        
        navigate('PhotosUserTimeline', {
            user
        });
    }

    onFavouritesPress = () => {
        const {user} = this.props;
        const { navigate } = this.props.navigation;
        
        navigate('Favourites', {
            user,
            navigation: this.props.navigation
        });
    }

    renderItem = ({item}) => {
        return <ListItem onPress={item.id === 'photos' ? this.onPhotoPress : this.onFavouritesPress}
                        content={item.content} />
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        const {navigation, user} = this.props;
        const {favourites_count} = user;

        const data = [
            {
                id: 'photos', 
                content:  `照片`
            },
            {
                id: 'favourites', 
                content: favourites_count === 0 ? `收藏` : `收藏${favourites_count}`
            }
        ];

        return (
            <FlatList
            keyExtractor={this._keyExtractor} 
            data={data}
            renderItem={this.renderItem} />
        )
    }
}
