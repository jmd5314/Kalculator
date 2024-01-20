import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // Import your backend URL configuration

const backendUrl = config.backendUrl;

const postListToServer = async (item) => {
    try {
        if (!item.title || !item.content) {
            return;
        }

        const token = await AsyncStorage.getItem('token');

        const currentTime = new Date();

        const data = {
            title: item.title,
            content: item.content,
            creationDate: currentTime,
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

const PostRegister = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
            <Button onPress={onClickPostRegister} title="게시글 등록" />
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
});

export default PostRegister;
