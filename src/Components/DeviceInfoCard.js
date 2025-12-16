import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

export default function DeviceInfoCard() {
    const [battery, setBattery] = useState(null);
    const [storage, setStorage] = useState(null);

    const fetchData = async () => {
        try {
            const bat = await DeviceInfoModule.getBatteryLevel();
            const stor = await DeviceInfoModule.getFreeStorage();
            setBattery(bat);
            setStorage(stor);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Battery Level</Text>
            <Text style={styles.value}>{battery ?? 'Loading...'}%</Text>

            <Text style={[styles.label, { marginTop: 12 }]}>Free Storage</Text>
            <Text style={styles.value}>{storage ?? 'Loading...'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginVertical: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    label: { fontSize: 14, color: '#555', fontWeight: '500' },
    value: { fontSize: 18, fontWeight: '600', color: '#222', marginTop: 4 },
});
