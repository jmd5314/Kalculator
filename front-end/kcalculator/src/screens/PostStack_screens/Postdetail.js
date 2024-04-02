import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // Import your backend URL configuration
import Icon from 'react-native-vector-icons/FontAwesome';

const backendUrl = config.backendUrl;

const Postdetail = ({ navigation, route }) => {
  const { userId, postId } = route.params;
  const [certainPost, setCertainPost] = useState(null);
  const [certainComments, setCertainComments] = useState([]);
  const [toggleFavoriteState, setToggleFavoriteState] = useState(false);
  const [toggleCommentState, setToggleCommentState] = useState(false);
  const [comment, setComment] = useState("");

  const iconColor = toggleFavoriteState ? '#FF0000' : '#555';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

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
        userId: userId,
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
        creationDate: new Date().toISOString() // Use ISO string directly
      }

      await axios.post(`${backendUrl}/api/comments/save`, postToServer, {
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
                      <Text>댓글 추가</Text>
                    </TouchableOpacity>
                    <View style={styles.commentContainer}>
                      {certainComments.map((comment, index) => (
                          <View key={index}>
                            <Text style={styles.commentText}>{comment.userId}: {comment.content}</Text>
                            <Text>{comment.creationDate}</Text>
                          </View>
                      ))}
                    </View>
                  </>
              )}
            </>
        )}
      </View>
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
    height: 150,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Postdetail;