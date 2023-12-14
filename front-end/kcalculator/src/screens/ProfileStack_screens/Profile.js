import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { UserContext } from '../../contexts';
import { Button } from '../../components';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;

const Profile = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [weight, setWeight] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [purposeOfUse, setPurpose] = useState('');
    const [gender, setSelectedGender] = useState('');
    const { dispatch } = useContext(UserContext);

    useEffect(() => {
        const fetchProfileFromBackend = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get(`${backendUrl}/api/profiles/confirm`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTargetWeight(response.data.targetWeight);
                setWeight(response.data.weight);
                setNickname(response.data.nickname);
                setAge(response.data.age);
                setHeight(response.data.height);
                setSelectedGender(response.data.gender);
                setActivityLevel(response.data.activityLevel);
                setPurpose(response.data.purposeOfUse);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfileFromBackend();
    }, []);

    const _handleLogoutButtonPress = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch (e) {
            console.error('토큰 삭제 중 오류 발생:', e);
        } finally {
            dispatch({});
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.label}>닉네임:</Text>
                <Text style={styles.value}>{nickname}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileRevise")} style={styles.editProfileButton}>
                    <Text style={styles.editProfileButtonText}>프로필 수정</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profile}>
                <Text style={styles.label}>현재 체중:</Text>
                <Text style={styles.value}>{weight}kg</Text>
            </View>

            <View style={styles.profile}>
                <Text style={styles.label}>목표 체중까지:</Text>
                <Text style={styles.value}>{weight - targetWeight}kg</Text>
            </View>
            <View>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>나이 : {age}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>키 : {height}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>성별 : {gender}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>활동량 : {activityLevel}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>이용목적 : {purposeOfUse}</Text>
            </View>
            <View style={styles.btnContainer}>
                <Button title="회원탈퇴" onPress={() => navigation.navigate("UserDelete")} />
            </View>
            <View style={styles.btnContainer}>
                <Button title="로그아웃" onPress={_handleLogoutButtonPress} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 5,
    },
    label: {
        fontSize: 25,
        marginRight: 10,
    },
    value: {
        fontSize: 25,
    },
    editProfileButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    editProfileButtonText: {
        fontSize: 20,
        color: 'green',
    },
    btnContainer: {
        marginTop: 20,
    },
});


export default Profile;