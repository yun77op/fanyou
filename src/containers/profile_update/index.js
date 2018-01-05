import React, { Component } from 'react';
import { ScrollView, TextInput, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../modules/util';
import utilStyles from '../../modules/util_styles';
import { inject, observer } from 'mobx-react';


@inject('userStore')
@observer
export default class ProfileUpdateScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
          <Button
            title="存储"
            disabled={params.isSending}
            onPress={params.handleSave ? params.handleSave : () => null}
          />
        );
        return { headerRight };
    };

    _handleSave = async () => {

        const {navigation, userStore} = this.props;
        const { navigate } = navigation;
        navigation.setParams({
            isSending: true
        });

        try {
            await userStore.update({
                url: this.state.url,
                description: this.state.description,
                location: this.state.location,
                name: this.state.name
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

        // navigate back
        navigation.goBack(null);
      }

      componentDidMount() {

        this.props.navigation.setParams({
            handleSave: this._handleSave,
            isSending: false
        });
      }

    constructor(options) {
        super(options);
        const {user} = this.props.navigation.state.params;

        this.onChangeUrl = this.onChangeText.bind(this, 'url');
        this.onChangeName = this.onChangeText.bind(this, 'name');
        this.onChangeDescription = this.onChangeText.bind(this, 'description');
        this.onChangeLocation = this.onChangeText.bind(this, 'location');

        this.state = {
            url: user.url,
            description: user.description,
            location: user.location,
            name: user.name
        }
    }

    onChangeText(name, value) {
        this.setState(() => {
            return {
                [name]: value
            }
        })
    }

    render() {
        const {navigation} = this.props;
        const {user} = this.props.navigation.state.params;

        return (
            <ScrollView style={[styles.container, utilStyles.safeArea]}>
                <View style={styles.contentContainer}>
                    <Image style={styles.avator} source={{uri: toHttps(user.profile_image_url)}} />
                    <View style={styles.content}>
                        <TextInput onChangeText={this.onChangeName} value={this.state.name} placeholder='昵称' />
                        <TextInput style={utilStyles.mt1} onChangeText={this.onChangeLocation} value={this.state.location} placeholder='地址' />
                        <TextInput style={utilStyles.mt1} onChangeText={this.onChangeUrl} value={this.state.url} placeholder='主页' />
                    </View>
                </View>
                <TextInput onChangeText={this.onChangeDescription} value={this.state.description} placeholder='描述' />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    content: {
        flex: 1
    },
    avator: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 40
    }
});
