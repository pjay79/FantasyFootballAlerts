import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PubNubReact from 'pubnub-react';
import Config from 'react-native-config';

export default () => {
  const pubnub = new PubNubReact({
    publishKey: Config.PUBNUB_PUBLISH_KEY,
    subscribeKey: Config.PUBNUB_SUBSCRIBE_KEY,
    uuid: Platform.os === 'ios' ? 'PJ-ios' : 'PJ-android',
  });
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
};
