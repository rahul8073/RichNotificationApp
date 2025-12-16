import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { showLocalNotification } from '../Notification/NotificationService';
import { useNavigation } from '@react-navigation/native';
import PostsSection from '../Components/PostsSection';
import DeviceInfoCard from '../Components/DeviceInfoCard';
import { useAppContext } from '../Utils/AppContext';

export default function HomeScreen() {
    const { theme } = useAppContext();
    const navigation = useNavigation();

    const isDark = theme === 'dark';
    const buttonBg = isDark ? '#bb86fc' : '#6200ee';
    const buttonTextColor = '#fff';
    const textColor = isDark ? '#fff' : '#000';

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: isDark ? '#121212' : '#f5f6fa' },
            ]}
        >
            <Text style={[styles.title, { color: textColor }]}>Welcome</Text>

            {/* Device Info */}
            <DeviceInfoCard />

            {/* Custom Notification Button */}
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: buttonBg, opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={() =>
                    showLocalNotification({
                        interface: 'Notice',
                        title: 'Hello',
                        body: 'Triggered from Home Screen',
                    })
                }
            >
                <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                    Trigger Local Notification
                </Text>
            </Pressable>

            {/* Custom Navigation Button */}
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: buttonBg, opacity: pressed ? 0.7 : 1, marginTop: 12 },
                ]}
                onPress={() =>
                    navigation.navigate('notification', {
                        title: 'Manual Navigation',
                        body: 'Opened from Home button',
                    })
                }
            >
                <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                    Open Notification Screen (Deep Link)
                </Text>
            </Pressable>

            {/* Posts Section */}
            <Text style={[styles.sectionTitle, { color: textColor }]}>Posts</Text>
            <PostsSection />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24 },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 24 },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: { fontSize: 16, fontWeight: '600' },
});
