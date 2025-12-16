import React, { useEffect, useContext } from "react";
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

const AppContent = () => {
  const { theme } = useAppContext();

  return (
    <NavigationContainer ref={navigationRef} theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default function App() {
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
