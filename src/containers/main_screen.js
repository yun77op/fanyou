import HomeTimelineScreen from './home_timeline';
import MentionsScreen from './mentions';
import ComposeScreen from './compose/screen';
import CurrentProfileScreen from './profile/current_profile';
import {StackNavigator, TabNavigator} from 'react-navigation';

const MainScreen = TabNavigator({
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
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
        showLabel: true
    }
});

export default MainScreen;