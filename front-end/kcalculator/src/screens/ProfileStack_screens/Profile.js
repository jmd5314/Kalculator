import React, { useState, useContext, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../../contexts';
import axios from 'axios';
import config from "../config";

const backendUrl = config.backendUrl;
const Profile = ({ navigation }) => {
    const [ nickname, setNickname ] = useState('');
    const [ presentweight, setPresentweight ] = useState('');
    const { dispatch } = useContext(UserContext);

    useEffect(() => {
        const fetchNicknameFromBackend = async () => {
          try {
            const response = await axios.get(`${backendUrl}/api/profiles/confirm/{profileId}`);
            
            setNickname(response.data.nickname);
          } catch (error) {
            console.error('Error fetching nickname:', error);
          }
        };
    
        fetchNicknameFromBackend();
    }, []);

    useEffect(() => {
        const fetchPresentweightFromBackend = async () => {
          try {
            const response = await axios.get();
            
            setPresentweight(response.data.weight);
          } catch (error) {
            console.error('Error fetching weight:', error);
          }
        };
    
        fetchPresentweightFromBackend();
    }, []);

    const _handleLogoutButtonPress = async () => {
        try {
            await logout();
        } catch (e) {
            console.log('[Profile] logout: ', e.message);
        } finally {
            dispatch({});
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Text style={{fontSize: 20}}>닉네임 : {nickname}</Text>

            </View>
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileRevise")}>
                    <Text style={{fontSize: 20}}>프로필 수정</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profile}>
                <Text style={{fontSize: 20}}>현재 체중 : {presentweight}</Text>
                <View style={{width: 70}} />
                <Text style={{fontSize: 20}}>목표 체중까지 : </Text>
            </View>
            <View style={{height: 20}} />
            <View style={styles.btnArea}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("UserDelete")}>
                    <Text style={{fontSize: 20}}>회원탈퇴</Text>
                </TouchableOpacity>
                <View style={{width: 100}}/>
                <TouchableOpacity style={styles.btn} onPress={_handleLogoutButtonPress}>
                    <Text style={{fontSize: 20}}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profile: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    area: {
        height: 160,
        width: '95%',
        margin: 5,
    },
    image: {
            height: 85,
            width: 85,
            backgroundColor: '#808080',
            borderRadius: 10,
            margin: 15,
    },
    btnArea: {
        height: 65,
        flexDirection: 'row',
    },
    btn: {
        backgroundColor: 'white',
        borderColor: '#0066cc',
        height: 50,
        width: 100,
        borderWidth: 4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

export default Profile;