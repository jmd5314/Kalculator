import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import config from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;

const GreenButton = styled(TouchableOpacity)`
  background-color: #39D02C;
  height: 60px;
  width: 100%;
  border-radius: 10px;
  align-items: center; 
  justify-content: center;
  margin-bottom: 40px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

const InfoBox = styled.View`
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  padding: 20px;
  flex: 1;
`;

const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 40px;
`;

const InfoText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const TipBox = styled.View`
  background-color: #f9f9f9;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TipText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin: 5px 0;
`;

const TipTextBold = styled(TipText)`
  font-weight: bold;
`;

function Calculate({ navigation }) {
    const [profileData, setProfileData] = useState({
        recommendedCalories: 0,
        recommendedCarbohydrates: 0,
        recommendedProteins: 0,
        recommendedFats: 0,
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${backendUrl}/api/profiles/home`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('프로필 정보를 불러오는 동안 오류 발생:', error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <Container>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <View>
                    <SectionTitle>권장 섭취량 정보</SectionTitle>
                    <InfoText>회원님의 목적에 맞게 프로필이 생성되었어요. 아래는 회원님의 권장 섭취량입니다:</InfoText>
                    <InfoBox>
                        <InfoText>일일 권장 칼로리: {profileData.recommendedCalories} kcal</InfoText>
                        <InfoText>일일 권장 탄수화물: {profileData.recommendedCarbohydrates} g</InfoText>
                        <InfoText>일일 권장 단백질: {profileData.recommendedProteins} g</InfoText>
                        <InfoText>일일 권장 지방: {profileData.recommendedFats} g</InfoText>
                    </InfoBox>
                </View>

                <TipBox>
                    <TipTextBold>꿀팁!</TipTextBold>
                    <TipText>일반적으로 권장 섭취량보다 하루 500kcal 정도 적게 먹으면 감량 효과를 기대할 수 있어요!</TipText>
                </TipBox>

                <GreenButton onPress={() => navigation.navigate('MainTab')}>
                    <ButtonText>프로필 생성 완료</ButtonText>
                </GreenButton>
            </ScrollView>
        </Container>
    );
}

export default Calculate;
