import React, { Component } from 'react';
import { Alert, ActivityIndicator, TextInput, TouchableOpacity, Image, Text, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../modules/util';
import {format} from '../../modules/time_format';
import { inject, observer } from 'mobx-react';
import containerStyles from '../styles';
import ImagePicker from 'react-native-image-picker';
import {HeaderBackButton} from 'react-navigation';
import DraftsModal from '../modals/drafts';
import MentionModal from '../modals/mention';

@inject('statusStore', 'draftsStore')
@observer
export default class ComposeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
          <Button
            title="发送"
            disabled={params.isSending}
            onPress={params.handleSave ? params.handleSave : () => null}
          />
        );

        const headerLeft = (
            <HeaderBackButton onPress={params.handleBack ? params.handleBack : () => null} />
        );

        return {
            headerRight,
            headerLeft: headerLeft
        };
      };

    constructor(options) {
        super(options);

        this.state = {
            geoEnabled: false,
            imageUri: null,
            text: this.getTextFromProps(),
            modalVisible: false,
            modalAtVisible: false
        };

        this.location_ = null;
        this._imageData = null;
    }

    componentWillMount() {
        this.errorToSaveDraft = false;
    }

    componentWillUnmout() {
        this.errorToSaveDraft = false;
    }

    getTextFromProps() {
        const {params} = this.props.navigation.state;
    
        if (params.repost_status_id) {
            return `转@${params.name} ${params.text}`;
        }

        if (params.in_reply_to_status_id) {
            return `@${params.name} `;
        }

        return '';
    }

    onClose = () => {
        this.props.navigation.goBack(null);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleSave: this._handleSave,
            handleBack: this._handleBack,
            isSending: false
        });
    }

    _handleBack = () => {
        if (this.state.text === '' || this.errorToSaveDraft) {
            this.onClose();
            return;
        }

        Alert.alert(
            '保存到草稿箱吗？',
            undefined,
            [
              {text: '取消', onPress: this.cancel, style: 'cancel'},
              {text: '确定', onPress: this.saveToDraft },
            ],
            { cancelable: false }
          )
    }

    saveToDraft = async () => {
        const resp = await this.props.draftsStore.add(this.state.text);

        if (resp === undefined) {
            this.errorToSaveDraft = true;
        } else {
            this.onClose();
        }
    }

    cancel = () => {
        this.onClose();
    }

    _handleSave = () => {
        const {imageUri} = this.state;

        this.props.navigation.setParams({
            isSending: true
        });

        if (imageUri) {
            this.updateStatus({
                photo: {
                    uri: imageUri,
                    ...this._imageData
                }
            });
            return;
        }

        this.updateStatus({
        })
    }

    async updateStatus(options) {
        const {text} = this.state;
        const {navigation} = this.props;
        const {params} = navigation.state;

        const _options = {
            status: text
        };

        if (params.repost_status_id) {
            _options.repost_status_id = params.repost_status_id;
        }

        if (params.in_reply_to_status_id) {
            _options.in_reply_to_status_id = params.in_reply_to_status_id;
        }

        if (this.location_) {
            _options.location = this.location_;
        }

        try {
            await this.props.statusStore.update({
                ..._options,
                ...options
            });
        } catch(error) {
            navigation.setParams({
                isSending: false
            });
            console.error(error);
            return;
        }

        navigation.setParams({
            isSending: false
        });

        Alert.alert('发布成功');
        this.onClose();
    }

    onDraftSelect = (text) => {
        this.setState(() => {
            const result = {modalVisible: false};

            if (text !== undefined) {
                result.text = text;
            }

            return result;
        });
    }

    onImagePress = () => {
        const options = {
            title: '选择图片',
            maxHeight: 200,
            maxWidth: 200,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              this.setState({ imageUri: response.uri });

              this._imageData = {
                  type: response.type,
                  name: response.fileName
              };
            }
          });
    }

    onDrafsPress = () => {
        this.setState(() => ({
            modalVisible: true
        }));
    }

    onAtPress = () => {
        this.setState(() => ({
            modalAtVisible: true
        }));
    }

    onGeoPress = () => {
        if (this.location_) {
            this.location_ = null;

            this.setState(() => {
                return {
                    geoEnabled: false
                }
            });

            return;
        }

        // navigator.geolocation.requestAuthorization?
        navigator.geolocation.getCurrentPosition((position) => {

            this.setState(() => {
                return {
                    geoEnabled: true
                }
            });

            const location = `${position.coords.latitude},${position.coords.longitude}`;

            this.location_ = location;
        });
    }

    onMentionSelect = (values) => {
        this.setState(() => ({
            modalAtVisible: false
        }));

        this.setState((prevState) => {
            let text = prevState.text;

            text = values.reduce((text, value) => {
                const separator = text === '' ? '' : ' ';
                return `${text}${separator}@${value}`;
            }, text);

            return {
                text
            }
        }, () => {
            this.textInput.focus();
        });
    }

    render() {
        const {geoEnabled, imageUri, text, modalVisible, modalAtVisible} = this.state;
        const {params} = this.props.navigation.state;

        return (
            <View>
                <View style={[styles.container, containerStyles.container]}>

                    <TextInput ref={(textInput) => {this.textInput = textInput;}} style={styles.textIput} onChangeText={(text) => this.setState({text})}
                        maxLength={140}
                        multiline={true}
                        autoFocus={true}
                        blurOnSubmit={true}
                        value={text}
                        selection={ params.repost_status_id ? {
                            start: 0,
                            end: 0
                        } : null}
                        autofocus={true}
                        onSubmitEditing={this._handleSave}
                    />
                </View>
                <View style={styles.toolbar}>
                    <TouchableOpacity style={styles.toolbarAction} onPress={this.onGeoPress}>
                        <Image style={styles.toolbarIcon} source={!geoEnabled ? require('../../res/icon/geo.png') : require('../../res/icon/geo_fence.png')}
                    /></TouchableOpacity>

                    <TouchableOpacity style={styles.toolbarAction} onPress={this.onImagePress}>
                        <Image style={styles.toolbarIcon} source={ require('../../res/icon/image.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toolbarAction} onPress={this.onDrafsPress}>
                        <Image style={styles.toolbarIcon} source={ require('../../res/icon/drafts.png')} />
                    </TouchableOpacity>

                    <DraftsModal modalVisible={modalVisible} onClose={this.onDraftSelect} />

                    <TouchableOpacity style={styles.toolbarAction} onPress={this.onAtPress}>
                        <Image style={styles.toolbarIcon} source={ require('../../res/icon/mention.png')} />
                    </TouchableOpacity>
                    <MentionModal modalVisible={modalAtVisible} onClose={this.onMentionSelect} />
                </View>
                {
                    imageUri && 
                    (<View>
                        <Image source={{uri: imageUri}} style={styles.image} />
                    </View>)
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    toolbar: {
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80
    },
    textIput: {
        height: 80,
        fontSize: 14,
        lineHeight: 20
    },
    toolbarAction: {
        marginLeft: 10,
        marginRight: 10
    },
    toolbarIcon: {
        width: 30,
        height: 30
    }
});
