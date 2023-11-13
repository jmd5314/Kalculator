import React from 'react';
import { Text, Button, StyleSheet, View, SafeAreaView } from 'react-native';

const UserDelete = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 30 }}>정말로 탈퇴하시겠습니까?</Text>
            <View style={styles.btnArea}>
                <Button title="yes" />
                <View style={{width: 120}}/>
                <Button title="no" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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

export default UserDelete;