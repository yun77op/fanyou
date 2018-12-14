import React, { Component } from 'react';
import { Alert, NetInfo, Modal, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import {toHttps, toPhotoHttps, extractUserFromText} from '../util';
import {format} from '../time_format';
import { inject, observer } from 'mobx-react';
import StatusMedia from './Media';

@inject('preferencesStore')
@observer
export default class Status extends Component {

    componentWillMount() {
        if (!this.props.preferencesStore.sync) {
            this.props.preferencesStore.fetch();
        }
    }
    
    onCommentPress = () => {        
        const {item, onPressItem} = this.props;

        onPressItem({
            type: 'comment',
            item
        });
    }

    onRepostPress = () => {
        const {item, onPressItem} = this.props;
        const user = item.user;

        onPressItem({
            type: 'repost',
            item
        });
    }

    onProfilePress = (userId) => {
        const {item, onPressItem} = this.props;
        const user = item.user.id !== userId ? {
            id: userId
        } : item.user;

        onPressItem({
            type: 'profile',
            user: user
        });
    }

    onPress = () => {
        const {item, onPressItem} = this.props;

        onPressItem({
            type: 'status',
            item
        });
    }

    render() {
        const {item} = this.props;
        const user = item.user;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                <TouchableOpacity onPress={this.onProfilePress.bind(null, user.id)}>
                    <Image style={styles.profileImage} source={{uri: toHttps(user.profile_image_url)}} />
                </TouchableOpacity>
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.time}>{format(item.created_at)}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        {extractUserFromText(item.text, styles.content, this.onProfilePress)}

                        {item.photo && <StatusMedia photo={item.photo} />}
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={this.onCommentPress}>
                            <Image
                      style={styles.actionIcon}
                        source={require('../../res/icon/message.png')}
                      />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onRepostPress}>
                        <Image
                        style={styles.actionIcon}
                        source={require('../../res/icon/repost.png')}
                        />
                        </TouchableOpacity>
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    userName: {
        marginBottom: 5,
        color: '#555'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        color: '#999',
        fontSize: 10
    },
    content: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: 'row',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    actionIcon: {
        width: 30,
        height: 30,
        marginLeft: 10
    }
});
