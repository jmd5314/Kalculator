import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // 백엔드 URL 설정을 가져오세요.

const backendUrl = config.backendUrl;

const BattleRegister = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [goal, setGoal] = useState('');

    const BattleListToServer = async (item) => {
        try {
            if (!item.title || !item.content) {
                return;
            }
    
            const token = await AsyncStorage.getItem('token');
    
            const data = {
                title: item.title,
                content: item.content,
                option: selectedOption, // 선택된 옵션을 서버로 보낼 데이터에 포함시킵니다.
            };
    
            console.log(data)
            const response = await axios.post(`${backendUrl}/api/`, data, {
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

    const onChangeGoal = (text) => {
        setGoal(text);
    };

    const onClickBattleRegister = async () => {
        const BattleToServer = {
            title: title,
            content: content,
            goal: goal,
        };

        try {
            const response = await BattleListToServer(BattleToServer);
            if(response)
            {
                alert("배틀이 등록되었습니다.")
                navigation.navigate('Battle')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>배틀 등록</Text>
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
                textAlignVertical="top"
            />
            <TextInput
                placeholder="목표"
                onChangeText={onChangeGoal}
                value={goal}
                style={styles.input}
            />
            <TouchableOpacity style={styles.registerButton} onPress={onClickBattleRegister}>
                <Text style={styles.registerButtonText}>배틀 등록</Text>
            </TouchableOpacity>
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
    goalText: {
        fontSize: 16,
        marginLeft: 10,
    },
    registerButton: {
        height: 50, 
        backgroundColor: '#39D02C', 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default BattleRegister;