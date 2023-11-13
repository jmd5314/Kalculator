import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

const Profile = ({ navigation }) => {
    const [profiles, setProfiles] = useState('');

    useEffect(() => {
        axios.get()
            .then(response => setUsers())
            .catch(error => console.error(error));
    },[]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Text style={{fontSize: 20, marginHorizontal: 20}}>닉네임 : </Text>
                {users.map(user => (<Text key={user.id}>{user.username}</Text>))}
            </View>
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")}>
                    <Text style={{fontSize: 20}}>나의목표</Text>
            </View>
            <View style={{height: 10}}/>
            <View style={styles.area}>
                <TouchableOpacity onPress={() => navigation.navigate("PostList")}>
                    <Text style={{fontSize:20}}>내가 작성한 게시물</Text>
                </TouchableOpacity>
                <View style={styles.postArea}>
                    <View style={styles.image}></View>
                    <View style={styles.image}></View>
                    <View style={styles.image}></View>
                </View>
            </View>
            <View style={styles.area}>
                <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
                    <Text style={{fontSize:20}}>내가 가입한 그룹 리스트</Text>
                </TouchableOpacity>
                <View style={styles.postArea}>
                    <View style={styles.image}></View>
                    <View style={styles.image}></View>
                    <View style={styles.image}></View>
                </View>
            </View>
            <View style={styles.btnArea}>
                <Button title="회원탈퇴" onPress={() => navigation.navigate('UserDelete')} />
                <View style={{width: 120}}/>
                <Button title="로그아웃"/>
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
    postArea: {
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        width: 110,
        borderWidth: 4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

export default Profile;