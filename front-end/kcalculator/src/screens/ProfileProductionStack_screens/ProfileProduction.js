import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
//import profile from '../Images/profile.jpg';

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  align-items: flex-start;
  flex: 1;
`;

const ProfileProduction = ({ navigation }) => {
  // 성별 상태값 및 업데이트 함수
  const [selectedGender, setSelectedGender] = useState('');

  // 성별 선택 시 호출되는 함수
  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginLeft: 10, marginTop: 100 }}>

        <Text style={{ fontSize: 24 }}>프로필 작성</Text>

      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 10 }}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>닉네임</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          placeholder="닉네임 (8자 미만)"
        />
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 10 }}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>나이</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          placeholder="나이"
        />
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 10 }}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>성별</Text>
        <TouchableOpacity
          style={{
            width: 60,
            marginRight: 20,
            backgroundColor: selectedGender === 'male' ? 'black' : 'gray',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => handleGenderSelection('male')}
        >
          <Text style={{ color: selectedGender === 'male' ? 'white' : 'black' }}>남</Text>
        </TouchableOpacity>
        <TouchableOpacity
              style={{
                width: 60,
                marginRight: 20,
                backgroundColor: selectedGender === 'male' ? 'gray' : 'black',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => handleGenderSelection('male')}
            >
              <Text style={{ color: selectedGender === 'male' ? 'white' : 'black' }}>여</Text>
            </TouchableOpacity>
      </View>


      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 10 }}>
              <Text style={{ fontSize: 30, marginRight: 10 }}>체중</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="체중(kg)"
              />
      </View>


      <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
      <Text style={{ fontSize: 30, marginRight: 10 }}>활동량</Text>
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
          <Text>적음</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
          <Text>일반</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text>많음</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 10 }}>
            <Text style={{ fontSize: 30, marginRight: 10 }}>이용목적</Text>

        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
          <Text>다이어</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text>중량</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignSelf: 'flex-end', marginRight: 80 }}>
        <Button
          title="next"
          onPress={() => navigation.navigate("MenuSelection")}
        />
      </View>
    </Container>
  );
};

export default ProfileProduction;
