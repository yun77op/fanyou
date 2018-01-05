import React, { Component } from 'react';
import { ScrollView, FlatList, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import { inject, observer } from 'mobx-react';
import ListItem from './list_item';


export default class ProfileActionList extends Component {

    onRequestsPress = () => {
        const { navigate } = this.props.navigation;
        
        navigate('FriendRequests', {});
    }

    renderItem = ({item}) => {
        return <ListItem onPress={this.onRequestsPress}
                        content={item.content} />
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        const {navigation, user} = this.props;

        const data = [
            {
                id: 'requests', 
                content:  `关注请求`
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
