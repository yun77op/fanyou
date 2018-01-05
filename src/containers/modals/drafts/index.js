import React, { Component } from 'react';
import { Modal, Alert, ActivityIndicator, FlatList, Text, StyleSheet, View, Button} from 'react-native';
import {FetchStatus} from '../../../store/modules/base';
import { inject, observer } from 'mobx-react';
import DraftItem from './item';
import {HeaderBackButton, Header} from 'react-navigation';
import containerStyles from '../../styles';

@inject('draftsStore')
@observer
export default class DraftsModal extends Component {

    renderItem = ({item, index}) => {
        return <DraftItem index={index} item={item} onPress={this.onPress} onDelete={this.onDelete} />
    }

    onPress = ({item, index}) => {
        this.onDelete(index).
            then(() => {
                this.onClose(item);
            });
    }

    onDelete = async (index) => {
        const error = await this.props.draftsStore.delete(index);

        if (error) {
            console.error(error);
        }
    }

    _keyExtractor = (item, index) => index;

    onRequestClose = () => {
        this.onClose();
    }

    handleBack = () => {
        this.onClose();
    }

    onClose = (item) => {
        this.props.onClose(item);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.modalVisible && nextProps.modalVisible) {
            this.props.draftsStore.fetch();
        }
    }

    render() {
        const {draftsStore, modalVisible} = this.props;

        const ListFooterComponent = draftsStore.fetchStatus === FetchStatus.LOADING ?
                        <ActivityIndicator animating={true} /> : null;

        return (
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={this.onRequestClose}
            >
            <View style={containerStyles.container}>
                <HeaderBackButton onPress={this.handleBack} />
            </View>
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this._keyExtractor} 
                    data={draftsStore.list}
                    ListFooterComponent={ListFooterComponent}
                    renderItem={this.renderItem} />
            </View>
          </Modal>
        )
    }
}


const styles = StyleSheet.create({
    container: {
    }
});
