import React, { Component } from 'react';
import UserCard from './index';

const ExtendedStatus = ({navigation, item}) => {

    const onPressItem = (options) => {
        const { navigate } = navigation;

        navigate('Profile', {
            user: options.user
        })
    }

    return <UserCard item={item} onPressItem={onPressItem} />
}

export default ExtendedStatus;