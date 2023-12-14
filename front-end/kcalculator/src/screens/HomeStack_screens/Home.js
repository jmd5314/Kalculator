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
  labels: ['3일전', '2일전','어제','오늘'],
  datasets: [
    {
      data: [0,0,0,0],
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
            console.log('몸무게가 성공적으로 전송되었습니다:',data);
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
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>일일 섭취 칼로리 : {recommendedCalories}kcal</Text>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>남은 칼로리 : {recommendedCalories} kcal</Text>
        </View>
        <View>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>탄수화물 0g / {recommendedCarbohydrates}g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>단백질 0g / {recommendedProteins}g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>지방 0g / {recommendedFats}g</Text>
        </View>
        <View style={styles.container}>
            <Text>칼로리 섭취량</Text>
            <BarChart
              data={data}
              width={400}
              height={200}
              chartConfig={{
                backgroundColor: '#39D02C',
                backgroundGradientFrom: '#39D02C',
                backgroundGradientTo: '#39D02C',
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
                  yAxisSuffix: 'k',
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '80%', marginLeft: 10}}>
            <Text style={{fontSize: 20}}>현재 체중 : </Text>
            <TextInput
                  style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                  onChangeText={(text) => setWeight(text)}
                  placeholder="체중 (kg)"
                  keyboardType="numeric"
              />
            <TouchableOpacity
                style={{
                    backgroundColor: '#39D02C',
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={sendWeightToServer}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>입력</Text>
            </TouchableOpacity>
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