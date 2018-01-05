import React, { Component } from 'react';
import { Image, FileReader, Text, StyleSheet, View, Button} from 'react-native';
import helpers from '../third_parties/Ripple/src/ripple.helpers';

export const toHttps = (uri) => {
    return uri.replace(/^http/, 'https');
}

export const toPhotoHttps = (uri) => {
    return uri.replace(/^http:\/\/photo\d\.fanfou\.com\/v1/, 'https://s3-img.meituan.net/v1');
}

export const extractUserFromText = (text, style, onPress) => {
    const pattern = /@<a href="http:\/\/fanfou\.com\/(.+) class="former">(.+)<\/a>/g;

    const users = {};

    text = text.replace(pattern, (match, user, nickname) => {
        users[nickname] = user;
        return '@' + nickname + '@';
    });

    const parts = text.split('@');

    return (
        <View style={style}>
        {

            parts.map((text, index, array) => {
                if (users[text]) {
                    return <Text onPress={onPress} key={index}>@{text}</Text>;
                }
                return <Text key={index}>{text}</Text>
            })
        }
        </View>
    )
}
