/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import PushNotificationWorker from './app/utils/PushNotificationWorker';
import MainNavigator from './app/features/MainNavigator';

export default class App extends Component {
  componentDidMount() {
    PushNotificationWorker();
  }

  render() {
    return <MainNavigator />;
  }
}
