import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = config.backendUrl;
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const Home = ({ navigation }) => {
  const [ weight, setWeight ] = useState('');
  const [ recommendedCalories, setRecommendedCalories ] = useState('');
  const [ recommendedCarbohydrates, setRecommendedCarbohydrates ] = useState('');
  const [ recommendedProteins, setRecommendedProteins ] = useState('');
  const [ recommendedFats, setRecommendedFats ] = useState('');

  useEffect(() => {
    const fetchRecommendedFromBackend = async () => {
        const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get(`${backendUrl}/api/profiles/home`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRecommendedCalories(response.data.recommendedCalories);
        setRecommendedCarbohydrates(response.data.recommendedCarbohydrates);
        setRecommendedProteins(response.data.recommendedProteins);
        setRecommendedFats(response.data.recommendedFats);
      } catch (error) {
        console.error('Error fetching recommended:', error);
      }
    };
    fetchRecommendedFromBackend();
  }, []);

  const sendWeightToServer = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        console.error('Token not found');
        return;
    }
    const weightData = {
        weight,
    };

    fetch(`${backendUrl}/api/profiles/home/updateWeight`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(weightData),
    })
        .then(response => {
            console.log('서버 응답:', response);
            if (!response.ok) {
                throw new Error('네트워크 응답이 정상이 아닙니다');
            }
            return response.json();
        })
        .then(data => {
            console.log('몸무게가 성공적으로 전송되었습니다:', data);
        })
        .catch(error => {
            console.error('몸무게 전송 중 오류 발생:', error);
        });
};

  return (
    <SafeAreaView>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons name="account-circle" size={50} />
            </TouchableOpacity>
        </View>
        <View>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 5 }}>일일 섭취 칼로리 {recommendedCalories}kcal</Text>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 5 }}>남은 칼로리 kcal</Text>
        </View>
        <View>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 5 }}>탄수화물 g/ {recommendedCarbohydrates}g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 5 }}>단백질 g/ {recommendedProteins}g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 5 }}>지방 g/ {recommendedFats}g</Text>
        </View>
        <View style={styles.container}>
            <Text>Bar Chart Example</Text>
            <BarChart
              data={data}
              width={400}
              height={200}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '80%', marginLeft: 5}}>
            <Text style={{fontSize: 20}}>현재 체중 : </Text>
            <TextInput
                  style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                  onChangeText={(text) => setWeight(text)}
                  placeholder="체중 (kg)"
                  keyboardType="numeric"
              />
            <Button title="입력" onPress={sendWeightToServer}/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;