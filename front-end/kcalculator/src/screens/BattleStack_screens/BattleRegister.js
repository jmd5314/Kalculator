import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import config from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;

const BattleRegister = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [battlePurpose, setBattlePurpose] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numberOfMembers, setNumberOfMembers] = useState('');
    const [open, setOpen] = useState(false);

    const onClickBattleRegister = async () => {
        if (!title || !content || !battlePurpose || !startDate || !endDate || !numberOfMembers) {
            alert("모든 필드를 채워주세요.");
            return;
        }

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            alert("유효한 날짜를 입력하세요. 형식: YYYY-MM-DD");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();

        if (start < today) {
            alert("시작 날짜는 오늘 이후여야 합니다.");
            return;
        }

        if (end <= start) {
            alert("종료 날짜는 시작 날짜 이후여야 합니다.");
            return;
        }

        const battleToServer = {
            title,
            content,
            battlePurpose,
            startDate,
            endDate,
            numberOfMembers: parseInt(numberOfMembers),
        };

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `${backendUrl}/api/battleGroups/save`,
                battleToServer,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response) {
                alert("배틀이 등록되었습니다.");
                navigation.navigate('Battle');
            } else {
                alert("배틀 등록에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regex)) return false;
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return false;
        return dateString === date.toISOString().split('T')[0];
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <Text style={styles.titleText}>배틀 등록</Text>
                <TextInput
                    placeholder="제목"
                    onChangeText={setTitle}
                    value={title}
                    style={styles.input}
                />
                <TextInput
                    placeholder="내용"
                    onChangeText={setContent}
                    value={content}
                    style={[styles.input, styles.multilineInput]}
                    multiline
                    textAlignVertical="top"
                />
                <DropDownPicker
                    open={open}
                    value={battlePurpose}
                    items={[
                        { label: '다이어트', value: 'DIET' },
                        { label: '증량', value: 'WEIGHT_GAIN' },
                        { label: '달리기', value: 'RUNNING' }
                    ]}
                    setOpen={setOpen}
                    setValue={setBattlePurpose}
                    placeholder="목표를 선택하세요"
                    zIndex={3000}
                    zIndexInverse={1000}
                    style={styles.picker}
                    dropDownContainerStyle={{
                        zIndex: 3000,
                    }}
                />
                <TextInput
                    placeholder="모집 인원"
                    onChangeText={setNumberOfMembers}
                    value={numberOfMembers}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={() => setStartDate(current => current === '' ? 'YYYY-MM-DD' : '')}>
                        <Icon name="calendar" size={24} color="#39D02C" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="시작날짜 (YYYY-MM-DD)"
                        onChangeText={setStartDate}
                        value={startDate}
                        style={styles.dateInput}
                    />
                    <Text style={styles.dateSeparator}>~</Text>
                    <TouchableOpacity onPress={() => setEndDate(current => current === '' ? 'YYYY-MM-DD' : '')}>
                        <Icon name="calendar" size={24} color="#39D02C" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="종료날짜 (YYYY-MM-DD)"
                        onChangeText={setEndDate}
                        value={endDate}
                        style={styles.dateInput}
                    />
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={onClickBattleRegister}>
                    <Text style={styles.registerButtonText}>배틀 등록</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        alignSelf: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 12,
        fontSize: 16,
        width: '100%',
    },
    multilineInput: {
        height: 200,
        textAlignVertical: 'top',
    },
    picker: {
        width: '100%',
        marginBottom: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
        marginHorizontal: 8,
    },
    dateSeparator: {
        marginHorizontal: 8,
        fontSize: 18,
        color: '#333',
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
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default BattleRegister;