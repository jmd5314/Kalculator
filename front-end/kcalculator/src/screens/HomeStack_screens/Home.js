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
//  const [ presentweight, setPresentweight ] = useState('');
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
        console.error('Error fetching recommendedCalories:', error);
      }
    };
    fetchRecommendedFromBackend();
  }, []);
  

  return (
    <SafeAreaView>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons name="account-circle" size={50} />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
            <Text style={{ fontSize: 20, marginRight: 20 }}>일일 섭취 칼로리 {recommendedCalories}kcal</Text>
            <Text style={{ fontSize: 20}}>남은 칼로리 kcal</Text>
        </View>
        <View>
            <Text style={{ fontSize: 20, marginBottom: 10}}>탄수화물 g/ {recommendedCarbohydrates}g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10}}>단백질 g/ {recommendedProteins}g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10}}>지방 g/ {recommendedFats}g</Text>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '80%', justifyContent: 'flex-start'}}>
            <Text style={{fontSize: 20}}>현재 체중 : </Text>
            <TextInput
                  style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                  placeholder="체중 (kg)"
                  keyboardType="numeric" // 키패드를 숫자 전용으로 설정
              />
            <Button title="입력" />
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