import React from 'react';
import {createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
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
import AuthLoadingScreen from './containers/AuthLoadingScreen';
import AuthScreen from './containers/Auth';
import {setup as netInfoSetup, teardown as netInfoTeardown} from './modules/net_info';

import {Provider} from 'mobx-react';
import { View, Platform} from 'react-native';

import stores from './store';
import containerStyles from './containers/styles';

import HomeTimelineScreen from './containers/home_timeline';
import MentionsScreen from './containers/mentions';
import ComposeScreen from './containers/compose/screen';
import CurrentProfileScreen from './containers/profile/current_profile';

const HomeBottomTab = createBottomTabNavigator({
    HomeTimeline: {
        screen: HomeTimelineScreen
    },
    Mentions: {
        screen: MentionsScreen
    },
    Compose: {
        screen: ComposeScreen
    },
    CurrentProfile: {
        screen: CurrentProfileScreen
    }
}, {
    initialRouteName: 'HomeTimeline',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
        showLabel: true
    }
});

const HomeStack = createStackNavigator({
    HomeBottomTab,
    Status: {
        screen: StatusScreen
    },
    Profile: {
        screen: ProfileScreen
    },
    // ComposeModal: {
    //     screen: ComposeModal
    // },
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
    initialRouteName: 'HomeBottomTab',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    headerMode: 'screen'
});


const AppContainer = createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: HomeStack,
      Auth: AuthScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));


class App extends React.Component {
// someEvent() {
//     // call navigate for AppNavigator here:
//     this.navigator &&
//     this.navigator.dispatch(
//         NavigationActions.navigate({ routeName: someRouteName })
//     );
// }

    componentDidMount() {
        netInfoSetup();
    }

    componentWillUnmount() {
        netInfoTeardown();
    }

    render() {
        return (
            <Provider {...stores}>
                <AppContainer
                    ref={nav => {
                        this.navigator = nav;
                    }}
                />
            </Provider>
        );
    }
}

export default App;