import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import config from '../config';

const backendUrl = config.backendUrl;

const BattleDetail = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [battle, setBattle] = useState(null);

    useEffect(() => {
        const fetchBattleDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/api/battleGroups/${groupId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBattle(response.data);
            } catch (error) {
                console.error('배틀 정보를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchBattleDetails();
    }, [groupId]);

    const handleJoinBattle = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("토큰 오류", "유효한 토큰이 없습니다. 다시 로그인 해주세요.");
                return;
            }

            const response = await axios.post(
                `${backendUrl}/api/battleGroups/enter/${groupId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('가입 성공:', response.data);
            Alert.alert("가입 완료", response.data);
            navigation.navigate('Battle');
        } catch (error) {
            console.error('가입 실패:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data) {
                console.log('서버 응답:', error.response.data); // 서버 응답 로그
                Alert.alert("가입 실패", error.response.data);
            } else {
                console.log('기타 오류:', error.message); // 기타 오류 로그
                Alert.alert("가입 실패", "배틀 가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const getPurposeText = (battlePurpose) => {
        switch (battlePurpose) {
            case 'DIET':
                return '다이어트';
            case 'WEIGHT_GAIN':
                return '증량';
            case 'RUNNING':
                return '달리기';
            default:
                return battlePurpose;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'RECRUITING':
                return '모집중';
            case 'PROGRESS':
                return '진행중';
            default:
                return status;
        }
    };

    if (!battle) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{battle.title}</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>{battle.content}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.user}>리더: {battle.leaderId}</Text>
                        <Text style={styles.purpose}>목표: {getPurposeText(battle.battlePurpose)}</Text>
                        <Text style={styles.dates}>기간: {battle.startDate} ~ {battle.endDate}</Text>
                        <Text style={styles.members}>모집 인원: {battle.currentMembers} / {battle.numberOfMembers}</Text>
                        <Text style={styles.status}>상태: {getStatusText(battle.status)}</Text>
                    </View>
                    <TouchableOpacity style={styles.joinButton} onPress={handleJoinBattle}>
                        <Text style={styles.joinButtonText}>가입하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        marginHorizontal: 16,
    },
    contentContainer: {
        minHeight: 275,
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    infoContainer: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    user: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555',
    },
    purpose: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555',
    },
    dates: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555',
    },
    members: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555',
    },
    status: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555',
    },
    joinButton: {
        backgroundColor: '#39D02C',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BattleDetail;
