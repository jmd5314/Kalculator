import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import profile from '../Images/profile.jpg';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";
import axios from 'axios';

const Container = styled.SafeAreaView`
  background-color: #ffffff;
  flex: 1;
`;

const ButtonText = styled.Text`
  font-size: 18px;
`;

const IconWrapper = styled.View`
  align-items: flex-end;
  marginRight: 5px;
  marginTop:5px;
`;

const GrayButton = styled(TouchableOpacity)`
  background-color: #eeebeb;
  height: 150px;
  width: 45%; /* Adjusted width */
  border-radius: 10px;
`;

const backendUrl = config.backendUrl;

const Menu = ({ navigation }) => {
  const [ Bcalories, setBcalories ] = useState(0);
  const [ Lcalories, setLcalories ] = useState(0);
  const [ Dinnercalories, setDinnercalories ] = useState(0);
  const [ Dessertcalories, setDessertcalories ] =useState(0);
      const fetchBreakfastFromBackend = async () => {
          const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.get(`${backendUrl}/api/foodRecords/Breakfast/Calories`,{
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setBcalories(response.data)
        } catch (error) {
          console.error('Error fetching breakfast:', error);
        }
      };
      const fetchLunchFromBackend = async () => {
          const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.get(`${backendUrl}/api/foodRecords/Lunch/Calories`,{
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setLcalories(response.data)
        } catch (error) {
          console.error('Error fetching lunch:', error);
        }
      };
      const fetchDinnerFromBackend = async () => {
          const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.get(`${backendUrl}/api/foodRecords/Dinner/Calories`,{
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setDinnercalories(response.data)
        } catch (error) {
          console.error('Error fetching dinner:', error);
        }
      };
      const fetchDessertFromBackend = async () => {
          const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.get(`${backendUrl}/api/foodRecords/Dessert/Calories`,{
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setDessertcalories(response.data)
        } catch (error) {
          console.error('Error fetching dessert:', error);
        }
      };
      useEffect(() => {
           fetchBreakfastFromBackend();
           fetchLunchFromBackend();
           fetchDinnerFromBackend();
           fetchDessertFromBackend();
        }, []);


    const handleButtonPress = async (mealType) => {
        try {
            // 선택된 mealType 을 AsyncStorage 에 저장
            await AsyncStorage.setItem('selectedMealType', mealType);
            // MenuSearch 화면으로 선택된 mealType 을 전달하여 이동
            navigation.navigate('MenuSearch', { mealType });
        } catch (error) {
            console.error('AsyncStorage에 mealType 저장 중 오류 발생:', error);
        }
    };




  return (
    <Container>
      <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 20, marginTop: 40 }}>
        <Text style={{ fontSize: 40, marginRight:210 }}>식단 </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Icon name="account-circle" size={40} color="black" />
                </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 0, marginLeft: 20, marginTop: 30 }}>
        <Text style={{ fontSize: 25, marginRight: 130 }}>아침 </Text>
        <Text style={{ fontSize: 25 }}>점심 </Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 20, marginTop: 10 }}>
   <GrayButton
     style={{ marginRight: 20 }}
     >

      {Bcalories > 0 ? (<IconWrapper>
      <Icon name="check-circle" size={30} color="blue" onPress={() => handleButtonPress('breakfast')} />
     </IconWrapper>) : (<IconWrapper>
       <Icon name="plus-circle" size={30} color="black" onPress={() => handleButtonPress('breakfast')} />
     </IconWrapper>)}



     <CalorieText>{Bcalories}</CalorieText>
   </GrayButton>
     <GrayButton
           >
                    {Lcalories > 0 ? (<IconWrapper>
                    <Icon name="check-circle" size={30} color="blue" onPress={() => handleButtonPress('lunch')} />
                   </IconWrapper>) : (<IconWrapper>
                     <Icon name="plus-circle" size={30} color="black" onPress={() => handleButtonPress('lunch')} />
                   </IconWrapper>)}
           <CalorieText>{Lcalories}</CalorieText>

     </GrayButton>
     </View>


           <View style={{ flexDirection: 'row', marginBottom: 0, marginLeft: 20, marginTop: 20 }}>
             <Text style={{ fontSize: 25, marginRight: 130 }}>저녁 </Text>
             <Text style={{ fontSize: 25 }}>간식 </Text>
           </View>

           <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 20, marginTop: 10 }}>
           <GrayButton
             style={{ marginRight: 20 }}
            >
                    {Dinnercalories > 0 ? (<IconWrapper>
                    <Icon name="check-circle" size={30} color="blue" onPress={() => handleButtonPress('dinner')} />
                   </IconWrapper>) : (<IconWrapper>
                     <Icon name="plus-circle" size={30} color="black" onPress={() => handleButtonPress('dinner')} />
                   </IconWrapper>)}
                <CalorieText>{Dinnercalories}</CalorieText>

           </GrayButton>
          <GrayButton
            >
                    {Dessertcalories > 0 ? (<IconWrapper>
                    <Icon name="check-circle" size={30} color="blue" onPress={() => handleButtonPress('dessert')} />
                   </IconWrapper>) : (<IconWrapper>
                     <Icon name="plus-circle" size={30} color="black" onPress={() => handleButtonPress('dessert')} />
                   </IconWrapper>)}
              <CalorieText>{Dessertcalories}</CalorieText>

          </GrayButton>
          </View>


    </Container>
  );
};

const CalorieText = styled.Text`
  margin-top: 25px;
  text-align: center;
  font-size: 18px;
   font-family:  'Roboto';
`;



export default Menu;