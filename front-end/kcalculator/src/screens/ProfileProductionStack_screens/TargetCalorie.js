//list화면으로 사용될 컴포넌트 작성
//항복수만큼 버튼을 생성하도록 만들었다.
//임시데이터를 만들것이다.

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import profile3 from '../Images/calculator.png';

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;


function Calculate() {
  const [daily, setDaily] = useState(0);
  const [goal, setGoal] = useState(0);

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginLeft: 10, marginTop:30 }}>
        <Text style={{fontSize: 20}}>목표 칼로리를 계산해 드렸어요.</Text>
        <Image source={profile3} style={{ width: 80, height: 80, borderRadius: 50 }} />
      </View>

      <Text>일일 권장 섭취량은 {daily} kcal에요.</Text>
      <Text>다이어트를 위한 목표량을 직접 입력할 수 있어요.</Text>

      <Text style={{marginTop:40}}>목표 섭취 열량</Text>
      <Text>{goal} kcal</Text>

      <Text style={{marginTop:40}}>꿀팁!</Text>
      <Text>일반적으로 권장 섭취량보다 하루 500kcal 정도</Text>
      <Text>적게 먹으면 감량 효과를 기대할 수 있어요.</Text>

        <View style={{ alignSelf: 'flex-end', marginRight: 80,marginTop: 50 }}>
              <Button
                title="프로필 생성 완료"
              />
            </View>



    </Container>
  );
}

export default Calculate;

