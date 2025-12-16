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




