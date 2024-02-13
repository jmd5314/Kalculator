import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const Post = ({ navigation,route}) => {
    const [posts, setPosts] = useState([]);
    const refreshKey = route.params?.refreshKey || Math.random().toString();
    const renderItem = ({ item }) => (
   <PostComponent title={item.title} content={item.content} userId={item.userId} postId={item.postId} navigation={navigation} />
   )
    useEffect(() => {
        const getListFromServer = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                const response = await axios.get(`${backendUrl}/api/posts/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts(response.data); // Assuming the response directly contains the array of posts

            } catch (error) {
                console.error(error);
            }
        };
        getListFromServer();
    }, [refreshKey]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.header, { marginRight: 190 }]}>Community</Text>
                <TouchableOpacity style={{ marginTop: 5 }}
                    onPress={() => navigation.navigate('PostRegister')}>
                    <Icon name="plus" size={20} color="#555" style={styles.header} />
                </TouchableOpacity>
            </View>
            {posts && (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </SafeAreaView>
    );
};

const PostComponent = ({ title, content, userId, postId, navigation}) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('Postdetail' ,{userId, postId})}
      >
    <View style={styles.postContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.user}>{userId}</Text>
        <View style={styles.iconContainer}>
            <Icon name="thumbs-o-up" size={20} color="#555" style={{ marginRight: 20 }} />
            <Icon name="comment-o" size={20} color="#555" />
        </View>
    </View>
    </TouchableOpacity>
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
        marginTop: 15,
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
        justifyContent: 'space-between',
        marginTop: 16,
    },
});

export default Post;