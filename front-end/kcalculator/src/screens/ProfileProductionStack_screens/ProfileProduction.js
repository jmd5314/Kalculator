import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  align-items: flex-start;
  flex: 1;
`;

const ProfileProduction = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState('');
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [purpose, setPurpose] = useState('');

    const handleGenderSelection = (gender) => {
        setSelectedGender(gender);
    };
    const handlePurposeSelection = (selectedPurpose) => {
        setPurpose(selectedPurpose);
    };

    const handleActivityLevelSelection = (selectedActivityLevel) => {
        setActivityLevel(selectedActivityLevel);
    };

    const mapActivityLevel = (activityLevel) => {
        switch (activityLevel) {
            case 'low_activity':
                return 'LOW_ACTIVITY';
            case 'general_activity':
                return 'GENERAL_ACTIVITY';
            case 'high_activity':
                return 'HIGH_ACTIVITY';
            default:
                return '';
        }
    };
    const mapPurposeOfUse = (purpose) => {
        switch (purpose) {
            case 'diet':
                return 'DIET';
            case 'weight_gain':
                return 'WEIGHT_GAIN';
            default:
                return '';
        }
    };
    const mapGender = (gender) => {
        switch (gender) {
            case 'male':
                return 'MALE';
            case 'female':
                return 'FEMALE';
            default:
                return '';
        }
    };
    const sendProfileToServer = () => {
        // 사용자 입력을 기반으로 프로필 객체를 만듭니다
        const profileData = {
            nickname,
            age,
            gender: mapGender(selectedGender), // mapGender 함수를 사용하여 Enum 값으로 매핑
            weight,
            height,
            activityLevel: mapActivityLevel(activityLevel),
            purpose: mapPurposeOfUse(purpose),
        };

        // 서버에 네트워크 요청을 보냅니다
        fetch('https:/192.168.0.2.8080/api/profiles/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 필요한 경우 인증 헤더와 같은 추가 헤더를 추가하세요
            },
            body: JSON.stringify({ profileData }), // 프로필 객체를 JSON 문자열로 변환하여 전송
        })
            .then(response => response.json())
            .then(data => {
                // 서버로부터의 응답을 필요에 따라 처리합니다
                console.log('프로필이 성공적으로 전송되었습니다:', data);
                // 여기에서 다음 화면으로 이동하거나 다른 작업을 수행할 수 있습니다
                navigation.navigate("MenuSelection");
            })
            .catch(error => {
                console.error('프로필 전송 중 오류 발생:', error);
                // 오류를 처리하세요. 예를 들어 사용자에게 오류 메시지를 표시할 수 있습니다
            });
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
          onChangeText={(text) => setNickname(text)}
        />
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 10 }}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>나이</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          placeholder="나이"
          onChangeText={(text) => setAge(text)}
        />
      </View>
        <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 10 }}>
            <Text style={{ fontSize: 30, marginRight: 10 }}>키</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="키(cm)"
                keyboardType="numeric" // 키패드를 숫자 전용으로 설정
                onChangeText={(text) => setHeight(text)}
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
                    backgroundColor: selectedGender === 'female' ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleGenderSelection('female')}
            >
                <Text style={{ color: selectedGender === 'female' ? 'white' : 'black' }}>여</Text>
            </TouchableOpacity>
        </View>


      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 10 }}>
              <Text style={{ fontSize: 30, marginRight: 10 }}>체중</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="체중(kg)"
                onChangeText={(text) => setWeight(text)}
              />
      </View>

        <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
            <Text style={{ fontSize: 30, marginRight: 10 }}>활동량</Text>
            <TouchableOpacity
                style={{
                    marginRight: 20,
                    backgroundColor: activityLevel === 'low_activity' ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleActivityLevelSelection('low_activity')}
            >
                <Text style={{ color: activityLevel === 'low_activity' ? 'white' : 'black' }}>적음</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginRight: 20,
                    backgroundColor: activityLevel === 'general_activity' ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleActivityLevelSelection('general_activity')}
            >
                <Text style={{ color: activityLevel === 'general_activity' ? 'white' : 'black' }}>일반</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: activityLevel === 'high_activity' ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleActivityLevelSelection('high_activity')}
            >
                <Text style={{ color: activityLevel === 'high_activity' ? 'white' : 'black' }}>많음</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 10 }}>
            <Text style={{ fontSize: 30, marginRight: 10 }}>이용목적</Text>
            <TouchableOpacity
                style={{
                    marginRight: 20,
                    backgroundColor: purpose === 'diet' ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handlePurposeSelection('diet')}
            >
                <Text style={{ color: purpose === 'diet' ? 'white' : 'black' }}>다이어트</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: purpose === 'weight_gain' ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handlePurposeSelection('weight_gain')}
            >
                <Text style={{ color: purpose === 'weight_gain' ? 'white' : 'black' }}>체중 증가</Text>
            </TouchableOpacity>
        </View>

      <View style={{ alignSelf: 'flex-end', marginRight: 80 }}>
        <Button
          title="next"
          onPress={sendProfileToServer}
        />
      </View>
    </Container>
  );
};

export default ProfileProduction;
