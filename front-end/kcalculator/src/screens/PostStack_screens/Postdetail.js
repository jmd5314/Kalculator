import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import {decode as atob} from 'base-64';
import { FlatList } from 'react-native';

const backendUrl = config.backendUrl;

const Postdetail = ({ navigation, route }) => {
  const { postId } = route.params;
  const [certainPost, setCertainPost] = useState(null);
  const [certainComments, setCertainComments] = useState([]);
  const [toggleFavoriteState, setToggleFavoriteState] = useState(false);
  const [toggleCommentState, setToggleCommentState] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID 저장
  const [editingComment, setEditingComment] = useState(""); // 수정 중인 댓글의 내용 저장

  const iconColor = toggleFavoriteState ? '#FF0000' : '#555';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const decodedUserId = payload.userId;
        setUserId(decodedUserId);

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

      setComment("");

    } catch (error) {
      console.error(error);
    }
  }

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId); // 수정할 댓글의 ID 저장
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.delete(`${backendUrl}/api/comments/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedComments = certainComments.filter(comment => comment.commentId !== commentId);
      setCertainComments(updatedComments);

    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateComment = async (commentId) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const updatedComment = {
        commentId: commentId,
        content: editingComment,
      }

      await axios.put(`${backendUrl}/api/comments/update/${commentId}`, updatedComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedComments = certainComments.map(comment => {
        if (comment.commentId === commentId) {
          return { ...comment, content: editingComment };
        }
        return comment;
      });
      setCertainComments(updatedComments);
      setEditingCommentId(null); // 수정 완료 후 수정 중인 댓글 ID 초기화

    } catch (error) {
      console.error(error);
    }
  }

  return (
      <FlatList
          style={styles.container}
          data={[certainPost]}
          renderItem={({ item }) => (
              <>
                {item && (
                    <>
                      <TextInput
                          placeholder="Title"
                          value={item.title}
                          style={styles.input}
                          editable={false}
                      />
                      <TextInput
                          style={[styles.input, styles.multilineInput]}
                          multiline
                          value={item.content}
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

                            <FlatList
                                data={certainComments}
                                renderItem={({ item, index }) => (
                                    <View style={[styles.commentItem, index === certainComments.length - 1 && styles.lastCommentItem]}>
                                      {editingCommentId === item.commentId ? (
                                          // 수정 폼 렌더링
                                          <View>
                                            <TextInput
                                                value={editingComment}
                                                onChangeText={(text) => setEditingComment(text)}
                                                placeholder="댓글 수정"
                                                style={styles.input}
                                            />
                                            <TouchableOpacity onPress={() => handleUpdateComment(item.commentId)}>
                                              <Text style={styles.commentButtonText}>수정 완료</Text>
                                            </TouchableOpacity>
                                          </View>
                                      ) : (
                                          // 댓글 렌더링
                                          <>
                                            <View style={styles.commentHeader}>
                                              <Text style={styles.commentUsername}>{item.userId}</Text>
                                              <Text style={styles.commentDate}>{item.creationDate}</Text>
                                            </View>
                                            <Text style={styles.commentContent}>{item.content}</Text>
                                            {item.userId === userId && (
                                                <View style={styles.commentActionButtons}>
                                                  <TouchableOpacity onPress={() => handleEditComment(item.commentId)}>
                                                    <Text style={styles.commentActionButtonText}>수정</Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={() => handleDeleteComment(item.commentId)}>
                                                    <Text style={styles.commentActionButtonText}>삭제</Text>
                                                  </TouchableOpacity>
                                                </View>
                                            )}
                                          </>
                                      )}
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                          </>
                      )}
                    </>
                )}
              </>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}// 하단 여백 설정
      />
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
  commentActionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  commentActionButtonText: {
    color: '#555',
    marginLeft: 10,
  },
  commentContainer: {
    marginTop: 10,
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
    marginLeft:280,
    marginTop:-12,
    marginBottom:5
  },
  lastCommentItem: {
    marginBottom: 100,
  },
});

export default Postdetail;