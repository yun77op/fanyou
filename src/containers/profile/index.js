import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../modules/util';
import containerStyles from '../styles';
import PofileBase from './base';
import { inject, observer } from 'mobx-react';
import ProfileUserTimeline from './modules/user_timeline';
import ProfileFooterList from './modules/footer_list';
import ProfilePhotosUserLastest from './modules/photos_user_lastest';
import UserCard from './modules/user_card';
import PactivityIndicator from '../../modules/activity_indicator';

@inject('userStore')
@observer
export default class ProfileScreen extends PofileBase {

    onFriendsPress = () => {
        const {user} = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        
        navigate('Friends', {
            user
        });
    }

    onFollowersPress = () => {
        const {user} = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        
        navigate('Followers', {
            user
        });
    }

    onTimelinePress = () => {
        const {user} = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;

        navigate('UserTimeline', {
            user
        });
    } 

    onFollowButtonClick = () => {
        const {user} = this.props.navigation.state.params;
        const {userStore} = this.props;
        const userId = user.id;
        const record = userStore.users.get(userId);
        const data = {
            id: userId
        };

        if (record.following) {
            userStore.removeFriend(data);
        } else {
            userStore.removeFriend(data);
        }
    }

    componentWillMount() {
        const {user} = this.props.navigation.state.params;
        const {userStore} = this.props;
        const userId = user.id;

        if ('statuses_count' in user) {
            if (!userStore.hasRecord(userId)) {
                userStore.users.set(userId, user);
            }
        } else if (!userStore.hasRecord(userId)) {
            userStore.fetch(userId);
        }
    }

    render() {
        const userParamsObj = this.props.navigation.state.params.user;
        const userId = userParamsObj.id;
        const {navigation} = this.props;
        const {userStore} = this.props;
        
        if (!userStore.hasRecord(userId)) {
            return <PactivityIndicator />;
        }

        const user = userStore.users.get(userId);

        return (
            <ScrollView style={containerStyles.container}>
                <View style={styles.contentContainer}>
                    <Image style={styles.profileImage} source={{uri: toHttps(user.profile_image_url)}} />
                    <View style={styles.body}>
                        <View>
                            <Text>{user.name}</Text>
                            <Button title={user.following ? '已关注' : '关注'} onPress={this.onFollowButtonClick} />
                        </View>
                        <UserCard content={user.description} />
                    </View>
                </View>
                <View style={styles.stats}>
                    <TouchableOpacity style={styles.statsItem} onPress={this.onTimelinePress}>
                        <Text style={styles.statsText}>{user.statuses_count}</Text>
                        <Text style={styles.statsText}>消息</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statsItem} onPress={this.onFriendsPress}>
                        <Text style={styles.statsText}>{user.friends_count}</Text>
                        <Text style={styles.statsText}>正在关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statsItem} onPress={this.onFollowersPress}>
                        <Text style={styles.statsText}>{user.followers_count}</Text>
                        <Text style={styles.statsText}>关注者</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.sectionHeader}>最近消息</Text>
                    <ProfileUserTimeline id={user.id} navigation={navigation} />
                </View>
                <View>
                    <Text style={styles.sectionHeader}>最近照片</Text>
                    <ProfilePhotosUserLastest user={user} navigation={navigation} />
                </View>

                <View style={styles.footerList}>
                    <ProfileFooterList user={user} navigation={navigation} />
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    statsText: {
        textAlign: 'center'
    },
    sectionHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 10,
        marginTop: 20
    },
    contentContainer: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
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
    },

    footerList: {
        marginTop: 20
    }
});
