import React, { Component } from 'react';
import { ScrollView, FlatList, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';

export default class UserCard extends Component {

    state = {
        expanded: false,
        text: '展开'
    };

    onClick = () => {
        this.setState(({expanded}) => {
            return {
                expanded: !expanded,
                text: expanded ? '展开' : '收起'
            }
        }) 
    }

    render() {
        const {content} = this.props;

        const props = {};

        if (!this.state.expanded) {
            props.numberOfLines = 3;
            props.ellipsizeMode = 'tail';
        }

        return (
            <View>
                <Text {...props}>{content}</Text>
                <Button title={this.state.text} onPress={this.onClick} />
            </View>
        )
    }
}
