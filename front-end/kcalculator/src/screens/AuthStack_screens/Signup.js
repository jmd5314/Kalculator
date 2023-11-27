import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components/native';
import { ProgressContext, UserContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Alert } from 'react-native';
import axios from 'axios';


const Signup = ({ navigation }) => {
  const [user, setUser] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

    const handleChangeId = (value) => setUser((prevUser) => ({ ...prevUser, id: value }));
    const handleChangeName = (value) => setUser((prevUser) => ({ ...prevUser, name: value }));
    const handleChangeEmail = (value) => setUser((prevUser) => ({ ...prevUser, email: value }));
    const handleChangePassword = (value) => setUser((prevUser) => ({ ...prevUser, password: value }));
    const handleChangeConfirmPassword = (value) =>
        setUser((prevUser) => ({ ...prevUser, confirmPassword: value }));
    const handleSubmit = async () => {
        if (user.password !== user.confirmPassword) {
            Alert.alert('오류', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        try {
            const response = await axios.post('http://192.168.176.180:8080/api/users/join', {
                userId: user.id,
                password: user.password,
                name: user.name,
                email: user.email,
            });
            // 백엔드가 성공 메시지를 반환하면
            if (response.data === '회원가입이 성공 했습니다.') {
                Alert.alert(
                    '회원가입 완료',
                    '회원가입이 성공적으로 완료되었습니다.',
                    [
                        {
                            text: '확인',
                            onPress: () => {
                                navigation.navigate('Login');
                            },
                        },
                    ]
                );
            } else {
                // 다른 응답 시나리오에 대한 처리
                Alert.alert('회원가입 실패', '회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error.message);
            Alert.alert('오류', '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
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
           <Text style={{ fontSize: 20, marginRight: 10 }}>비밀번호 확인</Text>
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
