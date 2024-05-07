import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { UserContext } from '../../contexts';
import { Button } from '../../components';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Icon } from 'react-native-elements';

const backendUrl = config.backendUrl;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  padding: 16px;
`;

const ProfileContainer = styled.View`
   background-color: #fff;
   padding: 20px;
   border-radius: 10px;
   margin: 10px;
   shadow-color: #000;
   shadow-offset: 0 3px;
   shadow-opacity: 0.1;
   shadow-radius: 5px;
   elevation: 5;
`;

const ProfileCard = styled.View`
     margin-top: 20px;
     padding: 15px;
     background-color: #fff;
     border-radius: 8px;
     shadow-color: #000;
     shadow-offset: 0 3px;
     shadow-opacity: 0.1;
     shadow-radius: 5px;
     elevation: 5;
`;

const ProfileItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e1e1e1;
`;

const ProfileText = styled.Text`
  font-size: 18px;
  color: #333;
  flex: 1;
`;

const EditProfileButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const EditProfileButtonText = styled.Text`
  font-size: 16px;
  color: #2ecc71;
`;

const BtnContainer = styled.View`
  margin-top: 20px;
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
                const { data } = response;
                setNickname(data.nickname);
                setWeight(data.weight);
                setTargetWeight(data.targetWeight);
                setAge(data.age);
                setHeight(data.height);
                setActivityLevel(data.activityLevel);
                setPurpose(data.purposeOfUse);
                setSelectedGender(data.gender);
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
            console.error('Error removing token:', e);
        } finally {
            dispatch({});
            navigation.navigate('Login');
        }
    };

    return (
        <Container>
            <ProfileContainer>
                <EditProfileButton onPress={() => navigation.navigate("ProfileRevise")}>
                    <EditProfileButtonText>프로필 수정</EditProfileButtonText>
                </EditProfileButton>
                <ProfileCard>
                    <ProfileItem>
                        <ProfileText>닉네임: {nickname}</ProfileText>
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
                        <ProfileText>성별: {gender === 'MALE' ? '남성': '여성'}</ProfileText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileText>활동량: {activityLevel === 'GENERAL_ACTIVITY' ? '일반': (activityLevel === 'LOW_ACTIVITY' ? '적음' : '많음')}</ProfileText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileText>이용목적: {purposeOfUse === 'DIET' ? '다이어트' : '체중증가'}</ProfileText>
                    </ProfileItem>
                </ProfileCard>
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