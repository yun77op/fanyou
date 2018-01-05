import React, { Component } from 'react';
import { Modal, Alert, ActivityIndicator, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import {FetchStatus} from '../../../store/modules/base';
import { inject, observer } from 'mobx-react';
import {HeaderBackButton, Header} from 'react-navigation';
import containerStyles from '../../styles';
import MentionItem from './item';
import MentionsTimeline from './timeline';

export default class MentionModal extends Component {

    onRequestClose = () => {
        this.onClose();
    }

    handleBack = () => {
        this.onClose();
    }

    handleOk = () => {
        const values = this.timeline.wrappedInstance.getValue();
        this.onClose(values);
    }

    onClose = (values) => {
        this.props.onClose(values);
    }

    render() {
        const {modalVisible} = this.props;

        return (
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={this.onRequestClose}
            >
            <View style={[styles.headerContainer, containerStyles.container]}>
                <HeaderBackButton onPress={this.handleBack} />
                <Button title='确定' onPress={this.handleOk} />
            </View>
            <View style={styles.container}>
               <MentionsTimeline ref={(timeline) => {
                    this.timeline = timeline;
               }} /> 
            </View>
          </Modal>
        )
    }
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
