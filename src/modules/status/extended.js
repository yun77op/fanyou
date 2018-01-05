import React, { Component } from 'react';
import Status from './index';

const ExtendedStatus = ({navigation, item, user}) => {

    const onPressItem = (options) => {
        const { navigate } = navigation;
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

    return <Status item={item} user={user} onPressItem={onPressItem} />
}

export default ExtendedStatus;