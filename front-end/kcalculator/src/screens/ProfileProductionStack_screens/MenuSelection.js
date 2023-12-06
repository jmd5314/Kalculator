import React, { useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profile1 from '../Images/ee5_generated.jpg';
import profile2 from '../Images/running.jpg';
import profile3 from '../Images/normalfood.png';

const backendUrl = config.backendUrl;

const Container = styled.View`


  align-items: center;
  justify-content: center;
  flex: 1;
`;

const StyledText = styled.Text`
  font-size: 40px;
  margin-bottom: 20px;
`;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
        marginBottom: 16,
        width: 300,
        height: 150,
    },
});

const MenuSelection = ({ navigation, route }) => {
    const { profileId } = route.params;

    const handleCardPress = async (dietMode) => {
        const profileData = {
            dietMode: dietMode,
        };
        const token = await AsyncStorage.getItem('token');

        // 서버에 프로필 데이터 전송
        fetch(`${backendUrl}/api/profiles/save/${profileId}/selectMode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(profileData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 정상이 아닙니다');
                }
                return response.json();
            })
            .then(data => {
                console.log('프로필이 성공적으로 업데이트되었습니다:', data);
                navigation.navigate('TargetCalorie', {profileId});
            })
            .catch(error => {
                console.error('프로필 업데이트 중 오류 발생:', error);
                // 오류를 처리하세요. 예를 들어 사용자에게 오류 메시지를 표시할 수 있습니다
            });
    };

    return (
        <Container>
            <Text>어떤 식단 모드로 진행할까요?</Text>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: 'gray' }]}
                onPress={() => handleCardPress('GENERAL')}
            >
                <Text style={{ color: 'white', marginBottom: 20 }}>일반 식단</Text>
             <Image source={profile3} style={{ width: 80, height: 80, borderRadius: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: '#333' }]}
                onPress={() => handleCardPress('FITNESS')}
            >
                <Text style={{ color: 'white', marginBottom: 20 }}>운동 식단</Text>
        <Image source={profile2} style={{ width: 80, height: 80, borderRadius: 50 }} />

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: 'purple' }]}
                onPress={() => handleCardPress('KETOGENIC')}
            >
                <Text style={{ color: 'white', marginBottom: 20 }}>키토 식단</Text>
           <Image source={profile1} style={{ width: 75, height: 75, borderRadius: 50 }} />
            </TouchableOpacity>
        </Container>
    );
};

export default MenuSelection;