import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const MyBattle = ({ navigation }) => {
    const [joinedBattles, setJoinedBattles] = useState([]);

    useEffect(() => {
        const fetchJoinedBattles = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const joinedBattleIds = await AsyncStorage.getItem('joinedBattleIds');
                if (!joinedBattleIds) return;

                const parsedIds = JSON.parse(joinedBattleIds);
                const promises = parsedIds.map(async (battleId) => {
                    const response = await axios.get(`${backendUrl}/api/battles/${battleId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response.data;
                });
                const battles = await Promise.all(promises);
                setJoinedBattles(battles);
            } catch (error) {
                console.error('가입한 배틀 정보 가져오기 실패:', error);
            }
        };
        fetchJoinedBattles();
    }, []);

    const handleBattlePress = (battle) => {
        navigation.navigate('MyBattleDetail', { battle });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>내가 가입한 배틀</Text>
            <FlatList
                data={joinedBattles}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleBattlePress(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemContent}>{item.content}</Text>
                            <Text style={styles.itemUser}>작성자: {item.userId}</Text>
                        </View>
                    </TouchableOpacity>
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
    item: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemContent: {
        fontSize: 16,
        marginTop: 8,
    },
    itemUser: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
});

export default MyBattle;