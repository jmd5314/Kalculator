import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { decode as atob } from 'base-64';

const backendUrl = config.backendUrl;

const PostDetail = ({ navigation, route }) => {
  const { postId } = route.params;
  const [certainPost, setCertainPost] = useState(null);
  const [certainComments, setCertainComments] = useState([]);
  const [toggleFavoriteState, setToggleFavoriteState] = useState(false);
  const [toggleCommentState, setToggleCommentState] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState("");

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
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        if (errorMessage === "내용이 비어 있습니다.") {
          alert("내용을 입력하세요");
        } else {
          console.error(errorMessage);
        }
      } else {
        console.error(error);
      }
    }
  }

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
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
      setEditingCommentId(null);

    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        if (errorMessage === "내용이 비어 있습니다.") {
          alert("내용을 입력하세요");
        } else {
          console.error(errorMessage);
        }
      } else {
        console.error(error);
      }
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
                                          <View>
                                            <TextInput
                                                value={editingComment}
                                                onChangeText={(text) => setEditingComment(text)}
                                                placeholder="댓글 수정"
                                                style={styles.input}
                                            />
                                            <TouchableOpacity onPress={() => handleUpdateComment(item.commentId)}>
                                              <Text style={styles.commentUpdateButtonText}>수정 완료</Text>
                                            </TouchableOpacity>
                                          </View>
                                      ) : (
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
          contentContainerStyle={{ paddingBottom: 20 }}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    padding: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  multilineInput: {
    minHeight: 150,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  commentActionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  commentActionButtonText: {
    color: '#555',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderWidth: 0,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  commentContent: {
    marginBottom: 5,
    fontSize: 16,
    color: '#666',
  },
  commentDate: {
    color: '#777',
    fontSize: 12,
  },
  commentButtonText: {
    color: 'white',
    backgroundColor: '#39D02C',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  lastCommentItem: {
    marginBottom: 100,
  },
  commentUpdateButtonText: {
    color: 'white',
    backgroundColor: '#39D02C',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default PostDetail;
