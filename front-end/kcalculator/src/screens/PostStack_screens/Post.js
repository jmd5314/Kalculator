import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';
import { decode as atob } from 'base-64';

const backendUrl = config.backendUrl;

const Post = ({ navigation, route }) => {
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    const getListFromServer = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const [, payloadBase64] = token.split('.');
            const payload = JSON.parse(atob(payloadBase64));
            const decodedUserId = payload.userId;
            setCurrentUserId(decodedUserId);
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

    const handleDelete = async (postId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.delete(`${backendUrl}/api/posts/delete/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                Alert.alert('삭제 완료', '게시글이 성공적으로 삭제되었습니다.');
                getListFromServer(); // 삭제 후 목록 새로고침
            } else {
                throw new Error('서버로부터 예상치 못한 응답을 받았습니다.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('삭제 실패', `게시글 삭제에 실패했습니다: ${error.message}`);
        }
    };

    const renderItem = ({ item }) => (
        <PostComponent
            title={item.title}
            content={item.content}
            userId={item.userId}
            postId={item.postId}
            favoriteCount={item.likeCount}
            commentCount={item.commentCount}
            navigation={navigation}
            isCurrentUser={item.userId === currentUserId}
            onDelete={() => handleDelete(item.postId)}
            nickname={item.nickname} // 여기 추가
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.header}>게시판</Text>
            </View>
            {posts && (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('PostRegister')}>
                <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const PostComponent = ({ title, content, userId, postId, favoriteCount, commentCount, navigation, isCurrentUser, onDelete, nickname }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId })}>
        <View style={styles.postContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.user}>{nickname} ({userId})</Text>
            <View style={styles.iconContainer}>
                <Icon name="thumbs-o-up" size={20} color="#555" />
                <Text>{favoriteCount}</Text>
                <Icon name="comment-o" size={20} color="#555" />
                <Text>{commentCount}</Text>
            </View>
            {isCurrentUser && (
                <View style={styles.editDeleteContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('PostEdit', { postId })} style={{ marginRight: 5 }}>
                        <Icon name="edit" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete}>
                        <Icon name="trash" size={20} color="#F44336" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        position: 'relative',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
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
    user: {
        fontSize: 14,
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    editDeleteContainer: {
        position: 'absolute',
        right: 20,
        top: 10,
        flexDirection: 'row',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#39D02C',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});

export default Post;
