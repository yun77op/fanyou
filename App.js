import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Fanyou from './src/App';
import {setup as netInfoSetup, teardown as netInfoTeardown} from './src/modules/net_info';

export default class App extends React.Component {

  componentWillmount() {
    netInfoSetup();
  }

  componentWillUnmount() {
    netInfoTeardown();
  }

  render() {
    return (
      <Fanyou />
    );
  }
}
