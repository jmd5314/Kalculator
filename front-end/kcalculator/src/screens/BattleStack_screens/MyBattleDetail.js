import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ProgressBarAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const MyBattleDetail = ({ route }) => {
    const { groupId, groupName, battlePurpose, target } = route.params;
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/api/battleGroups/myGroups/${groupId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const sortedParticipants = response.data.sort((a, b) => b.score - a.score);
                setParticipants(sortedParticipants);
            } catch (error) {
                console.error('참가자 정보 가져오기 실패:', error);
            }
        };
        fetchParticipants();
    }, [groupId]);

    const getScoreText = (score, battlePurpose) => {
        switch (battlePurpose) {
            case 'RUNNING':
                return `달린 거리: ${score}km`;
            case 'DIET':
                return `감량한 무게: ${score}kg`;
            case 'WEIGHT_GAIN':
                return `증량한 무게: ${score}kg`;
            default:
                return `점수: ${score}`;
        }
    };

    const getProgress = (score, target) => {
        return target > 0 ? (score / target) * 100 : 0;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{groupName}</Text>
            <FlatList
                data={participants}
                renderItem={({ item, index }) => (
                    <View style={styles.participantItem}>
                        <View style={styles.participantInfo}>
                            <Text style={styles.rank}>{index + 1}위</Text>
                            <Text style={styles.participantName}>{item.nickname}</Text>
                            <Text style={styles.participantScore}>{getScoreText(item.score, battlePurpose)}</Text>
                        </View>
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>목표 달성률: {getProgress(item.score, target).toFixed(2)}%</Text>
                            <ProgressBarAndroid
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={getProgress(item.score, target) / 100}
                                color="#39D02C"
                            />
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.userId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    participantItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    participantInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#39D02C',
    },
    participantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    participantScore: {
        fontSize: 16,
        color: '#666',
    },
    progressContainer: {
        marginTop: 10,
    },
    progressText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
});

export default MyBattleDetail;
