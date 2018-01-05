import React, { Component } from 'react';
import { ScrollView, Switch, TextInput, Text, Image, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {toHttps} from '../../modules/util';
import utilStyles from '../../modules/util_styles';
import { inject, observer } from 'mobx-react';
import PactivityIndicator from '../../modules/activity_indicator';


@inject('preferencesStore')
@observer
export default class Settings extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
          <Button
            title="存储"
            disabled={params.isSending}
            onPress={params.handleSave ? params.handleSave : () => null}
          />
        );
    };

    _handleSave = async () => {

        const {navigation, preferencesStore} = this.props;
        const { navigate } = navigation;
        navigation.setParams({
            isSending: true
        });

        try {
            await preferencesStore.save();
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

        this.onSmartPicValueChange = this.onValueChange.bind(this, 'smartPic');
    }

    onValueChange = (key, value) => {
        this.props.preferencesStore[key] = value;

        this.props.preferencesStore.save()
            .catch((error) => {
                console.error(error);
            })
    }

    componentWillMount() {
        if (!this.props.preferencesStore.sync) {
            this.props.preferencesStore.fetch();
        }
    }

    render() {

        if (!this.props.preferencesStore.sync) {
            return <PactivityIndicator />
        }

        const store = this.props.preferencesStore;

        return (
            <ScrollView style={[styles.container, utilStyles.safeArea]}>
                <View style={styles.controlRow}>
                    <Text style={styles.content}>查看大图智能选择合适尺寸，wifi环境选择大图，移动网络选择小图</Text>
                    <View style={styles.control}>
                        <Switch value={store.smartPic} onValueChange={this.onSmartPicValueChange} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    controlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1
    },
    control: {
        flexShrink: 0
    }
});
