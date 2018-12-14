import React, { Component } from 'react';
import { Alert, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import {format} from '../../modules/time_format';
import { inject, observer } from 'mobx-react';
import {toHttps, toPhotoHttps, extractUserFromText} from '../../modules/util';
import StatusMedia from '../../modules/status/Media';

@inject('statusStore')
@observer
export default class StatusScreen extends Component {

    onCommentPress = () => {
        const item = this._getStatus();

        const {navigation} = this.props;
        navigation.navigate('ComposeModal', {
            in_reply_to_status_id: item.id,
            name: item.user.name
        });
    }

    onRepostPress = () => {
        const item = this._getStatus();

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

    async componentDidMount() {
        const {id} = this.props.navigation.state.params;
        const response = await this.props.statusStore.showStatus(id);

        if (response.error) {
            this.setState({
                error: response.error.error
            })
        }
    }

    onProfilePress = (userId) => {
        const item = this._getStatus();
        const user = item.user.id !== userId ? {
            id: userId
        } : item.user;

        const {navigation} = this.props;

        navigation.navigate('Profile', {
            user
        })
    }

    _getStatus = () => {
        const {id} = this.props.navigation.state.params;
        return this.props.statusStore.statuses.get(id);
    }

    _onOriginStatusView = () => {
        const item = this._getStatus();
        const {navigation} = this.props;

        navigation.push('Status', {
            id: item.repost_status_id
        })
    }

    state = {
        error: ''
    }


    render() {
        const item = this._getStatus();

        if (this.state.error) {
            return <View style={styles.nodata}><Text>{this.state.error}</Text></View>
        }

        if (!item) {
            return null;
        }

        return (
            <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image style={styles.profileImage} source={{uri: toHttps(item.user.profile_image_url)}} />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.userName}>{item.user.name}</Text>
                        <Text style={styles.time}>{format(item.created_at)}</Text>
                    </View>
                    <View>
                        {extractUserFromText(item.text, null, this.onProfilePress)}
                        {item.photo && <StatusMedia photo={item.photo} />}
                    </View>
                </View>
            </View>


                {item.repost_status_id &&
                <View style={styles.repostStatus}>
                    <TouchableOpacity onPress={this._onOriginStatusView}>
                        <Text>转自{item.repost_screen_name}</Text>
                    </TouchableOpacity>
                </View>}

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
    nodata: {
        marginBottom: 40,
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    repostStatus: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
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
