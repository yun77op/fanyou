import React, { Component } from 'react';
import { Alert, Modal, TouchableOpacity, Image, Text, StyleSheet, View, Button, ActivityIndicator} from 'react-native';

const PactivityIndicator = () => {
    return <ActivityIndicator style={styles.container} animating={true} /> ;
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default PactivityIndicator;