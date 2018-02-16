import homeTimelineStore from './modules/home_timeline';
import statusStore from './modules/status';
import userStore from './modules/users';
import mentionsStore from './modules/mentions';
import UserTimlineStore from './modules/user_timeline';
import FriendsStore from './modules/friends';
import FollowersStore from './modules/followers';
import FavouritesStore from './modules/favourites';
import photoTimelineStore from './modules/photos_user_timeline';
import FriendRequestsStore from './modules/friend_requests';
import draftsStore from './modules/drafts';
import preferencesStore from './modules/preferences';

export default {
    homeTimelineStore,
    statusStore,
    userStore,
    mentionsStore,
    userTimelineStore: new UserTimlineStore(),
    currentUserTimelineStore: new UserTimlineStore(),
    friendsStore: new FriendsStore(),
    followersStore: new FollowersStore(),
    favouritesStore: new FavouritesStore(),
    photoTimelineStore,
    friendRequestsStore: new FriendRequestsStore(),
    draftsStore,
    preferencesStore
}