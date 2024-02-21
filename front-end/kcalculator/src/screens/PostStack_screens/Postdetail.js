import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // Import your backend URL configuration
import Icon from 'react-native-vector-icons/FontAwesome';

const backendUrl = config.backendUrl;



const Postdetail = ({navigation, route}) => {
    const { userId, postId } = route.params;
    const [certainPost, setCertainPost] = useState();

    const [content, setContent] = useState();
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [toggleFavoriteState, setToggleFavoriteState] = useState(false);
    const [toggleCommentState, setToggleCommentState] = useState(false);
    const [comment, setComment] = useState("");

    const refreshKey = route.params?.refreshKey || Math.random().toString();
    useEffect(() => {
        const getListFromServer = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                const response = await axios.get(`${backendUrl}/api/posts/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const postList = response.data;
            setCertainPost(postList.filter(post => post.userId === userId && post.postId === postId));

            } catch (error) {
                console.error(error);
            }
        };

        const getFavoriteCount = async() => {
            try {
                const token  = await AsyncStorage.getItem('token');

                const response = await axios.get(`${backendUrl}/api/hearts/count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFavoriteCount(response.data);
            } catch(error) {
                console.error(error);
            }
        }

        const getCommentCount = async() => {
            try {
                const token  = await AsyncStorage.getItem('token');

                const response = await axios.get(`${backendUrl}/api/comments/count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setCommentCount(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        getListFromServer();
       // getFavoriteCount();
       // getCommentCount();
    }, []);

    const addFavorite = async() => {
        try {
            const token = await AsyncStorage.getItem('token');

            const postToServer = {
                postId : postId,
            }

            const response = await axios.post(`${backendUrl}/api/hearts/insert`, postToServer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const deleteFavorite = async() => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.delete(`${backendUrl}/api/hearts/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch(error) {
            console.error(error);
        }
    }

    const toggleFavorite = () => {
        if(toggleFavoriteState === false) {
            addFavorite();
            setToggleFavoriteState(true);
        } else {
            deleteFavorite();
            setToggleFavoriteState(false);
        }
    }

    const toggleComment = () => {
      setToggleCommentState(!toggleCommentState);
    }

    const convertDateToString = () => {
        const currentDate = new Date();

        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        month = (month < 10 ? '0' : '') + month;
        day = (day < 10 ? '0' : '') + day;

        const formattedDate = year + '-' + month + '-' + day;

        return formattedDate;
    }

    const addComment = async() => {
        try {
            const token = await AsyncStorage.getItem('token');

            const postToServer = {
                postId : postId,
                content: content,
                creationDate: convertDateToString()
            }

            const response = await axios.post(`${backendUrl}/api/comments/save`, postToServer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
        {certainPost && certainPost.length > 0 && (
          <>
            <TextInput
                placeholder="제목"
                value={certainPost[0].title}
                style={styles.input}
            />
            <TextInput
                style={[styles.input, styles.multilineInput]}
                multiline
                value={certainPost[0].content}
                textAlignVertical="top" // 이 부분을 추가
            />

        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleFavorite}>
              <Icon name="thumbs-o-up" size={20} color="#555" style={{ marginRight: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleComment}>
                <Icon name="comment-o" size={20} color="#555" />
            </TouchableOpacity>
                      {console.log(toggleCommentState)}
        </View>

             {toggleCommentState && (
               <>
                 <TextInput
                   value={comment}
                   onChangeText={(e) => setComment(e)}
                   placeholder="댓글을 입력하세요."
                   style={styles.input}
                 />
                 <TouchableOpacity onPress={addComment}>
                   <Text>댓글 추가</Text>
                 </TouchableOpacity>
                </>
              )}

        </>)}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
    },
    input: {
        marginTop: 20,
        borderWidth: 1,
        marginBottom: 20,
        padding: 12,
        fontSize: 16,
    },
    multilineInput: {
        height: 150,
    },
    registerButton: {
        height: 50,
        width: 365,
        backgroundColor: '#39D02C',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
        iconContainer: {
            flexDirection: 'row',
            justifyContent: '',
            marginTop: 16,
        },
});

export default Postdetail;
