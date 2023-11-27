import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { Text, Alert } from 'react-native';
import { ProgressContext, UserContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

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

            const response = await axios.post('http://192.168.176.52:8080/api/users/login', {
                userId: id,
                password: password,
            });

            if (response.status === 200) {
                const { id: userId } = response.data;
                // 사용자 정보를 상태에 저장
                dispatch({ type: 'SET_USER', payload: { id: userId } });
                navigation.navigate('ProfileProduction');
            } else {
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
                <Text style={{ fontSize: 30 }}>Login</Text>
                <Input
                    label="Id"
                    value={id}
                    onChangeText={(text) => setId(text)}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="Id"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <Button title="Login" onPress={() => navigation.navigate('ProfileProduction')} />
                <Button title="Signup" onPress={() => navigation.navigate('Signup')} isFilled={false} />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;