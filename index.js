import { AppRegistry } from 'react-native';
import App from './App';
import notifee from '@notifee/react-native';
import { navigate } from './src/Navigations/RootNavigation';
import { name as appName } from './app.json';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
        navigate('Notification', detail.notification?.data);
    }
});

AppRegistry.registerComponent(appName, () => App);
