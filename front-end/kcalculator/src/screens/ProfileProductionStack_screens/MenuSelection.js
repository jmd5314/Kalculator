import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

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

    const handleCardPress = (dietMode) => {
        const profileData = {
            profileId: profileId,
            dietMode: dietMode,
        };

        // 서버에 프로필 데이터 전송
        fetch('http://192.168.0.2:8080/api/profiles/saveDietMode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                navigation.navigate('TargetCalorie', { mode: dietMode });
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
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: '#333' }]}
                onPress={() => handleCardPress('FITNESS')}
            >
                <Text style={{ color: 'white', marginBottom: 20 }}>운동 식단</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: 'purple' }]}
                onPress={() => handleCardPress('KETOGENIC')}
            >
                <Text style={{ color: 'white', marginBottom: 20 }}>키토 식단</Text>
            </TouchableOpacity>
        </Container>
    );
};

export default MenuSelection;