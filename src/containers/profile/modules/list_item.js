import React, { Component } from 'react';
import { ScrollView, FlatList, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import { inject, observer } from 'mobx-react';

export default class ListItem extends Component {

    render() {
        const {onPress, content} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.item}>{content}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#666'
    }
});