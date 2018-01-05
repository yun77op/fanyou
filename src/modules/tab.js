import React, { Component } from 'react';
import { Text, Image, StyleSheet, View, Button} from 'react-native';

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 30,
        height: 30
    }
});


export const tabBarLabel = (text) => {
    return ({ tintColor, focused }) => (
        <Text style={{color: focused ? tintColor : '#333', marginTop: 0, marginBottom: 0}}>{text}</Text>
    );
};


export default styles;