import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config';

const backendUrl = config.backendUrl;

const ChatBot = () => {
  const [profileData, setProfileData] = useState(null);
  const [calorieData, setCalorieData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/profiles/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchCalorieData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/foodRecords/total`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCalorieData(response.data);
      } catch (error) {
        console.error('Error fetching calorie data:', error);
      }
    };

    fetchProfileData();
    fetchCalorieData();
  }, []);

  const handleButtonPress = async (mealType) => {
    const newChatHistory = [...chatHistory, { type: 'user', text: `${mealType}을 추천해줘` }];
    setChatHistory(newChatHistory);

    try {
      const { recommendedCalories, recommendedCarbs, recommendedProtein, recommendedFat, purposeOfUse } = profileData;
      const { totalCalories,totalCarbohydrates, totalProteins, totalFats } = calorieData;

      const prompt = `
        내 권장 칼로리는 ${recommendedCalories}이고, 내 권장 탄수화물은 ${recommendedCarbs}g이고,
        권장 단백질은 ${recommendedProtein}g이고, 권장 지방은 ${recommendedFat}g이야.
        내 목표는 ${purposeOfUse}이고, 현재 난 탄수화물 ${totalCarbohydrates}g, 단백질 ${totalProteins}g, 지방 ${totalFats}g 을 먹어서 
        ${totalCalories}kcal 을 먹었어
        내 정보를 토대로 ${mealType}식단을 짜줘
        답변 형식은
        "오늘 ${recommendedCalories} 중 ${totalCalories}kcal 만큼 드셨군요!
        [ ]
        를 추천드립니다!" 로 해줘  [ ]에는 음식들이 들어가면 되고 답변은 전부 한국어여야 해
      `;

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      }, {
        headers: {
          Authorization: `Bearer`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = response.data.choices[0].message.content;
      setChatHistory([...newChatHistory, { type: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching response from GPT:', error.response ? error.response.data : error.message);
    }
  };

  return (
      <View style={styles.container}>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('아침')}>
            <Text style={styles.buttonText}>아침을 추천해줘</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('점심')}>
            <Text style={styles.buttonText}>점심을 추천해줘</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('저녁')}>
            <Text style={styles.buttonText}>저녁을 추천해줘</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  chatContainer: {
    flexGrow: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 15,
    padding: 15,
    maxWidth: '80%',
  },
  chatText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#39D02C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatBot;
