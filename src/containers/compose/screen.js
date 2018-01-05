import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { ScrollView, TouchableOpacity, Text, Image, StyleSheet, View, Button} from 'react-native';
import tabStyles, {tabBarLabel} from '../../modules/tab';

export default class ComposeScreen extends Component {

    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor, focused }) => (
            
          <Image
          style={tabStyles.tabBarIcon}
          source={require('../../res/icon/edit.png')}
        />
        ),
        tabBarOnPress: (scene, jumpToIndex) => {
            const navigateAction = NavigationActions.navigate({
                routeName: 'ComposeModal',
                params: {}
            })

            ComposeScreen.navigator.dispatch(navigateAction);
        }
    };

    render() {
        return (
            <View>

            </View>
        )
    }

}

