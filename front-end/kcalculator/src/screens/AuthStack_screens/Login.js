import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { Text } from 'react-native';
//import { Alert } from 'react-native'; //로그인 버튼 클릭 시 알림 창이 뜨게 하는 Alert
//import { ProgressContext, UserContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    padding: 0px 20px;
`;


const Login = ({ navigation }) => {
    
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();   //이메일 컴포넌트에서 비밀번호 컴포넌트로 포커스 이동

    //로그인 기능 
    const _handleLoginButtonPress = async () => {};

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{flex: 1}}
            extraScrollHeight={20}>
            <Container>
                <Text style={{ fontSize: 30 }}>Login</Text>
                <Input
                    label="Id"
                    value={id}
                    onChangeText={text => setId(text)}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="Id"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword  //비밀번호 입력시 입력되는 값이 보이지 않도록 설정
                />
                <Button title="Login" onPress={ _handleLoginButtonPress } />
                <Button title="Signup" onPress={() => navigation.navigate("Signup")} isFilled={false} />
            </Container>
        </KeyboardAwareScrollView>
    )
};

export default Login;