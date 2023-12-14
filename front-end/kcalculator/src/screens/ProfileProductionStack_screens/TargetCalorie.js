import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import config from '../config';
import calculator from '../Images/calculator.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import profile from "../Images/calculator.png"

const backendUrl = config.backendUrl;

const WhiteButton = styled(TouchableOpacity)`
  background-color: #39D02C;
  height: 60px;
  width: 265px;
  border-radius: 10px;
  align-items: center; /* 수직 정렬 */
  justify-content: center; /* 수평 정렬 */
  margin-left: 25px;
  `;

const ButtonText = styled.Text`
    font-size: 30px;
    color: #ffffff;
  `;

const YellowButton = styled(TouchableOpacity)`
    background-color: #FFFF00;
    height: 150px;
    border-radius: 10px;
     align-items: center; /* 수직 정렬 */
  `;


const Container = styled.SafeAreaView`
  background-color: #ffffff;
  padding: 40px;
  flex: 1;

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 0 }}>
     <Image source={calculator} style={{ marginLeft:-20,marginRight: 10, width: 80, height: 80 }} />

        <Text style={{fontSize: 30, marginBottom:10}}>권장 칼로리 계산</Text>
            </View>

      <Text style={{fontSize: 20, marginBottom:10}}>일일 권장 섭취량은</Text>
      <Text style={{fontSize: 35, marginBottom:10, textDecorationLine: 'underline'}}>{daily} kcal에요.</Text>

            <View style={{marginTop: 30}}>
             <YellowButton>

            <Text style={{fontSize:17,marginBottom:10, marginTop:10}}>꿀팁!</Text>
                 <Text style={{fontSize:17,marginBottom:10}}>일반적으로 권장 섭취량보다 </Text>
                <Text style={{fontSize:17,marginBottom:10}}>하루 500kcal 정도 적게 먹으면</Text>
            <Text style={{fontSize:17}}>감량 효과를 기대할 수 있어요!</Text>

             </YellowButton>

            </View>


        <View style={{ marginTop: 50 }}>
              <WhiteButton
         onPress={() => navigation.navigate('MainTab',{profileId})}>
                <ButtonText>프로필생성완료</ButtonText>
              </WhiteButton>
            </View>
        </Container>
    );
}

export default Calculate;