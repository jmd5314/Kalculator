import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import {decode as atob} from 'base-64';


const backendUrl = config.backendUrl;

const Postdetail = ({ navigation, route }) => {
  const { postId } = route.params;
  const [certainPost, setCertainPost] = useState(null);
  const [certainComments, setCertainComments] = useState([]);
  const [toggleFavoriteState, setToggleFavoriteState] = useState(false);
  const [toggleCommentState, setToggleCommentState] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);

  const iconColor = toggleFavoriteState ? '#FF0000' : '#555';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // JWT 토큰을 디코딩하여 사용자 ID를 추출
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const decodedUserId = payload.userId;
        setUserId(decodedUserId);

        // Fetching post
        const postResponse = await axios.get(`${backendUrl}/api/posts/confirm`, {
          params: {
            postId: postId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const post = postResponse.data;
        setCertainPost(post);

        const likeStatusResponse = await axios.get(`${backendUrl}/api/hearts/confirm`, {
          params: {
            postId: postId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const hasLiked = likeStatusResponse.data;
        setToggleFavoriteState(hasLiked);

        // Fetching comments
        const commentsResponse = await axios.get(`${backendUrl}/api/comments/list`, {
          params: {
            postId: postId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const comments = commentsResponse.data;
        setCertainComments(comments);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);

  const addFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const postToServer = {
        postId: postId,
      }

      await axios.post(`${backendUrl}/api/hearts/insert`, postToServer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToggleFavoriteState(true);

    } catch (error) {
      console.error(error);
    }
  }
  const deleteFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.delete(`${backendUrl}/api/hearts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToggleFavoriteState(false);

    } catch (error) {
      console.error(error);
    }
  }
  const toggleFavorite = () => {
    if (toggleFavoriteState === false) {
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

  const addComment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const postToServer = {
        postId: postId,
        content: comment,
        creationDate: new Date().toISOString()
      }

      await axios.post(`${backendUrl}/api/comments/save`, postToServer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After adding comment, fetch comments again to update the UI
      const commentsResponse = await axios.get(`${backendUrl}/api/comments/list`, {
        params: {
          postId: postId
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const comments = commentsResponse.data;
      setCertainComments(comments);

      // Clear the comment input
      setComment("");

    } catch (error) {
      console.error(error);
    }
  }

  return (
      <ScrollView style={styles.container}>
        {certainPost && (
            <>
              <TextInput
                  placeholder="Title"
                  value={certainPost.title}
                  style={styles.input}
                  editable={false}
              />
              <TextInput
                  style={[styles.input, styles.multilineInput]}
                  multiline
                  value={certainPost.content}
                  textAlignVertical="top"
                  editable={false}
              />

              <View style={[styles.iconContainer, { borderColor: iconColor }]}>
                <TouchableOpacity onPress={toggleFavorite}>
                  {toggleFavoriteState ?
                      (<Icon name="heart" size={20} color={iconColor} style={{ marginRight: 20 }} />)
                      : (<Icon name="heart-o" size={20} color={iconColor} style={{ marginRight: 20 }} />)
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleComment}>
                  <Icon name="comment-o" size={20} color="#555" />
                </TouchableOpacity>
              </View>
              {toggleCommentState && (
                  <>
                    <TextInput
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        placeholder="댓글을 입력해주세요"
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={addComment}>
                      <Text style={styles.commentButtonText}>댓글 추가</Text>
                    </TouchableOpacity>
                    <View style={styles.commentContainer}>
                      {certainComments.map((comment, index) => (
                          <View key={index} style={styles.commentItem}>
                            <View style={styles.commentHeader}>
                              <Text style={styles.commentUsername}>{comment.userId}</Text>
                              <Text style={styles.commentDate}>{comment.creationDate}</Text>
                            </View>
                            <Text style={styles.commentContent}>{comment.content}</Text>

                            {/* 추가: 댓글 작성자와 현재 사용자의 ID가 일치하는 경우에만 수정 및 삭제 버튼 표시 */}
                            {comment.userId === userId && (
                                <View style={styles.commentActionButtons}>
                                  <TouchableOpacity onPress={() => handleEditComment(comment)}>
                                    <Text style={styles.commentActionButtonText}>수정</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                                    <Text style={styles.commentActionButtonText}>삭제</Text>
                                  </TouchableOpacity>
                                </View>
                            )}
                          </View>
                      ))}
                    </View>
                  </>
              )}
            </>
        )}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
    marginBottom: 20,
    padding: 12,
    fontSize: 16,
    color: 'black',
  },
  multilineInput: {
    minHeight: 300,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentActionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  commentActionButtonText: {
    color: '#555',
    marginLeft: 10,
  },
  commentContainer: {
    marginTop: 10,
    maxHeight: 200,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentContent: {
    marginBottom: 5,
  },
  commentDate: {
    color: '#777',
    fontSize: 12,
  },
  commentButtonText: {
    color: 'black',
    marginLeft:300,
    marginTop:-12,
    marginBottom:5
  },
});

export default Postdetail;