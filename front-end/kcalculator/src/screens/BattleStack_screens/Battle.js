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
            const response = await axios.get(`${backendUrl}/api/`, {
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

    const getStatus = (battle) => {
        const currentDate = new Date();
        const startDate = new Date(battle.startDate);
        const endDate = new Date(battle.endDate);

        if (currentDate < startDate) {
            return '모집중';
        } else if (currentDate >= startDate && currentDate <= endDate) {
            return '진행중';
        } else {
            return '완료';
        }
    };

    const renderItem = ({ item }) => {
        const status = getStatus(item);
        let backgroundColor = '#fff'; // 기본 배경색
        let textColor = '#333'; // 기본 텍스트 색상

        switch (status) {
            case '모집중':
                backgroundColor = '#39D02C'; // 초록색
                break;
            case '진행중':
                backgroundColor = '#007bff'; // 파란색
                textColor = '#fff'; // 흰색 텍스트
                break;
            case '완료':
                backgroundColor = '#666'; // 회색
                textColor = '#fff'; // 흰색 텍스트
                break;
            default:
                break;
        }

        return (
            <BattleComponent
                title={item.title}
                content={item.content}
                userId={item.userId}
                navigation={navigation}
                backgroundColor={backgroundColor} // 배경색 전달
                textColor={textColor} // 텍스트 색상 전달
                status={status}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { marginRight: 250 }]}>Battle</Text>
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

const BattleComponent = ({ title, content, userId, navigation, backgroundColor, textColor, status }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BattleDetail')}>
        <View style={[styles.battleContainer, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <Text style={[styles.user, { color: textColor }]}>{userId}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.content, { color: textColor }]}>
                {content}
            </Text>
            <Text style={[styles.user, { color: textColor }]}>{status}</Text>
        </View>
    </TouchableOpacity>
);

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
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    user: {
        fontSize: 16,
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