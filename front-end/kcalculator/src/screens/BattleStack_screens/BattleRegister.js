import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, DatePickerAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import config from '../config'; // 백엔드 URL 설정을 가져오세요.

const backendUrl = config.backendUrl;

const BattleRegister = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [goal, setGoal] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(''); 

    const BattleListToServer = async (item) => {
        try {
            if (!item.title || !item.content || !item.goal || !item.startDate || !item.endDate) {
                return;
            }

            const token = await AsyncStorage.getItem('token');

            const data = {
                title: item.title,
                content: item.content,
                goal: item.goal,
                startdate: item.startDate,
                enddate: item.endDate,
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

    const openDatePicker = async (type) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                if (type === 'start') {
                    setStartDate(selectedDate.toLocaleDateString()); // 시작일 선택
                } else if (type === 'end') {
                    setEndDate(selectedDate.toLocaleDateString()); // 종료일 선택
                }
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    const onClickBattleRegister = async () => {
        const BattleToServer = {
            title: title,
            content: content,
            goal: goal,
            startDate: startDate,
            endDate: endDate,
        };

        try {
            const response = await BattleListToServer(BattleToServer);
            if (response) {
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
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => openDatePicker('start')}>
                    <Icon name="calendar" size={24} color="#39D02C" />
                </TouchableOpacity>
                <TextInput
                    placeholder="시작날짜"
                    value={startDate}
                    style={styles.input}
                    editable={false}
                />
                <View style={{ marginRight: 30, marginLeft: 30 }}>
                    <Text>~</Text>
                </View>
                <TouchableOpacity onPress={() => openDatePicker('end')}>
                    <Icon name="calendar" size={24} color="#39D02C" />
                </TouchableOpacity>
                <TextInput
                    placeholder="종료날짜"
                    value={endDate}
                    style={styles.input}
                    editable={false}
                />
            </View>
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
        height: 250,
    },
    registerButton: {
        height: 50,
        backgroundColor: '#39D02C',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default BattleRegister;