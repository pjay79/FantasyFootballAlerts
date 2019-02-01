# FantasyFootball Alerts

React Native push notifications demo app using PubNub and PubNub-React

# Screenshots

## iOS

![img_4421](https://user-images.githubusercontent.com/14052885/52104751-21e61500-2640-11e9-9889-416ba1f4d116.PNG)
![img_4415](https://user-images.githubusercontent.com/14052885/52104431-b51e4b00-263e-11e9-960e-c1e7ce9908c4.PNG)
![img_4411](https://user-images.githubusercontent.com/14052885/52104427-b485b480-263e-11e9-93bb-92079e3c627c.PNG)
![img_4412](https://user-images.githubusercontent.com/14052885/52104428-b485b480-263e-11e9-85f7-0c5f201ed18e.PNG)
![img_4413](https://user-images.githubusercontent.com/14052885/52104429-b51e4b00-263e-11e9-9b71-fb47c7568841.PNG)
![img_4414](https://user-images.githubusercontent.com/14052885/52104430-b51e4b00-263e-11e9-9bee-290aeacd70b4.PNG)

## Technology stack:

- prop-types
- pubnub
- pubnub-react
- react
- react-native
- react-native-app-intro-slider
- react-native-config
- react-native-gesture-handler
- react-native-push-notification
- react-native-vector-icons
- react-navigation

# Installation

## React Native setup:

Install Node.js:

https://nodejs.org/en/download/

`brew install watchman`  
`npm install -g react-native-cli`

## Project setup:

Clone the repo:  
`git clone https://github.com/pjay79/FantasyFootballAlerts.git`

Change to the project folder:  
`cd FanstasyFootballAlerts`

Add dependencies:  
`yarn`

### PubNub

Register an account on PunNub:

https://www.pubnub.com/

Create a new app called 'Fantasy Football Alerts':

<img width="778" alt="screen shot 2019-02-01 at 11 05 58 am" src="https://user-images.githubusercontent.com/14052885/52094046-95246280-2611-11e9-940f-63c5cf5d4139.png">

Create a new keyset for this app and record the **Publish Key** and **Subscribe Key** for use later.

### React Native Push Notifications

`yarn add react-native-push-notification`  
`react-native link`

## iOS APNS

Sign up for a paid Apple Developer account:

https://developer.apple.com/programs/

Open the Xcode project by going to the app's project root folder:

`cd FantasyFootballAlerts`  
`cd ios`  
`Open FantasyFootballAlerts.xcodeproj`

In Xcode, navigate to:

`Xcode > Preferences > Accounts`

Add your **Apple ID** for your Apple Developer Account.

In Xcode, navigate to your main project file (.xcodeproj file with blue icon) and find:

`General Settings`

Set the Bundle Identifier to a unique string, such as "com.[company].fantasyfootballalerts". Select your Apple developer account under the Team dropdown. Allow Xcode to automatically manage signing. Repeat this for the Tests target.

Next navigate to:

`Capabilities`

Toggle the switch for **Push Notifications** to **ON**.  
Toggle the switch for **Background Modes** to **ON** and select **Remote notifications**.

Manually link the **PushNotificationIOS** library by following the guide below:

https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking

To create an Apple Push Notification Service (APNS) SSL certificate (.p12 file), follow this excellent guide below from the AWS Amplify team:

https://aws-amplify.github.io/docs/ios/push-notifications-setup-apns

- for this project follow Steps 1 to 3 only
- set your App ID Suffix in Step 1 as the Bundle Identifier used in Xcode
- create a **Development SSL** instead of a Production SSL

The .p12 certificate is what we need. Apple has a new .p8 certificate, but at the moment this is not supported by PubNub. The .p12 certificate needs to be converted to a .pem file and then uploaded to PubNub. To convert .p12 to .pem enter the following in Terminal:

`openssl pkcs12 -in Certificates.p12 -out Certifcates.pem -nodes -clcerts`

Head back to the PubNub dashboard, select **Key Info** for your app, and turn on **Mobile Push Notifications**. Upload the .pem file and select **Development** as the **APNS Environment**.

This app uses **React Native Config** to manage environment variables. In your project folder add a **.env** file with references for the **Publish Key** and **Subscribe Key**

```
PUBNUB_PUBLISH_KEY=pub-c-1234...
PUBNUB_SUBSCRIBE_KEY=sub-c-6789...
```

## Android FCM/GCM setup

Back in the project folder, find and edit the AndroidManifest.xml file and add the following:

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.fantasyfootballalerts"
    android:usesCleartextTraffic="true"
    >
```

```
<uses-permission android:name="android.permission.WAKE_LOCK" />
<permission
   android:name="${applicationId}.permission.C2D_MESSAGE"
   android:protectionLevel="signature" />
<uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
```

Inside the application section:

```
<receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
<receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
    </intent-filter>
</receiver>
<service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>
<service
    android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
    android:exported="false" >
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

Sign up to Google Firebase:

https://firebase.google.com/

Next select **Add Firebase to app** choosing the Android option. Enter the same package name that is found at the top of the MainApplication.java file in your project. Download the **google-service.json** file and add it to the android/app directory. Skip the other steps listed.

In the console go to:

`Project Settings > Cloud Messaging`

Make note of the **Server Key** and **Sender ID**.

Head back to the PubNub dashboard, select **Key Info** for your app, and again under the **Mobile Push Notifications** section, copy the **Server Key** to the **GCM API Key** input.

Add the **Sender ID** to the **.env** file already created:

```
PUBNUB_PUBLISH_KEY=pub-c-1234...
PUBNUB_SUBSCRIBE_KEY=sub-c-6789...
FCM_SENDER_ID=12346789
```

# Runing on device

### iOS

https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices

### Android

https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-android-devices

# React Native code:

## App.js

```
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
```

## PushNotificationWorker.js

I have hardcoded a uuid in the PubNubReact initialization. I would suggest using something like a username or other form of ID to uniquley identify each device.

```
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
```

# Testing Push Notifications

Back in the PubNub dashboard, select your app and keyset. Select **Debug Console** and create a client with **Default Channel** set to **notifications**. Also create another client called **notifications-pndebug**.

In the **notifications** channel enter the following:

```
{
  "pn_gcm": {
    "data": { "message": "Hello World!" }
  },
  "pn_apns": {
    "aps": { "alert": "Hello World!" }
  },
 "pn_debug": true
}
```

In the **notifications-pndebug** channel, you should see the following output:

```
"Devices found for push notification apns: 1 gcm: 1 mpns: 0"
```

<img width="777" alt="screen shot 2019-02-01 at 3 03 59 pm" src="https://user-images.githubusercontent.com/14052885/52102399-59e75b00-2634-11e9-8373-2b622c4fc413.png">

Of course, check your device and you should see the notifications!

Please refer to the PubNub Javascript / React V4 SDK documentation for more detailed implementation details.

https://www.pubnub.com/docs/react-native-javascript/pubnub-javascript-sdk
