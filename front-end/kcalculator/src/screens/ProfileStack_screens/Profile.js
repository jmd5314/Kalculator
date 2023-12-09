import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { UserContext } from '../../contexts';
import { Button } from '../../components';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;
const Profile = ({ navigation }) => {
    const [ nickname, setNickname ] = useState('');
    const [ weight, setWeight ] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [ age, setAge ] = useState('');
    const [ height, setHeight ] = useState('');
    const [ activityLevel, setActivityLevel ] = useState('');
    const [ purposeOfUse, setPurpose ] = useState('');
    const [ gender, setSelectedGender ] = useState('');
    const { dispatch } = useContext(UserContext);

    useEffect(() => {
        const fetchProfileFromBackend = async () => {
            const token = await AsyncStorage.getItem('token');
          try {
            const response = await axios.get(`${backendUrl}/api/profiles/confirm`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
              setTargetWeight(response.data.targetWeight);
            setWeight((response.data.weight));
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
            await logout();
        } catch (e) {
            console.log('[Profile] logout: ', e.message);
        } finally {
            dispatch({});
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Text style={{ fontSize: 25, marginLeft: 5 }}>닉네임 : {nickname}</Text>

            </View>
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileRevise")}>
                    <Text style={{ fontSize: 25, marginLeft: 5 }}>프로필 수정</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profile}>
                <Text style={{fontSize: 25, marginLeft: 5}}>현재 체중 : {weight}</Text>
                <View style={{width: 60}} />
                <Text style={{fontSize: 25}}>목표 체중까지 : {weight-targetWeight} </Text>
            </View>
            <View style={{height: 20}} />
            <View>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>나이 : {age}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>키 : {height}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>성별 : {gender}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>활동량 : {activityLevel}</Text>
                <Text style={{ fontSize: 25, marginBottom: 20, marginLeft: 5 }}>이용목적 : {purposeOfUse}</Text>
            </View>
            <View style={{height: 5}} />
            <View>
                <Button title="회원탈퇴" 
                    onPress={() => navigation.navigate("UserDelete")} />
                <View style={{ width: 150 }} />
                <Button title="로그아웃" 
                    onPress={_handleLogoutButtonPress} />
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
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    area: {
        height: 160,
        width: '95%',
        margin: 5,
    },
    btnArea: {
        height: 65,
        flexDirection: 'row',
    },
});

export default Profile;