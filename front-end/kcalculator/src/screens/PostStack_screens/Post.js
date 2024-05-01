import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const Post = ({ navigation, route }) => {
    const [posts, setPosts] = useState([]);

    const getListFromServer = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/api/posts/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getListFromServer();
        });

        return unsubscribe;
    }, [navigation, getListFromServer]);

    const renderItem = ({ item }) => (
        <PostComponent
            title={item.title}
            content={item.content}
            userId={item.userId}
            postId={item.postId}
            favoriteCount={item.likeCount}
            commentCount={item.commentCount}
            navigation={navigation}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { marginRight: 270 }]}>게시판</Text>
                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => navigation.navigate('PostRegister')}>
                    <Icon name="plus" size={20} color="#555" style={styles.header} />
                </TouchableOpacity>
            </View>
            {posts && (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </SafeAreaView>
    );
};

const PostComponent = ({ title, content, userId, postId, favoriteCount, commentCount, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Postdetail', { postId })}>
        <View style={styles.postContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.user}>{userId}</Text>
            <View style={styles.iconContainer}>
                <Icon name="thumbs-o-up" size={20} color="#555" style={{ marginRight: 8 }} />
                <Text style={{ marginRight: 100 }}>{favoriteCount}</Text>
                <Icon name="comment-o" size={20} color="#555" style={{ marginLeft: 8 }} />
                <Text style={{ marginRight: 100 }}>{commentCount}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 15,
    },
    postContainer: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-around',
        alignItems: 'center', // 수직 방향 가운데 정렬
        padding: 10, // 좌우 여백 추가
        backgroundColor: '#F0F0F0', // 배경색 추가
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
});

export default Post;