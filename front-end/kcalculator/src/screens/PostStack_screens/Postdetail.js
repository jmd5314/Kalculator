import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'; // Import your backend URL configuration
import Icon from 'react-native-vector-icons/FontAwesome';

const backendUrl = config.backendUrl;

const Postdetail = ({ navigation, route }) => {
  const { userId, postId } = route.params;

  const [certainPost, setCertainPost] = useState();
  const [certainComment, setCertainComment] = useState([{
    userId: 'ho',
    content: 'Test',
    creationDate: new Date()
  }]);

  const [toggleFavoriteState, setToggleFavoriteState] = useState(false);
  const [toggleCommentState, setToggleCommentState] = useState(false);
  const [comment, setComment] = useState("");

  const iconColor = toggleFavoriteState ? '#FF0000' : '#555';

  useEffect(() => {
    const getPostListFromServer = async () => {
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

    const getCommentListFromServer = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${backendUrl}/api/comments/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const commentList = response.data;
        setCertainComment(commentList);

      } catch (error) {
        console.error(error);
      }
    };

    getPostListFromServer();
    getCommentListFromServer();

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

  const deleteFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const postToServer = {
        postId: postId,
      }

      await axios.delete(`${backendUrl}/api/hearts/delete`, {
        data: postToServer,
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

  const addComment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const postToServer = {
        postId: postId,
        content: comment,
        creationDate: convertDateToString()
      }

      await axios.post(`${backendUrl}/api/comments/save`, postToServer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update comment state after adding a new comment
      setCertainComment(prevComments => [...prevComments, postToServer]);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      {certainPost && certainPost.length > 0 && (
        <>
          <TextInput
            placeholder="Title"
            value={certainPost[0].title}
            style={styles.input}
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            multiline
            value={certainPost[0].content}
            textAlignVertical="top"
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
                onChangeText={(e) => setComment(e)}
                placeholder="댓글을 입력해주세요"
                style={styles.input}
              />
              <TouchableOpacity onPress={addComment}>
                <Text>댓글 추가</Text>
              </TouchableOpacity>
              <View style={styles.commentContainer}>
                  {certainComment.map((comment, index) => (
                  <>
                     <Text key={index} style={styles.commentText}>{comment.userId}:{comment.content}</Text>
                     <Text>{comment.creationDate}</Text>
                  </>
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
