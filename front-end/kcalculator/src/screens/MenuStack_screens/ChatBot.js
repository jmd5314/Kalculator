import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from '../config';

const backendUrl = config.backendUrl;

const ChatBot = () => {
  const [dietData, setDietData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchDietData = async () => {
      try {
        const response = await axios.get('https://your-backend.com/api/diet');
        setDietData(response.data);
      } catch (error) {
        console.error('Error fetching diet data:', error);
      }
    };

    fetchDietData();
  }, []);

  const handleUserInput = async () => {
    setChatHistory([...chatHistory, { type: 'user', text: userInput }]);
    
    try {
      // OpenAI API로 사용자 입력을 전송하여 응답을 받아옴
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003', // 사용할 GPT 모델
        prompt: userInput, // 사용자 입력을 GPT 모델에 전달
        max_tokens: 50 // 생성할 토큰의 최대 개수
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY' // OpenAI API 키
        }
      });

      // GPT 모델의 응답을 기록에 추가
      setChatHistory([...chatHistory, { type: 'bot', text: response.data.choices[0].text }]);
    } catch (error) {
      console.error('Error fetching response from GPT:', error);
    }

    // 사용자 입력 초기화
    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, marginLeft:10 }}>채팅</Text>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={[styles.messageContainer, { alignSelf: chat.type === 'user' ? 'flex-end' : 'flex-start' }]}>
            <View style={[styles.messageBubble, { backgroundColor: chat.type === 'user' ? '#dbe7f5' : '#f1f0f0' }]}>
              <Text style={[styles.chatText, { color: chat.type === 'user' ? '#000' : '#333' }]}>
                {chat.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="메시지를 입력하세요"
        />
        <TouchableOpacity
                style={{
                    backgroundColor: '#39D02C',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={handleUserInput}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '70%',
  },
  chatText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
});

export default ChatBot;