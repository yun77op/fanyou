import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, Image, StyleSheet, View, Button} from 'react-native';
import tabStyles, {tabBarLabel} from '../../modules/tab';
import Profile from '../profile';
import {toHttps} from '../../modules/util';
import { inject, observer } from 'mobx-react';
import PofileBase from './base';
import ProfileFooterList from './modules/footer_list';
import ProfileActionList from './modules/action_list'
import PactivityIndicator from '../../modules/activity_indicator';
import utilStyles from '../../modules/util_styles';
import UserCard from './modules/user_card';


import {NavigationActions} from 'react-navigation';

@inject('userStore', 'currentUserTimelineStore')
@observer
export default class CurrentProfileScreen extends PofileBase {

    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor, focused }) => (
            
          <Image
          style={tabStyles.tabBarIcon}
          source={require('../../res/icon/user.png')}
        />
        )
    };

    onPress = () => {
        
    }

    componentWillMount() {
        this.props.userStore.fetch();
        this.props.currentUserTimelineStore.loadNextPage({
            
        });
    }

    onProfileUpdate = () => {
        const {navigate} = this.props.screenProps.rootNavigation;
        const user = this.props.userStore.user;

        navigate('ProfileUpdate', {
            user
        });
    }

    onSettingsPress = () => {
        const {navigate} = this.props.screenProps.rootNavigation;
        const user = this.props.userStore.user;

        navigate('Settings', {
            user
        });
    }

    onFriendsPress = () => {
        const {navigate} = this.props.screenProps.rootNavigation;
        const user = this.props.userStore.user;

        navigate('Friends', {
            user
        });
    }

    onFollowersPress = () => {
        const {navigate} = this.props.screenProps.rootNavigation;
        const user = this.props.userStore.user;

        navigate('Followers', {
            user
        });
    }

    onTimelinePress = () => {
        const {navigate} = this.props.screenProps.rootNavigation;
        const user = this.props.userStore.user;

        navigate('UserTimeline', {
            user
        });
    } 

    render() {

        const user = this.props.userStore.user;
        const navigation = this.props.screenProps.rootNavigation;

        if (!user) {
            return <PactivityIndicator />;
        }

        return (
            <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <Image style={styles.profileImage} source={{uri: toHttps(user.profile_image_url)}} />
                <View style={styles.body}>
                    <Text>{user.name}</Text>
                    <UserCard content={user.description} />
                    <View style={styles.profileActions}>
                        <Button style={styles.updateButton} title="更新资料" onPress={this.onProfileUpdate} />
                        <TouchableOpacity onPress={this.onSettingsPress}>
                            <Image source={require('../../res/icon/settings.png')} style={styles.settingsIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.stats}>
                <TouchableOpacity onPress={this.onTimelinePress}>
                    <Text style={styles.statsText}>{user.statuses_count}</Text>
                    <Text style={styles.statsText}>消息</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onFriendsPress}>
                    <Text style={styles.statsText}>{user.friends_count}</Text>
                    <Text style={styles.statsText}>正在关注</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onFollowersPress}>
                    <Text style={styles.statsText}>{user.followers_count}</Text>
                    <Text style={styles.statsText}>关注者</Text>
                </TouchableOpacity>
            </View>

            <View style={utilStyles.mt3}>
                <ProfileActionList navigation={navigation} />
            </View>

            <View style={utilStyles.mt3}>
                <ProfileFooterList user={user} navigation={navigation} />
            </View>
        </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statsText: {
        textAlign: 'center'
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
    profileActions: {
        flexDirection: 'row',
        justifyContent: 'space-between' 
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    updateButton: {
        backgroundColor: '#E6E6FA',
        borderRadius: 4
    },
    settingsIcon: {
        width: 30,
        height: 30
    }
});
