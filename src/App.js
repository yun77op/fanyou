import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import FrontScreen from './containers/front';
import ProfileScreen from './containers/profile';
import StatusScreen from './containers/status';
import ComposeModal from './containers/compose';
import FriendsScreen from './containers/friends';
import UserTimelineScreen from './containers/user_timeline';
import FollowersScreen from './containers/followers';
import FavouritesScreen from './containers/favourites';
import PhotosUserTimelineScreen from './containers/photos_user_timeline';
import FriendRequestsScreen from './containers/friend_requests';
import ProfileUpdateScreen from './containers/profile_update';
import Settings from './containers/settings';
import ComposeScreen from './containers/compose/screen';

import {Provider} from 'mobx-react';
import { View, Platform} from 'react-native';

import stores from './store';
import containerStyles from './containers/styles';


const App = () => {

    const AppNavigator = StackNavigator({
        FrontScreen: {
            screen: FrontScreen 
        },
        Status: {
            screen: StatusScreen
        },
        Profile: {
            screen: ProfileScreen
        },
        ComposeModal: {
            screen: ComposeModal
        },
        Friends: {
            screen: FriendsScreen
        },
        Followers: {
            screen: FollowersScreen
        },
        Favourites: {
            screen: FavouritesScreen
        },
        PhotosUserTimeline: {
            screen: PhotosUserTimelineScreen
        },
        FriendRequests: {
            screen: FriendRequestsScreen
        },
        ProfileUpdate: {
            screen: ProfileUpdateScreen
        },
        Settings: {
            screen: Settings
        },
        UserTimeline: {
            screen: UserTimelineScreen
        }
    }, {
        initialRouteName: 'FrontScreen',
        mode: Platform.OS === 'ios' ? 'modal' : 'card',
        headerMode: 'screen'
    });

    return (
        <Provider {...stores}>
            <AppNavigator ref={(_navigator) => {ComposeScreen.navigator = _navigator;}} />
        </Provider>
    )
}


export default App;
