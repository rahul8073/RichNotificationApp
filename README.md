# 📱 NotificationApp – Feature-Rich React Native Application

A feature-rich **React Native** application demonstrating **push notifications, deep linking, native modules, OTA updates, and API integration** using modern best practices.

---

## 🚀 Features

### 🔔 Push Notifications (FCM)

* Firebase Cloud Messaging (HTTP v1)
* Foreground, background & killed state handling
* Notification tap → Deep linking
* Local notifications using **Notifee**

### 🔗 Deep Linking

* Navigates to `NotificationScreen` when a notification is tapped
* Handles app open from background & quit state

### 🔋 Native Modules (Android & iOS)

* Retrieves **Battery Level**
* Retrieves **Device Storage**
* Implemented using:

  * **Kotlin** (Android)
  * **Swift** (iOS)
* Exposed to React Native via the JS bridge

### 🌐 API Integration

* Public API: `https://jsonplaceholder.typicode.com/posts`
* Loading, error & success UI states
* **Context API** for state management

### 🎨 UI & Architecture

* Modular, reusable components
* Context-based global state handling
* Clean and scalable folder structure

### 🚀 OTA Updates (Revopush)

* Staging & Production deployments
* Android & iOS support
* Instant over-the-air updates without app store resubmission

---

## 🧰 Tech Stack

* React Native (CLI)
* Firebase Cloud Messaging
* Notifee
* Context API
* Kotlin (Android Native Module)
* Swift (iOS Native Module)
* Revopush (OTA Updates)

---

## 🔔 Push Notification Flow

1. FCM message sent via Firebase Console or backend
2. App receives message
3. Foreground → Local notification shown (Notifee)
4. Background/Quit → System notification
5. Notification tap → Deep link navigation

---

## 🔋 Native Module Example

### JavaScript Bridge

```js
import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

export const getBatteryLevel = async () => {
  return await DeviceInfoModule.getBatteryLevel();
};
```

---

## 📂 Project Structure

```
android/app/src/main/java/
├── DeviceInfoModule.kt
├── DeviceInfoPackage.kt

src/
├── Components/
│   ├── DeviceInfoCard.js      # Uses native module
│   ├── PostsSection.js
├── Notification/
│   └── NotificationService.js
├── Navigations/
│   ├── RootNavigation.js
│   └── StackNavigation.js
├── Screens/
│   ├── HomeScreen.js          # Renders DeviceInfoCard
│   └── NotificationScreen.js
├── Service/
│   └── Api.js
├── Utils/
│   └── AppContext.js
```

---

## 🏁 Getting Started

### Prerequisites

* Node.js
* Android Studio / Xcode
* Java JDK
* CocoaPods (iOS)

Follow the official setup guide:
👉 [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

---

## ▶️ Running the App

### Step 1: Start Metro

```bash
# npm
npm start

# yarn
yarn start
```

### Step 2: Run on Device

#### Android

```bash
npm run android
# or
yarn android
```

#### iOS

Install CocoaPods (first time or after native changes):

```bash
bundle install
bundle exec pod install
```

Run the app:

```bash
npm run ios
# or
yarn ios
```

---

## 🔄 OTA Updates with Revopush

### Install Revopush CLI

```bash
npm install -g @revopush/code-push-cli
```

### Login

```bash
revopush login
```

Check login status:

```bash
revopush whoami
```

Logout:

```bash
revopush logout
```

---

### 📦 Release Updates

#### 🔹 Staging

```bash
revopush release-react RichNotificationApp android -d Staging
revopush release-react RichNotificationApp ios -d Staging
```

#### 🔹 Production

```bash
revopush release-react RichNotificationApp android -d Production
revopush release-react RichNotificationApp ios -d Production
```

---

## 🛠 Development Tips

* Fast Refresh enabled by default
* Force reload:

  * **Android**: Press `R` twice or `Ctrl + M` → Reload
  * **iOS**: Press `R` in Simulator

---

## 📚 Learn More

* React Native Docs: [https://reactnative.dev](https://reactnative.dev)
* Firebase Cloud Messaging: [https://firebase.google.com/docs/cloud-messaging](https://firebase.google.com/docs/cloud-messaging)
* Notifee: [https://notifee.app](https://notifee.app)
* Revopush: [https://revopush.org](https://revopush.org)

---

## 🎉 Congratulations

You’ve successfully set up and run the **NotificationApp** with push notifications, native modules, deep linking, and OTA u
