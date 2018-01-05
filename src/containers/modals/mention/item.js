import React, { Component } from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import CheckBox from 'react-native-checkbox';

export default class MentionItem extends Component {

    onValueChange = (value) => {
        const {item} = this.props;
        this.props.onPress(item, value);
    }

    render() {
        const {item, value} = this.props;

        return (
            <View style={styles.container}>
                <CheckBox label={item.name} checked={value} onChange={this.onValueChange} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderBottomWidth: 1,
    }
});

