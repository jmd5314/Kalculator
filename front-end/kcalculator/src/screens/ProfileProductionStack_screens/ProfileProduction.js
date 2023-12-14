import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity,Image } from 'react-native';
import styled from 'styled-components/native';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profile from "../Images/profile.jpg"


const backendUrl = config.backendUrl;
const InputField = styled.TextInput`
  flex: 1;
  height: 30px;
  border-color: green;
  border-width: 1px;
  margin-bottom: 10px;
  border-radius: 5px;
`;


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



const Container = styled.SafeAreaView`
 background-color: #ffffff;
  padding: 40px;
  flex: 1;

`;

const ProfileProduction =({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState('');
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
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
    const sendProfileToServer = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        const profileData = {
            nickname,
            age,
            gender: mapGender(selectedGender),
            weight,
            targetWeight,
            height,
            activityLevel: mapActivityLevel(activityLevel),
            purposeOfUse: mapPurposeOfUse(purpose),
        };

        // 서버에 네트워크 요청을 보냅니다
        fetch(`${backendUrl}/api/profiles/save`, {
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
                console.log('프로필이 성공적으로 전송되었습니다:', data);
                const profileId = data;
                navigation.navigate("MenuSelection",{profileId});
            })
            .catch(error => {
                console.error('프로필 전송 중 오류 발생:', error);
            });
    };

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:20,marginTop:10}}>
          <Image source={profile} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ fontSize: 24 }}>프로필 작성</Text>

      </View>


      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 25 }}>
        <Text style={{ fontSize: 25, marginRight: 10 }}>닉네임</Text>

        <TextInput
          style={{ height: 40,width:'70%', borderColor: 'green', borderWidth: 1, marginBottom: 10, paddingLeft: 10, }}
          placeholder="닉네임"
          onChangeText={(text) => setNickname(text)}
        />
      </View>


      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 25 }}>
        <Text style={{ fontSize: 25, marginRight: 30 }}>나이</Text>
           <TextInput
          style={{ height: 40,width:'70%', borderColor: 'green', borderWidth: 1, marginBottom: 10, paddingLeft: 10, }}
          placeholder="나이"
          onChangeText={(text) => setAge(text)}
        />
      </View>


        <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 25 }}>
            <Text style={{ fontSize: 25, marginRight: 50 }}>키</Text>
            <TextInput
          style={{ height: 40,width:'70%', borderColor: 'green', borderWidth: 1, marginBottom: 10, paddingLeft: 10, }}
                placeholder="키(cm)"
                keyboardType="numeric" // 키패드를 숫자 전용으로 설정
                onChangeText={(text) => setHeight(text)}
            />
        </View>


        <View style={{ flexDirection: 'row', marginBottom: 15, width: '80%', justifyContent: 'flex-start', marginLeft: 25 }}>
            <Text style={{ fontSize: 25, marginRight: 30 }}>성별</Text>
            <TouchableOpacity
                style={{
                    width: 60,
                    marginRight: 50,
                    backgroundColor: selectedGender === 'male' ? 'green' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleGenderSelection('male')}
            >
                <Text style={{ color: selectedGender === 'male' ? 'white' : 'black' }}>   남</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: 60,
                    marginRight: 20,
                    backgroundColor: selectedGender === 'female' ? 'green' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleGenderSelection('female')}
            >
                <Text style={{ color: selectedGender === 'female' ? 'white' : 'black' }}>   여</Text>
            </TouchableOpacity>
        </View>


      <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 25 }}>
              <Text style={{ fontSize: 25, marginRight: 30 }}>체중</Text>
              <TextInput
                style={{ height: 40,width:'70%', borderColor: 'green', borderWidth: 1, marginBottom: 10, paddingLeft: 10, }}
                onChangeText={(text) => setWeight(text)}

                placeholder="체중(kg)"
              />
      </View>


        <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', justifyContent: 'flex-start', marginLeft: 25 }}>
            <Text style={{ fontSize: 25, marginRight: 5 }}>목표 체중</Text>
            <TextInput
                style={{ height: 40, borderColor: 'green', borderWidth: 1, marginBottom: 10,  paddingLeft: 10 , width: '60%' }}
                placeholder="목표 체중(kg)"
                onChangeText={(text) => setTargetWeight(text)}
            />
        </View>

      <View style={{ flexDirection: 'row', marginBottom: 15, marginLeft: 25 }}>
      <Text style={{ fontSize: 25, marginRight: 10 }}>활동량</Text>
            <TouchableOpacity
                style={{
                    marginRight: 20,
                    backgroundColor: activityLevel === 'low_activity' ? 'green' : 'gray',
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
                    backgroundColor: activityLevel === 'general_activity' ? 'green' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleActivityLevelSelection('general_activity')}
            >
                <Text style={{ color: activityLevel === 'general_activity' ? 'white' : 'black' }}>일반</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: activityLevel === 'high_activity' ? 'green' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handleActivityLevelSelection('high_activity')}
            >
                <Text style={{ color: activityLevel === 'high_activity' ? 'white' : 'black' }}>많음</Text>
            </TouchableOpacity>
        </View>

      <View style={{ flexDirection: 'row', marginBottom: 20, marginLeft: 25 }}>
            <Text style={{ fontSize: 25, marginRight: 10 }}>이용목적</Text>
            <TouchableOpacity
                style={{
                    marginRight: 10,
                    backgroundColor: purpose === 'diet' ? 'green' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handlePurposeSelection('diet')}
            >
                <Text style={{ color: purpose === 'diet' ? 'white' : 'black' }}>다이어트</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: purpose === 'weight_gain' ? 'green' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={() => handlePurposeSelection('weight_gain')}
            >
                <Text style={{ color: purpose === 'weight_gain' ? 'white' : 'black' }}>체중 증가</Text>
            </TouchableOpacity>
        </View>

      <View style={{ marginTop: 5}}>
        <WhiteButton onPress={sendProfileToServer}>
          <ButtonText>Next</ButtonText>
        </WhiteButton>
      </View>
    </Container>
  );
};

export default ProfileProduction;
