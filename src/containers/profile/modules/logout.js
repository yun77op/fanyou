import React, { Component } from 'react';
import { ScrollView, Alert, FlatList, Text, Image,
    TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import { inject, observer } from 'mobx-react';
import ListItem from './list_item';
import {removeLocalUser} from '../../../store/fanfou';


export default class ProfileLogout extends Component {

    onButtonPress = async () => {
        const { navigate } = this.props.navigation;

        try {
            await removeLocalUser();
            navigate('FrontScreen');
        } catch(err) {
            Alert.alert('退出失败');
        }
    }

    render() {
        return (
            <ListItem content="退出" onPress={this.onButtonPress} />
        )
    }
}
