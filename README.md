
# 📱 NotificationApp – React Native Feature-Rich Application

A feature-rich React Native application demonstrating **push notifications, deep linking, native modules, and API integration** using modern best practices.

---

## 🚀 Features Implemented

### 🔔 Push Notifications (FCM)
- Firebase Cloud Messaging (HTTP v1)
- Foreground, background & killed state handling
- Notification tap → Deep linking
- Local notifications using Notifee

### 🔗 Deep Linking
- Navigates to `NotificationScreen` on notification tap
- Handles app open from background & quit state

### 🔋 Native Module (iOS & Android)
- Retrieves **Battery Level**
- Retrieves **Device Storage**
- Implemented using:
  - **Swift (iOS)**
  - **Kotlin (Android)**
- Exposed to React Native via JS bridge

### 🌐 API Integration
- Public API: `https://jsonplaceholder.typicode.com/posts`
- Loading, error & success UI states
- Context API used for state management

### 🎨 UI & Architecture
- Modular components
- Context-based theme handling
- Clean and scalable folder structure

---

## 🧰 Tech Stack

- React Native
- Firebase Cloud Messaging
- Notifee
- Context API
- Swift (iOS Native Module)
- Kotlin (Android Native Module)

---

## 🔔 Push Notification Flow

1. FCM message sent via Firebase Console / Backend
2. App receives message
3. Foreground → Local notification displayed
4. Background/Quit → System notification
5. Notification tap → Deep link navigation

---

## 🔋 Native Module Example

### JS Bridge

```js
import { NativeModules } from 'react-native';
const { DeviceInfoModule } = NativeModules;

export const getBatteryLevel = async () => {
  return await DeviceInfoModule.getBatteryLevel();
};

## 📂 Project Structure
android/app/src/main/java/
├── DeviceInfoModule.kt
├── DeviceInfoPackage.kt

src/
├── Components/
│   ├── DeviceInfoCard.js  ✅ uses native module
│   ├── PostsSection.js
├── Notification/
│   └── NotificationService.js
├── Navigations/
│   ├── RootNavigation.js
│   └── StackNavigation.js
├── Screens/
│   ├── HomeScreen.js  ✅ renders DeviceInfoCard
│   └── NotificationScreen.js
├── Service/
│   └── Api.js
├── Utils/
│   ├── AppContext.js

This is a new React Native project, bootstrapped using @react-native-community/cli.

Getting Started
Note: Make sure you have completed the Set Up Your Environment guide before proceeding.

Step 1: Start Metro
First, you will need to run Metro, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

# Using npm
npm start

# OR using Yarn
yarn start
Step 2: Build and run your app
With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

Android
# Using npm
npm run android

# OR using Yarn
yarn android
iOS
For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

bundle install
Then, and every time you update your native dependencies, run:

bundle exec pod install
For more information, please visit CocoaPods Getting Started guide.

# Using npm
npm run ios

# OR using Yarn
yarn ios
If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

Step 3: Modify your app
Now that you have successfully run the app, let's make changes!

Open App.tsx in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by Fast Refresh.

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

Android: Press the R key twice or select "Reload" from the Dev Menu, accessed via Ctrl + M (Windows/Linux) or Cmd ⌘ + M (macOS).
iOS: Press R in iOS Simulator.
Congratulations! 🎉
You've successfully run and modified your React Native App. 🥳

Now what?
If you want to add this new React Native code to an existing application, check out the Integration guide.
If you're curious to learn more about React Native, check out the docs.
Troubleshooting
If you're having issues getting the above steps to work, see the Troubleshooting page.

Learn More
To learn more about React Native, take a look at the following resources:

React Native Website - learn more about React Native.
Getting Started - an overview of React Native and how setup your environment.
Learn the Basics - a guided tour of the React Native basics.
Blog - read the latest official React Native Blog posts.
@facebook/react-native - the Open Source; GitHub repository for React Native.



