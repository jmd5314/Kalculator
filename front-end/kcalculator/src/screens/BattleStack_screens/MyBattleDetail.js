import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const MyBattleDetail = ({ route }) => {
    const { battleId, battleName } = route.params;
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/api/battles/${battleId}/participants`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setParticipants(response.data);
            } catch (error) {
                console.error('참가자 정보 가져오기 실패:', error);
            }
        };
        fetchParticipants();
    }, [battleId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{battleName}</Text>
            <FlatList
                data={participants}
                renderItem={({ item }) => (
                    <View style={styles.participantItem}>
                        <Text style={styles.participantName}>{item.name}</Text>
                        <Text style={styles.participantScore}>점수: {item.score}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
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
        marginBottom: 16,
    },
    participantItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    participantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    participantScore: {
        fontSize: 16,
    },
});

export default MyBattleDetail;