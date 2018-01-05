import React, { Component } from 'react';
import { Alert, Platform, Image, FlatList, Text, StyleSheet, View, Button} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    }
});

export default styles;