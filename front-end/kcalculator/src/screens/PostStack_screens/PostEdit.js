import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';
import { Alert } from 'react-native';

const backendUrl = config.backendUrl;

const PostEdit = ({navigation, route}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { postId } = route.params; // 수정된 postId 참조
    const postListToServer = async (item) => {
        try {
            if (!item.title || !item.content) {
                Alert.alert("오류", "제목과 내용을 모두 입력해야 합니다.");
                return;
            }

            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("오류", "인증 토큰이 존재하지 않습니다.");
                return;
            }

            const data = {
                title: item.title,
                content: item.content,
            };

            console.log(data); // 데이터 확인
            const response = await axios.put(`${backendUrl}/api/posts/update/${postId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                Alert.alert("성공", "게시글이 수정되었습니다.");
                navigation.navigate('Post');
            }
        } catch (error) {
            console.error(error);
            Alert.alert("오류", `게시글 수정 실패: ${error.message}`);
        }
    };

    const onChangeTitle = (text) => setTitle(text);
    const onChangeContent = (text) => setContent(text);
    const onClickPostRegister = async () => {
        const postToServer = { title, content };
        await postListToServer(postToServer);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>게시글 수정</Text>
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
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>게시글 수정</Text>
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
        backgroundColor: '#39D02C', // 버튼 색상을 진한 파란색으로 변경
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

export default PostEdit;
