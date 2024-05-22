import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const MyBattle = ({ navigation }) => {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [filter, setFilter] = useState('all');

    const fetchJoinedGroups = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/api/battleGroups/myGroups`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setJoinedGroups(response.data);
            setFilteredGroups(response.data);
        } catch (error) {
            console.error('가입한 그룹 정보 가져오기 실패:', error);
        }
    }, []);

    useEffect(() => {
        fetchJoinedGroups();
    }, [fetchJoinedGroups]);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredGroups(joinedGroups);
        } else {
            setFilteredGroups(joinedGroups.filter(group => getStatusText(group.status) === filter));
        }
    }, [filter, joinedGroups]);

    const handleGroupPress = (group) => {
        navigation.navigate('MyBattleDetail', {
            groupId: group.groupId,
            battlePurpose: group.battlePurpose,
            target: group.target,
        });
    };

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PROGRESS':
                return '진행중';
            case 'COMPLETED':
                return '완료';
            default:
                return '';
        }
    };

    const getPurposeText = (purpose) => {
        switch (purpose) {
            case 'DIET':
                return '다이어트';
            case 'WEIGHT_GAIN':
                return '증량';
            case 'RUNNING':
                return '달리기';
            default:
                return purpose;
        }
    };

    const getTargetUnit = (battlePurpose) => {
        switch (battlePurpose) {
            case 'DIET':
            case 'WEIGHT_GAIN':
                return 'kg';
            case 'RUNNING':
                return 'km';
            default:
                return '';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>내 배틀 그룹</Text>
            <View style={styles.filterContainer}>
                <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.selectedFilterButton]} onPress={() => handleFilterChange('all')}>
                    <Text style={[styles.filterText, filter === 'all' && styles.selectedFilterText]}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filter === '진행중' && styles.selectedFilterButton]} onPress={() => handleFilterChange('진행중')}>
                    <Text style={[styles.filterText, filter === '진행중' && styles.selectedFilterText]}>진행중</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filter === '완료' && styles.selectedFilterButton]} onPress={() => handleFilterChange('완료')}>
                    <Text style={[styles.filterText, filter === '완료' && styles.selectedFilterText]}>완료</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredGroups}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleGroupPress(item)}>
                        <View style={styles.battleContainer}>
                            <Text style={styles.groupName}>{item.groupName}</Text>
                            <Text style={styles.dates}>기간: {item.startDate} ~ {item.endDate}</Text>
                            <Text style={styles.purpose}>목표: {getPurposeText(item.battlePurpose)} {item.target} {getTargetUnit(item.battlePurpose)}</Text>
                            <Text style={styles.status}>{getStatusText(item.status)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.groupId.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 5,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#39D02C',
        backgroundColor: '#fff',
        marginHorizontal: 5,
        alignItems: 'center',
    },
    selectedFilterButton: {
        backgroundColor: '#39D02C',
    },
    filterText: {
        fontSize: 16,
        color: '#39D02C',
    },
    selectedFilterText: {
        color: '#fff',
    },
    battleContainer: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    groupName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
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
    status: {
        fontSize: 16,
        color: '#666',
    },
});

export default MyBattle;
