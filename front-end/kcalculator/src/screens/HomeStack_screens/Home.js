import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressChart } from 'react-native-chart-kit';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Tab} from "react-native-elements";

const backendUrl = config.backendUrl;

const Home = ({ navigation }) => {
  const [ weight, setWeight ] = useState('');
  const [ recommendedCalories, setRecommendedCalories ] = useState('');
  const [ recommendedCarbohydrates, setRecommendedCarbohydrates ] = useState('');
  const [ recommendedProteins, setRecommendedProteins ] = useState('');
  const [ recommendedFats, setRecommendedFats ] = useState('');
  const [ totalCalories, setTotalCalories ] = useState('');
  const [ totalCarbohydrates, setTotalCarbohydrates ] = useState('');
  const [ totalProteins, setTotalProteins ] = useState('');
  const [ totalFats, setTotalFats ] = useState('');

  const CarbsPercentage = totalCarbohydrates / recommendedCarbohydrates||0;
  const ProteinPercentage = totalProteins / recommendedProteins||0;
  const FatPercentage = totalFats / recommendedFats||0;

  const data = {
      labels: ["탄수화물", "단백질", "지방"],
      data: [
        parseFloat((CarbsPercentage).toFixed(2)),
        parseFloat((ProteinPercentage).toFixed(2)),
        parseFloat((FatPercentage).toFixed(2)),
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(57,208,44, ${opacity})`,
    strokeWidth: 2,
  };

  const consumedCarbsPercentage = Math.round(parseFloat((CarbsPercentage).toFixed(2))*100);
  const consumedProteinPercentage =  Math.round(parseFloat((ProteinPercentage).toFixed(2))*100);
  const consumedFatPercentage = Math.round(parseFloat((FatPercentage).toFixed(2))*100);
useEffect(() => {
        const fetchDataFromBackend = async () => {
            const token = await AsyncStorage.getItem('token');

            try {
                const [recommendedResponse, totalResponse] = await Promise.all([
                    axios.get(`${backendUrl}/api/profiles/home`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(`${backendUrl}/api/foodRecords/total`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);
                const {
                    recommendedCalories,
                    recommendedCarbohydrates,
                    recommendedProteins,
                    recommendedFats,
                } = recommendedResponse.data;

                const {
                    totalCalories,
                    totalCarbohydrates,
                    totalProteins,
                    totalFats,
                } = totalResponse.data;


                setRecommendedCalories(recommendedCalories);
                setRecommendedCarbohydrates(recommendedCarbohydrates);
                setRecommendedProteins(recommendedProteins);
                setRecommendedFats(recommendedFats);

                setTotalCalories(totalCalories);
                setTotalCarbohydrates(totalCarbohydrates);
                setTotalProteins(totalProteins);
                setTotalFats(totalFats);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromBackend();
    });

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
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1}}>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons name="account-circle" size={50} />
            </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              {totalCalories}kcal / {recommendedCalories}kcal
            </Text>
            
        </View>
        <View style={styles.container}>
            <View>
              <ProgressChart
                data={data}
                width={400}
                height={300}
                chartConfig={chartConfig}
                hideLegend={false}
              />
            </View>
        </View>
        <View style={{ marginLeft: 20}}>
            <View style={styles.infoContainer}>
                <Text style={{ fontSize: 20}}>탄수화물</Text>
                    <Text style={{ fontSize: 20}}>{totalCarbohydrates}g</Text>
                    <Text style={{ fontSize: 20}}>{consumedCarbsPercentage}%</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={{ fontSize: 20, marginRight: 10}}>단백질</Text>
                <Text style={{ fontSize: 20}}>{totalProteins}g</Text>
                <Text style={{ fontSize: 20}}>{consumedProteinPercentage}%</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={{ fontSize: 20, marginRight: 30}}>지방</Text>
                <Text style={{ fontSize: 20}}>{totalFats}g</Text>
                <Text style={{ fontSize: 20}}>{consumedFatPercentage}%</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '80%', marginLeft: 12, marginTop:10}}>
            <TextInput
                  style={{ height: 40, width: 120, borderColor: 'gray', borderWidth: 1, margin: 10, padding:5 }}
                  onChangeText={(text) => setWeight(text)}
                  placeholder="현재 체중 (kg)"
                  keyboardType="numeric"/>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default Home;