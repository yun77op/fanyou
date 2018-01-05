import React, { Component } from 'react';
import PhotoCard from './index';

const ExtendedPhotoCard = ({navigation, item}) => {

    const onPressItem = (options) => {
        const { navigate } = navigation;

        navigate('Profile', {
            user: options.user
        })
    }

    return <PhotoCard item={item} onPressItem={onPressItem} />
}

export default ExtendedPhotoCard;