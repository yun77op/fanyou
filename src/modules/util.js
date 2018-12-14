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
    const parts = text.split(/(#[^#]+#|@<a[^<]+<\/a>)/);

    return (
        <View style={style}>
            <Text>
            {
                parts.map((text, index) => {
                    if (text[0] === '#') {
                        const result = text.match(/\/q\/([^"]+)">([^<]+)/);
                        return <Text key={index}>#{result[2]}#</Text>
                    } else if (text[0] === '@') {
                        const result = text.match(/fanfou.com\/([^"]+)" class="former">([^<]+)/);
                        return <Text onPress={onPress.bind(null, result[1])} key={index}>@{result[2]}</Text>
                    } else {
                        return <Text key={index}>{text}</Text>
                    }
                })
            }
            </Text>
        </View>
    )
}
