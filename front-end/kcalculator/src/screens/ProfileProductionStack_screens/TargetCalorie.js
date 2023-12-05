import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, Button } from 'react-native';
import config from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

function Calculate({ navigation, route }) {
    const [daily, setDaily] = useState(0);
    const { profileId } = route.params;

    useEffect(() => {
        // 권장 칼로리를 불러오기 위한 함수 정의
        const fetchRecommendedCalories = async () => {
            try {
                // 백엔드 API에 GET 요청 보내기
                const response = await fetch(`${backendUrl}/api/profiles/save/${profileId}/targetCalories`);

                // JSON 형태로 응답 파싱
                const data = await response.text();
                // 권장 칼로리를 상태에 업데이트
                setDaily(parseFloat(data))
            } catch (error) {
                console.error('권장 칼로리를 불러오는 동안 오류 발생:', error);
            }
        };

        // 컴포넌트가 마운트될 때 API 호출 함수 실행
        fetchRecommendedCalories();
    }, [profileId]); // profileId가 변경될 때마다 useEffect 실행

    return (
        <Container>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginLeft: 10, marginTop: 30 }}>
                <Text style={{ fontSize: 20 }}>목표 칼로리를 계산해 드렸어요.</Text>
            </View>

            <Text>일일 권장 섭취량은 {daily} kcal에요.</Text>

            <Text style={{ marginTop: 40 }}>꿀팁!</Text>
            <Text>일반적으로 권장 섭취량보다 하루 500kcal 정도</Text>
            <Text>적게 먹으면 감량 효과를 기대할 수 있어요.</Text>

            <View style={{ alignSelf: 'flex-end', marginRight: 80, marginTop: 50 }}>
                <Button title="프로필 생성 완료" onPress={() => navigation.navigate('MainTab',{profileId})} />
            </View>
        </Container>
    );
}

export default Calculate;