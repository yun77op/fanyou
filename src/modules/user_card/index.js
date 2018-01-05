import React, { Component } from 'react';
import { Alert, Modal, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import {toHttps, extractUserFromText} from '../util';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class UserCard extends Component {

    constructor(options) {
        super(options);
    }

    onPress = () => {
        const {onPressItem} = this.props;
        const user = this.props.item;

        onPressItem({
            user
        });
    }

    render() {
        const user = this.props.item;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                <Image style={styles.profileImage} source={{uri: toHttps(user.profile_image_url)}} />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.userName}>{user.name}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{user.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5
    },
    description: {
    },
    userName: {
        marginBottom: 5,
        color: '#555'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    body: {
        flex: 1,
    }
});
