import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { ProgressChart } from 'react-native-chart-kit';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IconWrapper = styled.TouchableOpacity`
  background-color: #CCCCCC;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.calorieText}>
                    {totalCalories}kcal / {recommendedCalories}kcal
                </Text>
                <IconWrapper onPress={() => navigation.navigate('Profile')}>
                    <Icon name="account-circle" size={30} color="#FFFFFF" />
                </IconWrapper>
            </View>
            <ProgressChart
                data={data}
                width={380}
                height={300}
                chartConfig={chartConfig}
                hideLegend={false}
                style={styles.chart}
            />
            <View style={styles.nutrientContainer}>
                <NutrientView label="탄수화물" amount={totalCarbohydrates} percentage={consumedCarbsPercentage} />
                <NutrientView label="단백질" amount={totalProteins} percentage={consumedProteinPercentage} />
                <NutrientView label="지방" amount={totalFats} percentage={consumedFatPercentage} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setWeight(text)}
                    placeholder="현재 체중 (kg)"
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.submitButton} onPress={sendWeightToServer}>
                    <Text style={styles.submitText}>입력</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const NutrientView = ({ label, amount, percentage }) => (
    <View style={styles.nutrientItem}>
        <Text style={styles.nutrientText}>{label}</Text>
        <Text style={styles.nutrientAmount}>{amount}g</Text>
        <Text style={styles.nutrientPercentage}>{percentage}%</Text>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    profileButton: {
        padding: 10,
        borderRadius: 20
    },
    calorieText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft:40,
        marginBottom:-100,
        color: '#333'
    },
    chart: {
        alignSelf: 'center',
        marginTop: 10
    },
    nutrientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 60
    },
    nutrientItem: {
        alignItems: 'center'
    },
    nutrientText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    nutrientAmount: {
        fontSize: 18
    },
    nutrientPercentage: {
        fontSize: 18,
        color: '#555'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginHorizontal: 20,
        marginBottom: 20
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingLeft: 10
    },
    submitButton: {
        backgroundColor: '#39D02C',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    submitText: {
        color: '#fff',
        fontSize: 16
    }
});

export default Home;