import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import config from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const backendUrl = config.backendUrl;

const BattleRegister = ({ navigation }) => {
    const [groupName, setGroupName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [battlePurpose, setBattlePurpose] = useState(null);
    const [endDate, setEndDate] = useState('');
    const [numberOfMembers, setNumberOfMembers] = useState('');
    const [target, setTarget] = useState('');
    const [open, setOpen] = useState(false);
    const [today, setToday] = useState('');

    useEffect(() => {
        const fetchTodayDate = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/api/battleGroups/today`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setToday(response.data); // 서버에서 오늘 날짜 받아오기
            } catch (error) {
                console.error('Error fetching today\'s date:', error);
            }
        };
        fetchTodayDate();
    }, []);

    const onClickBattleRegister = async () => {
        if (!groupName || !title || !content || !battlePurpose || !endDate || !numberOfMembers || !target) {
            alert("모든 필드를 채워주세요.");
            return;
        }

        if (!isValidDate(endDate)) {
            alert("유효한 날짜를 입력하세요. 형식: YYYY-MM-DD");
            return;
        }

        const end = new Date(endDate);
        const todayDate = new Date(today);

        if (end <= todayDate) {
            alert("종료 날짜는 오늘 이후여야 합니다.");
            return;
        }

        const battleToServer = {
            groupName,
            title,
            content,
            battlePurpose,
            target,
            startDate: today, // 시작 날짜는 서버에서 받아온 오늘 날짜로 설정
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

    const getTargetPlaceholder = () => {
        if (battlePurpose === 'DIET') return '감량할 kg';
        if (battlePurpose === 'WEIGHT_GAIN') return '증량할 kg';
        if (battlePurpose === 'RUNNING') return '목표 km';
        return '목표';
    };

    return (
        <KeyboardAwareFlatList
            contentContainerStyle={styles.innerContainer}
            style={styles.flatList}
            data={[{ key: 'form' }]}
            renderItem={() => (
                <View style={styles.container}>
                    <Text style={styles.titleText}>배틀 등록</Text>
                    <TextInput
                        placeholder="그룹 이름"
                        onChangeText={setGroupName}
                        value={groupName}
                        style={styles.input}
                    />
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
                        placeholder={getTargetPlaceholder()}
                        onChangeText={setTarget}
                        value={target}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="모집 인원"
                        onChangeText={setNumberOfMembers}
                        value={numberOfMembers}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="종료날짜 (YYYY-MM-DD)"
                        onChangeText={setEndDate}
                        value={endDate}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={onClickBattleRegister}>
                        <Text style={styles.registerButtonText}>배틀 등록</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatList: {
        backgroundColor: '#fff',
    },
    innerContainer: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 0,
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
        marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
