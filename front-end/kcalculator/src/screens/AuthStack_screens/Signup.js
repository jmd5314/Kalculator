import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components/native';
import { ProgressContext, UserContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Alert } from 'react-native';


function Signup({ navigation }) {
  const [user, setUser] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

  const handleChangeId = (value) => {
    setUser((prevUser) => ({ ...prevUser, id: value }));
  };

  const handleChangeName = (value) => {
    setUser((prevUser) => ({ ...prevUser, name: value }));
  };

  const handleChangeEmail = (value) => {
    setUser((prevUser) => ({ ...prevUser, email: value }));
  };

  const handleChangePassword = (value) => {
    setUser((prevUser) => ({ ...prevUser, password: value }));
  };

  const handleChangeConfirmPassword = (value) => {
    setUser((prevUser) => ({ ...prevUser, confirmPassword: value }));
  };
//
//  const handleSubmit = () => {
//    console.log("Form submitted:", user);
//    navigation.navigate('Home');
//    // 여기에서 서버로 데이터를 전송하는 로직을 추가할 수 있습니다.
//    // 회원가입이 완료된 후, 다음 화면으로 이동하는 코드를 추가하세navigation.navigate('Home')}>
//  };
const handleSubmit = () => {
  // 여기에서 회원가입 처리 로직을 수행

  // 가상의 회원가입 처리가 성공했다고 가정
  const registrationSuccessful = true;

  if (registrationSuccessful) {
    // 회원가입이 완료되었음을 알리는 Alert 창 표시
    Alert.alert(
      '회원가입 완료',
      '회원가입이 성공적으로 완료되었습니다.',
      [
        {
          text: '확인',
          onPress: () => {
            // 회원가입이 완료된 후, 다음 화면으로 이동하는 코드
            navigation.navigate('Login');
          },
        },
      ]
    );
  } else {
    // 회원가입 실패 시에 대한 처리
    // 회원가입 실패에 대한 조건을 작성하면 된다.
    Alert.alert('회원가입 실패', '회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

  return (
  <View>
     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginLeft: 10, marginTop: 100 }}>
       <Text style={{ fontSize: 40, fontWeight: 'bold' }}>회원가입</Text>
     </View>


    <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 10 }}>
       <Text style={{ fontSize: 20, marginRight: 10 }}>아이디</Text>
       <TextInput
        style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="아이디"
        value={user.id}
        onChangeText={handleChangeId}
        />
    </View>

    <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 10 }}>
           <Text style={{ fontSize: 20, marginRight: 10 }}>비밀번호</Text>
           <TextInput
            style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="비밀번호"
            secureTextEntry
            value={user.Password}
            onChangeText={handleChangePassword}
            />
     </View>

    <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 10 }}>
           <Text style={{ fontSize: 20, marginRight: 10 }}>키사진</Text>
           <TextInput
            style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="비밀번호재입력"
            secureTextEntry
            value={user.confirmPassword}
            onChangeText={handleChangeConfirmPassword}
            />
     </View>

    <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 10 }}>
           <Text style={{ fontSize: 20, marginRight: 10 }}>이름</Text>
           <TextInput
            style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="이름"
            value={user.name}
            onChangeText={handleChangeName}
            />
     </View>
    <View style={{ flexDirection: 'row', marginBottom: 10, width: '80%', marginLeft: 10 }}>
            <Text style={{ fontSize: 20, marginRight: 10 }}>이메일</Text>
            <TextInput
             style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
             placeholder="이메일"
             value={user.email}
             onChangeText={handleChangeEmail}
             />
      </View>

      <View style={{ alignSelf: 'flex-end', marginRight: 80 }}>
        <Button
          title="회원가입"
          onPress={handleSubmit}
        />
      </View>

    </View>

  );
}

export default Signup;
