import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ProgressBarAndroid,
} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useFocusEffect,
} from '@react-navigation/native';
import StackNavigation from './src/Navigations/StackNavigation';
import { navigationRef } from './src/Navigations/RootNavigation';
import { AppProvider, useAppContext } from './src/Utils/AppContext';
import {
  createChannel,
  getFcmToken,
  registerNotificationListeners,
  requestUserPermission,
} from './src/Notification/NotificationService';
import codePush from '@revopush/react-native-code-push';

const AppContent = () => {
  const { theme } = useAppContext();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <StackNavigation />
    </NavigationContainer>
  );
};

function App() {
  const [status, setStatus] = useState('test');
  const [progress, setProgress] = useState(5);
  const [showUpdateUI, setShowUpdateUI] = useState(false);

  useFocusEffect(
    useCallback(() => {
      requestUserPermission();
      getFcmToken();
      createChannel();
      registerNotificationListeners();
      codePush.sync(
        {
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        codePushStatusDidChange,
        codePushDownloadDidProgress,
      );
    }, []),
  );

  const codePushStatusDidChange = status => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setShowUpdateUI(true);
        setStatus('Checking for updates...');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setShowUpdateUI(true);
        setStatus('Downloading update...');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        setStatus('Installing update...');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        setStatus('Update installed. Restarting...');
        codePush.restartApp(); // 🔁 restart immediately
        break;
      default:
        setStatus('Update failed');
        setShowUpdateUI(false);
        break;
    }
  };

  const codePushDownloadDidProgress = progress => {
    setProgress(progress);
    console.log(
      `${progress.receivedBytes} of ${progress.totalBytes} received.`,
    );
  };

  const percentage =
    progress && progress.totalBytes
      ? Math.round((progress.receivedBytes / progress.totalBytes) * 100)
      : 0;

  return (
    <AppProvider>
      {/* {!showUpdateUI && (
      )} */}
      <View style={styles.overlay}>
        <Text style={styles.title}>{status}</Text>

        {progress ? (
          <>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${percentage}%` }]}
              />
            </View>
            <Text style={styles.percent}>{percentage}%</Text>
          </>
        ) : (
          <ActivityIndicator size="large" color="#fff" />
        )}
      </View>
      <AppContent />
    </AppProvider>
  );
}

export default codePush(App);

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  progressBar: {
    width: '70%',
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  percent: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
  },
});
