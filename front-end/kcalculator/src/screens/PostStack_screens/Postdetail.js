import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // Import your backend URL configuration

const backendUrl = config.backendUrl;


const Postdetail = ({navigation, route}) => {
    const { userId, postId } = route.params;
    const [certainPost, setCertainPost] = useState();
    const refreshKey = route.params?.refreshKey || Math.random().toString();
    useEffect(() => {
        const getListFromServer = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                const response = await axios.get(`${backendUrl}/api/posts/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const postList = response.data;
            setCertainPost(postList.filter(post => post.userId === userId && post.postId === postId));

            } catch (error) {
                console.error(error);
            }
        };
        getListFromServer();
    }, [refreshKey]);



    return (
        <View style={styles.container}>
        {certainPost && certainPost.length > 0 && (
          <>
             <TextInput
                placeholder="제목"
                value={certainPost[0].title}
                style={styles.input}
            />
            <TextInput
                style={[styles.input, styles.multilineInput]}
                multiline
                value={certainPost[0].content}
                textAlignVertical="top" // 이 부분을 추가
            />
            <TouchableOpacity style={ styles.registerButton }>

            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>게시글 등록</Text>
            </TouchableOpacity></>)}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 20,
        padding: 12,
        fontSize: 16,
    },
    multilineInput: {
        height: 300,
    },
    registerButton: {
        height: 50,
        width: 365,
        backgroundColor: '#39D02C',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Postdetail;
