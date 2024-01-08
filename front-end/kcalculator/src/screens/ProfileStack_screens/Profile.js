import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { UserContext } from '../../contexts';
import { Button } from '../../components';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card,Icon } from 'react-native-elements';



const backendUrl = config.backendUrl;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const ProfileContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const ProfileItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const ProfileText = styled.Text`
  font-size: 20px;
  margin-left: 10px;
`;

const Label = styled.Text`
  margin-top: 60px;
  margin-left: 10px;
  font-size: 20px;
  margin-right: 10px;
`;

const Value = styled.Text`
  font-size: 20px;
`;

const EditProfileButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
`;

const EditProfileButtonText = styled.Text`
  font-size: 20px;
  color: green;
`;
const BtnContainer = styled.View`
  margin-bottom: 15px;
  margin-top: 15px;
`;

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
        <Container>
            <ProfileContainer>
                <ProfileItem>
                    <Label>닉네임:</Label>
                    <Label>{nickname}</Label>
                    <EditProfileButton onPress={() => navigation.navigate("ProfileRevise")}>
                        <EditProfileButtonText>프로필 수정</EditProfileButtonText>
                    </EditProfileButton>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>현재 체중: {weight}kg</ProfileText>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>목표 체중까지: {weight - targetWeight}kg</ProfileText>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>나이: {age}</ProfileText>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>키: {height}</ProfileText>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>성별: {gender}</ProfileText>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>활동량: {activityLevel}</ProfileText>
                </ProfileItem>

                <ProfileItem>
                    <ProfileText>이용목적: {purposeOfUse}</ProfileText>
                </ProfileItem>

                <BtnContainer>
                    <Button title="회원탈퇴" onPress={() => navigation.navigate("UserDelete")} />
                </BtnContainer>

                <BtnContainer>
                    <Button title="로그아웃" onPress={_handleLogoutButtonPress} />
                </BtnContainer>
            </ProfileContainer>
        </Container>
    );
};

export default Profile;
