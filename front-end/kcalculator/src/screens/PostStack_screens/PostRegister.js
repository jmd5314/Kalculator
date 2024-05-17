import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // Import your backend URL configuration

const backendUrl = config.backendUrl;

const PostRegister = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const postListToServer = async (item) => {
        try {
            if (!item.title || !item.content) {
                return;
            }

            const token = await AsyncStorage.getItem('token');

            const data = {
                title: item.title,
                content: item.content,
            };

            console.log(data)
            const response = await axios.post(`${backendUrl}/api/posts/save`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onChangeTitle = (text) => {
        setTitle(text);
    };

    const onChangeContent = (text) => {
        setContent(text);
    };

    const onClickPostRegister = async () => {
        const postToServer = {
            title: title,
            content: content,
        };

        try {
            const response = await postListToServer(postToServer);
            if(response)
            {
                alert("게시글이 등록되었습니다.")
                navigation.navigate('Post')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>게시글 등록</Text>
            <TextInput
                placeholder="제목"
                onChangeText={onChangeTitle}
                value={title}
                style={styles.input}
            />
            <TextInput
                placeholder="내용"
                onChangeText={onChangeContent}
                value={content}
                style={[styles.input, styles.multilineInput]}
                multiline
                textAlignVertical="top" // 이 부분을 추가
            />
            <TouchableOpacity style={ styles.registerButton }
                              onPress={() => {onClickPostRegister(); }}>
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>게시글 등록</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f7', // 밝은 회색조 배경으로 변경
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333', // 제목의 색상 조정
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc', // 테두리 색상 조정
        marginBottom: 20,
        padding: 15,
        fontSize: 18,
        borderRadius: 10, // 입력 필드의 모서리 둥글게 처리
        backgroundColor: '#fff', // 배경 색상
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    multilineInput: {
        minHeight: 200, // 높이 조정
    },
    registerButton: {
        height: 55,
        backgroundColor: '#39D02C',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, // 상단 여백 추가
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

export default PostRegister;
