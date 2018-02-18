import React, { Component } from 'react';
import { Modal, Dimensions, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import {toPhotoHttps, extractUserFromText} from '../util';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class PhotoCard extends Component {

    constructor(options) {
        super(options);

        this.state = {
            imageModalVisible: false
        }
    }

    onPress = () => {
        const {onPressItem} = this.props;
        const user = this.props.item;

        onPressItem({
            user
        });
    }

    onImagePress = () => {
        this.setState(() => ({
            imageModalVisible: true
        }))
    }

    onImageViewerClick = () => {
        this.setState(() => ({
            imageModalVisible: false
        }))
    }

    render() {
        const item = this.props.item;
        const imageUrls = [{url: toPhotoHttps(item.photo.largeurl)}];

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onImagePress}>
                    <Image style={styles.image} source={{uri: toPhotoHttps(item.photo.thumburl)}} />
                </TouchableOpacity>
                <Modal onRequestClose={this.onImageViewerClick} visible={this.state.imageModalVisible} transparent={true}>
                    <ImageViewer onClick={this.onImageViewerClick} imageUrls={imageUrls}/>
                </Modal>
            </View>
        )
    }
}

const {width} = Dimensions.get('window');
const itemWidth = width / 3;

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: itemWidth,
        height: itemWidth
    }
});
