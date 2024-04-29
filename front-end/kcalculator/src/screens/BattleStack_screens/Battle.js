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

    const renderItem = ({ item }) => (
        <BattleComponent
            title={item.title}
            content={item.content}
            userId={item.userId}
            navigation={navigation}
        />
    );

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

const BattleComponent = ({ title, content, userId, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BattleDetail')}>
        <View style={styles.battleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.user}>{userId}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.content}>
                {content}
            </Text>
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