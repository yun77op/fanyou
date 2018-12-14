import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../modules/util';
import ExtendedStatus from '../../modules/status/extended';
import containerStyles from '../styles';
import ProfileUserTimeline from './modules/user_timeline';


export default class PofileBase extends Component {


    renderItem = ({item}) => {
        return <ExtendedStatus item={item} />;
    }

    render() {
        const {user} = this.props.navigation.state.params;

        return (
            <ScrollView style={containerStyles.container}>
                
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
});
