# FantasyFootball Alerts

React Native push notifications demo app using PubNub and PubNub-React

# Screenshots

## iOS

## Android

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

And also install Xcode for iOS simulator + Android Studio / Genymotion for Android simulator. Preferably connect up a hardware device for this particular app to access geolocation, maps + directions, and phone connection.

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

Open the Xcode project buy going to the app's project root folder:

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

The .p12 certificate needs to be uploaded to PubNub. Apple has a new .p8 certificate, but at the moment this is not supported by PubNub. The .p12 certificate needs to be converted to a .pem file and then uploaded to PubNub. To convert .p12 to .pem enter the following in Terminal:

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

Head back to the PubNub dashboard, select **Key Info** for your app, under the **Mobile Push Notifications**. Copy the **Server Key** to the **GCM API Key** input.

Add the **Sender ID** to the **.env** file already created:

```
PUBNUB_PUBLISH_KEY=pub-c-1234...
PUBNUB_SUBSCRIBE_KEY=sub-c-6789...
FCM_SENDER_ID=12346789
```
