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
import PubNubReact from 'pubnub-react';

const PushNotification = require('react-native-push-notification');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'YOUR_PUBNUB_PUBLISH_KEY_HERE',
      subscribeKey: 'YOUR_PUBNUB_SUBSCRIBE_KEY_HERE',
    });
    this.pubnub.init(this);
    PushNotification.configure({
      // Called when Token is generated.
      onRegister(token) {
        console.log('TOKEN:', token);
        if (token.os === 'ios') {
          this.pubnub.push.addChannels({
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'apns',
          });
          // Send iOS notify from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
        } else if (token.os === 'android') {
          this.pubnub.push.addChannels({
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'gcm', // apns, gcm, mpns
          });
          // Send Android notify from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
        }
      },
      // Something not working?
      // See: https://support.pubnub.com/support/solutions/articles/14000043605-how-can-i-troubleshoot-my-push-notification-issues-
      // Called when a remote or local notification is opened or received.
      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
        // Do something with the notification.
        // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID: GCM or FCM Sender ID
      senderID: 'sender-id',
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
    backgroundColor: '#009F35',
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
