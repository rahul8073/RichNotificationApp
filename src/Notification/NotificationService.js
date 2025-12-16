import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { navigate } from '../Navigations/RootNavigation';

/* Permission */
export const requestUserPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

/* FCM Token */
export const getFcmToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
};

/* Channel */
export const createChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};

/* MANUAL LOCAL NOTIFICATION */
export const showLocalNotification = async ({ title, body, data = {} }) => {
  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId: 'default',
      pressAction: { id: 'default' },
    },
  });
};

/*Display FCM Notification */
const displayNotification = async remoteMessage => {
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    data: remoteMessage.data,
    android: {
      channelId: 'default',
      pressAction: { id: 'default' },
    },
  });
};

/*  Listeners */
export const registerNotificationListeners = () => {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        handleNotification(remoteMessage.data);
      }
    });

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      handleNotification(remoteMessage.data);
    }
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(' Background message received', remoteMessage);

  });

  // Notification tap (foreground)
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log();

      navigate('notification', detail.data);
    }
  });
};

const handleNotification = (data) => {
  const { interFace } = data;
  switch (interFace) {
    case 'Notice':
      navigate('notification', data);
      break;

    default:
      navigate('home', data);
  }
};