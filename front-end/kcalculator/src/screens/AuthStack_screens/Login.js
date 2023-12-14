import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { Text, Alert,Image } from 'react-native';
import { ProgressContext, UserContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../Images/logo.jpg";
const backendUrl  = config.backendUrl;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  padding: 0px 20px;
`;

const Login = ({ navigation }) => {
    const { spinner } = useContext(ProgressContext);
    const { dispatch } = useContext(UserContext);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();

    const _handleLoginButtonPress = async () => {
        try {
            spinner.start();
            const response = await axios.post(`${backendUrl}/api/users/login`, {
                userId: id,
                password: password,
            });
            console.log('Server Response:', response.data); // 응답 데이터를 콘솔에 출력

            if (response.status === 200) {
                const { token, profileCreated } = response.data;
                console.log('Token after destructuring:', token);
                await AsyncStorage.setItem('token', token);
                dispatch({ type: 'SET_TOKEN', payload: { token } });
                if (profileCreated) {
                    navigation.navigate('MainTab');
                } else {
                    navigation.navigate('ProfileProduction');
                }
                }
            else {
                const errorData = response.data;
                console.error(errorData);
                Alert.alert('로그인 오류', errorData.message || '문제가 발생했습니다.');
            }
        } catch (e) {
            console.error(e);
            Alert.alert('로그인 오류', e.message);
        } finally {
            spinner.stop();
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}>
            <Container>
                <Image
                    source={logo}
                    style={{ width: 300, height: 100, marginBottom: 20 }}
                    resizeMode="contain"
                />
                <Input
                    label="아이디"
                    value={id}
                    onChangeText={(text) => setId(text)}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="id"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="비밀번호"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="password"
                    returnKeyType="done"
                    isPassword
                />
                <Button title="로그인" onPress={_handleLoginButtonPress}/>
                <Button title="회원가입" onPress={() => navigation.navigate('Signup')} isFilled={false} />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;