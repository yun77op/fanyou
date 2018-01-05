import React, { Component } from 'react';
import { WebView, Alert, Text, StyleSheet, View, Button} from 'react-native';
import {authorize, getAccessToken, isCallbackPage} from '../../store/fanfou';


const styles = StyleSheet.create({
    welcome: {
        color: '#333',
        textAlign: 'center'
    },

    container: {
    }
});

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authorizeUrl: ''
        };
    }

    onPress = () => {
        authorize().next((authorizeUrl) => {
            this.setState(() => (
                {
                    authorizeUrl
                }
            ));
        });
    }

    navigateToHomeTimeline() {
        const { navigate } = this.props.navigation;

        navigate('HomeTimeline', {
            
        });
    }

    onLoadEnd = (data) => {
        const url = data.nativeEvent.url;
        const callbackPageLanded = isCallbackPage(url);

        if (callbackPageLanded) {
            const index = url.indexOf('?');

            if (index > -1) {
                const data = url.slice(index);

                getAccessToken(data)
                    .then(() => {
                        this.navigateToHomeTimeline();
                    });
            }
        }
    }

    render() {
        const {authorizeUrl} = this.state;

        if (authorizeUrl) {
            return (
                <WebView
                source={{uri: authorizeUrl}}
                style={{marginTop: 20}}
                onLoadEnd={this.onLoadEnd}
              />
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>欢迎使用Fanyou饭否客户端</Text>
                <Button onPress={this.onPress} title="点击登陆" />
            </View>
        )
    }
}
