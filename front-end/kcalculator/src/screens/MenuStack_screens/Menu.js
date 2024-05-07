import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';

const Container = styled.SafeAreaView`
  background-color: #F9FAFB;
  flex: 1;
  padding: 20px;
`;

const MealButton = styled(TouchableOpacity)`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  margin: 5px;
  flex: 1;
`;

const MealRow = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 10px;
`;

const MealInfo = styled.View`
  align-items: center;
`;

const MealText = styled.Text`
  font-size: 25px;
  margin-bottom: 10px;
  color: #333;
`;

const TitleText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #333;
`;

const CalorieText = styled.Text`
  font-size: 18px;
  color: #666;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

const IconWrapper = styled.TouchableOpacity`
  background-color: ${props => props.active ? '#4CAF50' : '#CCCCCC'};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const backendUrl = config.backendUrl;

const Menu = ({ navigation, route }) => {
    const [mealCalories, setMealCalories] = useState({ breakfast: 0, lunch: 0, dinner: 0, dessert: 0 });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchCalories = async () => {
                const token = await AsyncStorage.getItem('token');
                const meals = ['breakfast', 'lunch', 'dinner', 'dessert'];
                try {
                    const responses = await Promise.all(meals.map(meal =>
                        axios.get(`${backendUrl}/api/foodRecords/${meal}/Calories`, {
                            headers: { Authorization: `Bearer ${token}` },
                        })
                    ));
                    setMealCalories({
                        breakfast: responses[0].data,
                        lunch: responses[1].data,
                        dinner: responses[2].data,
                        dessert: responses[3].data
                    });
                } catch (error) {
                    console.error('Error fetching meal data:', error);
                }
            };
            fetchCalories();
        });

        return unsubscribe;
    }, [navigation]);

    const handleButtonPress = async (mealType) => {
        try {
            await AsyncStorage.setItem('selectedMealType', mealType);
            navigation.navigate('MenuSearch', { mealType });
        } catch (error) {
            console.error('Error storing mealType:', error);
        }
    };

    return (
        <Container>
            <Header>
                <TitleText>식단</TitleText>
                <View style={{ flexDirection: 'row' }}>
                    <IconWrapper onPress={() => navigation.navigate('Profile')}>
                        <Icon name="account-circle" size={30} color="#FFFFFF" />
                    </IconWrapper>
                    <IconWrapper onPress={() => navigation.navigate('ChatBot')} style={{ marginLeft: 20 }}>
                        <Icon name="chat" size={30} color="#FFFFFF" />
                    </IconWrapper>
                </View>
            </Header>
            <MealRow>
                <MealButton onPress={() => handleButtonPress('breakfast')}>
                    <MealInfo>
                        <MealText>아침</MealText>
                        <CalorieText>{mealCalories.breakfast}kcal</CalorieText>
                        <IconWrapper active={mealCalories.breakfast > 0} onPress={() => handleButtonPress('breakfast')}>
                            <Icon name={mealCalories.breakfast > 0 ? "check-circle" : "plus-circle"} size={30} color="#FFFFFF" />
                        </IconWrapper>
                    </MealInfo>
                </MealButton>
                <MealButton onPress={() => handleButtonPress('lunch')}>
                    <MealInfo>
                        <MealText>점심</MealText>
                        <CalorieText>{mealCalories.lunch}kcal</CalorieText>
                        <IconWrapper active={mealCalories.lunch > 0} onPress={() => handleButtonPress('lunch')}>
                            <Icon name={mealCalories.lunch > 0 ? "check-circle" : "plus-circle"} size={30} color="#FFFFFF" />
                        </IconWrapper>
                    </MealInfo>
                </MealButton>
            </MealRow>
            <MealRow>
                <MealButton onPress={() => handleButtonPress('dinner')}>
                    <MealInfo>
                        <MealText>저녁</MealText>
                        <CalorieText>{mealCalories.dinner}kcal</CalorieText>
                        <IconWrapper active={mealCalories.dinner > 0} onPress={() => handleButtonPress('dinner')}>
                            <Icon name={mealCalories.dinner > 0 ? "check-circle" : "plus-circle"} size={30} color="#FFFFFF" />
                        </IconWrapper>
                    </MealInfo>
                </MealButton>
                <MealButton onPress={() => handleButtonPress('dessert')}>
                    <MealInfo>
                        <MealText>간식</MealText>
                        <CalorieText>{mealCalories.dessert}kcal</CalorieText>
                        <IconWrapper active={mealCalories.dessert > 0} onPress={() => handleButtonPress('dessert')}>
                            <Icon name={mealCalories.dessert > 0 ? "check-circle" : "plus-circle"} size={30} color="#FFFFFF" />
                        </IconWrapper>
                    </MealInfo>
                </MealButton>
            </MealRow>
        </Container>
    );
};

export default Menu;