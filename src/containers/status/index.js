import React, { Component } from 'react';
import { Alert, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../modules/util';
import {format} from '../../modules/time_format';
import { inject, observer } from 'mobx-react';

@inject('statusStore')
@observer
export default class StatusScreen extends Component {

    onCommentPress = () => {
        const item = this.props.statusStore.status;

        const {navigation} = this.props;
        navigation.navigate('ComposeModal', {
            in_reply_to_status_id: item.id,
            name: item.user.name
        });
    }

    onRepostPress = () => {
        const item = this.props.statusStore.status;

        const {navigation} = this.props;
        navigation.navigate('ComposeModal', {
            repost_status_id: item.id,
            name: item.user.name,
            text: item.text
        });
    }

    onFavPress = () => {
        if (this.props.statusStore.status.favorited) {
            this.props.statusStore.removeFavorite();
        } else {
            this.props.statusStore.addFavorite();
        }
    }

    componentWillMount() {
        const {item} = this.props.navigation.state.params;
        this.props.statusStore.setStatus(item);
    }

    render() {
        const item = this.props.statusStore.status;

        return (
            <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image style={styles.profileImage} source={{uri: toHttps(item.user.profile_image_url)}} />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.userName}>{item.user.name}</Text>
                        <Text style={styles.time}>{format(item.created_at)}</Text>
                    </View>
                    <Text>{item.text}</Text>
                </View>
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


            <TouchableOpacity onPress={this.onFavPress}>
            <Image
            style={styles.actionIcon}
            source={require('../../res/icon/fav.png')}
            />
            {item.favorited && <Text>已收藏</Text>}
            </TouchableOpacity>

            </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    contentContainer: {
        flexDirection: 'row'      
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
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
    body: {
        flex: 1
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    actionIcon: {
        width: 20,
        height: 20,
        marginLeft: 10
    }
});
