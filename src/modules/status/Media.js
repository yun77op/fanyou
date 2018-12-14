import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, NetInfo, Modal, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {toHttps, toPhotoHttps, extractUserFromText} from '../util';
import {getEffectiveType} from '../net_info';

import { inject, observer } from 'mobx-react';


@inject('preferencesStore')
@observer
export default class StatusMedia extends Component {

  state = {
    imageModalVisible: false
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
    const {imageModalVisible} = this.state;
    const {thumburl, largeurl, imageurl} = this.props.photo;

    const httpsThumburl = toPhotoHttps(thumburl);
    const effectiveType = getEffectiveType();
    let originUrl = largeurl;

    if (this.props.preferencesStore.smartPic) {
      originUrl = effectiveType === '4g' ? largeurl : imageurl;
    }

    const images = [{
        url: toPhotoHttps(originUrl)
    }]

    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.onImagePress} style={styles.thumbContainer}><Image style={styles.thumb} source={{uri: httpsThumburl}} /></TouchableOpacity>
        <Modal onRequestClose={this.onImageViewerClick} visible={imageModalVisible} transparent={true}>
          <ImageViewer onClick={this.onImageViewerClick} imageUrls={images}/>
        </Modal>
      </React.Fragment>
    )
  }
  
}

StatusMedia.propTypes = {
  photo: PropTypes.shape({
    thumburl: PropTypes.string,
    largeurl: PropTypes.string,
    imageurl: PropTypes.string,
  })
}


const styles = StyleSheet.create({
  thumbContainer: {
      maxWidth: 80,
      height: 80,
      marginLeft: 5,
      flexGrow: 1
  },
  thumb: {
      flex: 1,
      width: undefined,
      height: undefined,
      resizeMode: 'cover'
  },
});
