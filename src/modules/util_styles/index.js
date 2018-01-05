import React, { Component } from 'react';
import { Alert, Platform, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';

const spacer = 20;

const styles = StyleSheet.create({
    mt1: {
        marginTop: spacer * .25
    },
    mt2: {
        marginTop: spacer * .5
    },
    mt3: {
        marginTop: spacer
    },
    safeArea: {
        marginLeft: 10,
        marginRight: 10
    }
});

export default styles;