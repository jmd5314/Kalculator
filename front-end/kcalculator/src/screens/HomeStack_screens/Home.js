import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { ProgressChart } from 'react-native-chart-kit';
import axios from 'axios';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

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
    const [weight, setWeight] = useState('');
    const [recommendedCalories, setRecommendedCalories] = useState('');
    const [recommendedCarbohydrates, setRecommendedCarbohydrates] = useState('');
    const [recommendedProteins, setRecommendedProteins] = useState('');
    const [recommendedFats, setRecommendedFats] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
    const [totalCarbohydrates, setTotalCarbohydrates] = useState('');
    const [totalProteins, setTotalProteins] = useState('');
    const [totalFats, setTotalFats] = useState('');
    const [actualCarbsPercentage, setActualCarbsPercentage] = useState(0);
    const [actualProteinPercentage, setActualProteinPercentage] = useState(0);
    const [actualFatPercentage, setActualFatPercentage] = useState(0);
    const clampToOne = value => Math.min(1, value);

    const carbsData = clampToOne(actualCarbsPercentage / 100);
    const proteinData = clampToOne(actualProteinPercentage / 100);
    const fatData = clampToOne(actualFatPercentage / 100);

    const fetchDataFromBackend = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const [recommendedResponse, totalResponse] = await Promise.all([
                axios.get(`${backendUrl}/api/profiles/home`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${backendUrl}/api/foodRecords/total`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const { recommendedCalories, recommendedCarbohydrates, recommendedProteins, recommendedFats } = recommendedResponse.data;
            const { totalCalories, totalCarbohydrates, totalProteins, totalFats } = totalResponse.data;

            setRecommendedCalories(recommendedCalories);
            setRecommendedCarbohydrates(recommendedCarbohydrates);
            setRecommendedProteins(recommendedProteins);
            setRecommendedFats(recommendedFats);
            setTotalCalories(totalCalories);
            setTotalCarbohydrates(totalCarbohydrates);
            setTotalProteins(totalProteins);
            setTotalFats(totalFats);

            setActualCarbsPercentage(Math.round((totalCarbohydrates / recommendedCarbohydrates || 0) * 100));
            setActualProteinPercentage(Math.round((totalProteins / recommendedProteins || 0) * 100));
            setActualFatPercentage(Math.round((totalFats / recommendedFats || 0) * 100));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchDataFromBackend();
        }, [])
    );

    const sendWeightToServer = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        const weightData = { weight };

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
                console.log('몸무게가 성공적으로 전송되었습니다:', data);
            })
            .catch(error => {
                console.error('몸무게 전송 중 오류 발생:', error);
            });
    };

    const chartConfig = {
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1, index) => {
            const colors = [
                `rgba(255, 149, 0, ${opacity})`,   // 탄수화물: 밝은 오렌지
                `rgba(76, 217, 100, ${opacity})`,  // 단백질: 연두색
                `rgba(90, 200, 250, ${opacity})`   // 지방: 부드러운 파란색
            ];
            return colors[index % colors.length];
        },
        strokeWidth: 2, // 선의 두께 설정
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 레이블 색상
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
                data={{
                    labels: ["탄수화물", "단백질", "지방"],
                    data: [carbsData, proteinData, fatData]
                }}
                width={380}
                height={300}
                chartConfig={chartConfig}
                hideLegend={false}
                style={styles.chart}
            />
            <View style={styles.nutrientContainer}>
                <NutrientView label="탄수화물" amount={totalCarbohydrates} percentage={actualCarbsPercentage} />
                <NutrientView label="단백질" amount={totalProteins} percentage={actualProteinPercentage} />
                <NutrientView label="지방" amount={totalFats} percentage={actualFatPercentage} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
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
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    calorieText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
        marginBottom: -100,
        color: '#333',
    },
    chart: {
        alignSelf: 'center',
        marginTop: 10,
    },
    nutrientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 60,
    },
    nutrientItem: {
        alignItems: 'center',
    },
    nutrientText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nutrientAmount: {
        fontSize: 18,
    },
    nutrientPercentage: {
        fontSize: 18,
        color: '#555',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
    },
    submitButton: {
        backgroundColor: '#39D02C',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
    }
});

export default Home;
