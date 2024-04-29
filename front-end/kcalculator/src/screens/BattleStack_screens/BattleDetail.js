import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import config from '../config';

const backendUrl = config.backendUrl;

const BattleDetail = ({ route }) => {
    const { id, title, content, userId } = route.params;

    const handleJoinBattle = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/api/`, {
                userId: userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('가입 성공:', response.data);
            // 가입 성공 시, AsyncStorage에 가입한 배틀의 ID 추가
            const joinedBattleIds = await AsyncStorage.getItem('joinedBattleIds');
            const updatedJoinedBattleIds = joinedBattleIds ? JSON.parse(joinedBattleIds) : [];
            updatedJoinedBattleIds.push(id);
            await AsyncStorage.setItem('joinedBattleIds', JSON.stringify(updatedJoinedBattleIds));
        } catch (error) {
            console.error('가입 실패:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.user}>작성자: {userId}</Text>
            <Text style={styles.content}>{content}</Text>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinBattle}>
                <Text style={styles.joinButtonText}>가입하기</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    user: {
        fontSize: 16,
        marginBottom: 8,
    },
    content: {
        fontSize: 18,
        marginBottom: 16,
    },
    joinButton: {
        backgroundColor: '#39D02C',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BattleDetail;