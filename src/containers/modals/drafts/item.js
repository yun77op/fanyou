import React, { Component } from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class DraftItem extends Component {

    onPress = () => {
        const {item, index, onPress} = this.props;
        onPress({
            item,
            index
        });
    }

    onDeleteItem = () => {
        const {index, onDelete} = this.props;

        onDelete(index);
    }

    render() {
        const {item} = this.props;

        const swipeBtns = [
            {
              text: '删除',
              backgroundColor: 'red',
              underlayColor: 'rgba(0, 0, 0, 0.6)',
              onPress: this.onDeleteItem
           }
        ];

        return (
            <Swipeout right={swipeBtns}
                autoClose={true}
                backgroundColor="transparent">
                <TouchableOpacity style={styles.container} onPress={this.onPress}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderBottomWidth: 1
    }
});
