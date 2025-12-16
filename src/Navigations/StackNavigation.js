import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import { Button, TouchableOpacity, Text } from "react-native";
import { useAppContext } from "../Utils/AppContext";

export default function StackNavigation() {
    const Stack = createNativeStackNavigator();
    const { theme, toggleTheme } = useAppContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () => (
                    <TouchableOpacity
                        onPress={toggleTheme}
                        style={{ marginRight: 10, padding: 5 }}
                    >
                        <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
                        </Text>
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ headerTitle: "Home" }}
            />
            <Stack.Screen
                name="notification"
                component={NotificationScreen}
                options={{ headerTitle: "Notification" }}
            />
        </Stack.Navigator>
    );
}
