import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import {loadLocalUser, setupAccount} from '../../store/fanfou';
import HomeTimelineScreen from '../home_timeline';
import HomeScreen from '../home';
import Timeline from '../timeline';
import MainScreen from '../main_screen';

export default class FrontScreen extends Timeline {

  static navigationOptions = {
    header: null
  }
    constructor(options) {
      super(options); 
    
      this.state = {
        checked: false,
        loggedIn: false
      }
    }

    componentWillMount() {
      loadLocalUser()
        .then((accessToken) => {
            let loggedIn;

            if (accessToken) {
                setupAccount(accessToken);
                loggedIn = true;
            } else {
              loggedIn = false;
            }

            this.setState(() => {
              return {
                loggedIn,
                checked: true
              } 
            })

        })
        .catch((error) => {
            console.error(error)
        })
    }

    onLogged = () => {
        this.setState(() => {
          return {
            loggedIn: true
          } 
        })
    }

    render() {
      const {checked, loggedIn} = this.state;
      const {navigation} = this.props;

      if (!checked) {
        return null;
      }
      
      if (loggedIn) {
        return <MainScreen screenProps={{
          rootNavigation: navigation
        }} />
      } else {
        return <HomeScreen onLogged={this.onLogged} />
      }
    }

}

