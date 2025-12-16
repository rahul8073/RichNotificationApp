import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppContext } from '../Utils/AppContext';

export default function NotificationScreen() {
    const { theme } = useAppContext();
    const isDark = theme === 'dark';
    const route = useRoute();
    const { title, body } = route.params || {};

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f6fa' }]}>
            <Text style={[styles.heading, { color: isDark ? '#fff' : '#333' }]}>Notification Details</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Title</Text>
                <Text style={styles.title}>{title || 'N/A'}</Text>

                <Text style={[styles.label, { marginTop: 12 }]}>Body</Text>
                <Text style={styles.body}>{body || 'N/A'}</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    body: {
        fontSize: 16,
        color: '#333',
    },
    timestamp: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
    },
});
