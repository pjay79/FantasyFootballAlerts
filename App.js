/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PubNubReact from 'pubnub-react';
import Config from 'react-native-config';

export default class App extends Component {
  componentDidMount() {
    const pubnub = new PubNubReact({
      publishKey: Config.PUBNUB_PUBLISH_KEY,
      subscribeKey: Config.PUBNUB_SUBSCRIBE_KEY,
    });
    console.log(Config.PUBNUB_PUBLISH_KEY);
    console.log(Config.PUBNUB_SUBSCRIBE_KEY);
    PushNotification.configure({
      // Called when Token is generated.
      onRegister(token) {
        console.log('TOKEN:', token);
        if (token.os === 'ios') {
          pubnub.push.addChannels(
            {
              channels: ['notifications'],
              device: token.token,
              pushGateway: 'apns',
            },
            (status) => {
              if (status.error) {
                console.log('Operation failed: ', status);
              } else {
                console.log('Operation done!');
              }
            },
          );
          // Send to iOS from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
        } else if (token.os === 'android') {
          pubnub.push.addChannels(
            {
              channels: ['notifications'],
              device: token.token,
              pushGateway: 'gcm', // apns, gcm, mpns
            },
            (status) => {
              if (status.error) {
                console.log('Operation failed: ', status);
              } else {
                console.log('Operation done!');
              }
            },
          );
          // Send to Android from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
        }
      },
      // Called when a remote or local notification is opened or received.
      onNotification(notification) {
        console.log('Alert:', notification);
        // Do something with the notification.
        // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID: GCM or FCM Sender ID
      senderID: Config.FCM_SENDER_ID,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Fantasy Football Alerts</Text>
        <Text style={styles.subHeader}>Push Notifications</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4AE0BD',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
