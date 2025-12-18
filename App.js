import React, { useEffect } from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import StackNavigation from "./src/Navigations/StackNavigation";
import { navigationRef } from "./src/Navigations/RootNavigation";
import { AppProvider, useAppContext } from "./src/Utils/AppContext";
import {
  createChannel,
  getFcmToken,
  registerNotificationListeners,
  requestUserPermission,
} from "./src/Notification/NotificationService";
import codePush from "@revopush/react-native-code-push";

const AppContent = () => {
  const { theme } = useAppContext();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StackNavigation />
    </NavigationContainer>
  );
};

function App() {
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    createChannel();
    registerNotificationListeners();
  }, []);

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
App = codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME })(App);
// App = codePush(App);

export default App;
