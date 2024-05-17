import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const Battle = ({ navigation, route }) => {
    const [battles, setBattles] = useState([]);

    const getBattleListFromServer = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/api/battleGroups/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBattles(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getBattleListFromServer();
        });

        return unsubscribe;
    }, [navigation, getBattleListFromServer]);

    const renderItem = ({ item }) => (
        <BattleComponent
            groupId={item.groupId}
            groupName={item.groupName} // 그룹 이름 추가
            title={item.title}
            content={item.content}
            leaderId={item.leaderId}
            battlePurpose={item.battlePurpose}
            startDate={item.startDate}
            endDate={item.endDate}
            currentMembers={item.currentMembers}
            numberOfMembers={item.numberOfMembers}
            status={item.status}
            navigation={navigation}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { marginRight: 280 }]}>배틀</Text>
                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => navigation.navigate('MyBattle')}>
                    <Icon name="group" size={20} color="#555" style={styles.header} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={battles}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('BattleRegister')}>
                <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const BattleComponent = ({ groupId, groupName, title, content, leaderId, battlePurpose, startDate, endDate, currentMembers, numberOfMembers, status, navigation }) => {
    // 상태 변환
    const getStatusText = (status) => {
        switch (status) {
            case 'RECRUITING':
                return '모집중';
            case 'PROGRESS':
                return '진행중';
            default:
                return '';
        }
    };

    // 목표 변환
    const getPurposeText = (battlePurpose) => {
        switch (battlePurpose) {
            case 'DIET':
                return '다이어트';
            case 'WEIGHT_GAIN':
                return '증량';
            case 'RUNNING':
                return '달리기';
            default:
                return '';
        }
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('BattleDetail', { groupId })}>
            <View style={styles.battleContainer}>
                <Text style={styles.groupName}>{groupName}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.purpose}>목표: {getPurposeText(battlePurpose)}</Text>
                <Text style={styles.dates}>기간: {startDate} ~ {endDate}</Text>
                <Text style={styles.members}>모집 인원: {currentMembers} / {numberOfMembers}</Text>
                <Text style={styles.status}>배틀 {getStatusText(status)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        padding: 16,
    },
    battleContainer: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
    },
    groupName: {  // 그룹 이름 스타일 추가
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    title: {
        fontSize: 18,
        marginBottom: 4,
        color: '#333',
    },
    leader: {
        fontSize: 16,
        marginBottom: 4,
        color: '#666',
    },
    purpose: {
        fontSize: 16,
        marginBottom: 4,
        color: '#666',
    },
    dates: {
        fontSize: 16,
        marginBottom: 4,
        color: '#666',
    },
    members: {
        fontSize: 16,
        marginBottom: 4,
        color: '#666',
    },
    status: {
        fontSize: 18,
        marginTop: 4,
        color: '#666',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#39D02C',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    content: {
        fontSize: 16,
        color: '#333',
    },
});

export default Battle;
