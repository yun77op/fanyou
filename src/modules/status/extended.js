import React, { Component } from 'react';
import Status from './index';
import {withNavigation} from 'react-navigation';

class ExtendedStatus extends Component {
    onPressItem = (options) => {
        const { navigate } = this.props.navigation;
        const {user, item} = options;

        switch (options.type) {
            case 'comment':
                navigate('ComposeModal', {
                    in_reply_to_status_id: item.id,
                    name: item.user.name
                });
                break;

            case 'repost':
                navigate('ComposeModal', {
                    repost_status_id: item.id,
                    name: item.user.name,
                    text: item.text
                });
                break;

            case 'profile':
                navigate('Profile', {
                    user
                })
                break;
            
            case 'status':
                navigate('Status', {
                    item
                });
                break;
        }
    }

    render() {
        const {user, item} = this.props;
        return <Status item={item} user={user} onPressItem={this.onPressItem} />
    }
}



export default withNavigation(ExtendedStatus);