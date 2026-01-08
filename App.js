import React, { useEffect, useState } from 'react';
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
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(null);
  const [showUpdateUI, setShowUpdateUI] = useState(false);

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    createChannel();
    registerNotificationListeners();

    codePush.sync(
      {
        installMode: codePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      },
      syncStatus => {
        switch (syncStatus) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            setShowUpdateUI(true);
            setStatus('Checking for updates...');
            break;

          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            setShowUpdateUI(true);
            setStatus('Downloading update...');
            break;

          case codePush.SyncStatus.INSTALLING_UPDATE:
            setStatus('Installing update...');
            break;

          case codePush.SyncStatus.UPDATE_INSTALLED:
            setStatus('Update installed. Restarting...');
            codePush.restartApp(); // 🔁 restart immediately
            break;

          case codePush.SyncStatus.UP_TO_DATE:
            setShowUpdateUI(false);
            break;

          case codePush.SyncStatus.UNKNOWN_ERROR:
            setStatus('Update failed');
            setShowUpdateUI(false);
            break;
        }
      },
      downloadProgress => {
        setProgress(downloadProgress);
      },
    );
  }, []);

  const percentage =
    progress && progress.totalBytes
      ? Math.round((progress.receivedBytes / progress.totalBytes) * 100)
      : 0;

  return (
    <AppProvider>
      <AppContent />

      {showUpdateUI && (
        <View style={styles.overlay}>
          <Text style={styles.title}>{status}</Text>

          {progress ? (
            <>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={percentage / 100}
                color="#4CAF50"
                style={{ width: '70%' }}
              />
              <Text style={styles.percent}>{percentage}%</Text>
            </>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
      )}
    </AppProvider>
  );
}

App = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);

export default App;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
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
