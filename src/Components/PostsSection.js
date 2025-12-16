import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppContext } from '../Utils/AppContext';

export default function PostsSection() {
    const { loading, error, posts, fetchPosts } = useAppContext();
    console.log(loading, error, posts);
    useEffect(() => {
        fetchPosts();
    }, [])
    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 12 }} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={{ marginTop: 12 }}>
            {posts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text>{post.body}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    postCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    postTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
    errorText: {
        color: 'red',
        marginVertical: 12,
    },
});
