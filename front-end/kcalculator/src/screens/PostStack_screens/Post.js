import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import config from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;

const Post = ({ navigation }) => {
    const [posts, setPosts] = useState([]);


    const renderItem = ({ item }) => (
        <PostComponent title={item.title} content={item.content} />
    );

    useEffect(() => {
        const getListFromServer = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
        
                const response = await axios.get(`${backendUrl}/api/posts/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                setPosts(response.data.posts);
            } catch (error) {
                console.error(error);
            }
        };
        getListFromServer();
    },[]);

    return (
        <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[ styles.header, {marginRight: 190} ]}>Community</Text>
                    <TouchableOpacity style={{ marginTop: 5}}  
                        onPress={() => navigation.navigate('PostRegister')}>
                        <Icon name="plus" size={20} color="#555" style={styles.header} />
                    </TouchableOpacity>
                </View>
            {posts && (<FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id}/>)}
        </SafeAreaView>
        
    );
};

        const PostComponent = ({ title, content }) => (
            <View style={styles.postContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            <View style={styles.iconContainer}>
                <Icon name="thumbs-o-up" size={20} color="#555" style={{ marginRight: 20 }} />
                <Icon name="comment-o" size={20} color="#555" />
        </View>

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop:15,
    },
    postContainer: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
    },
        iconContainer: {
            flexDirection: 'row',
            justifyContent: '',
            marginTop: 16,
        },
});

export default Post;