import React, { useState} from 'react';
import {TouchableOpacity, View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import profile from '../Images/profile.jpg';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

const Menu = ({ navigation }) => {
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
     onPress={() => navigation.navigate('MenuSearch')}>
     <IconWrapper>
       <Icon name="plus-circle" size={30} color="black" />
     </IconWrapper>
   </GrayButton>
     <GrayButton
      onPress={() => navigation.navigate('MenuSearch')}>
                 <IconWrapper>
                 <Icon name="plus-circle" size={30} color="black" />
                 </IconWrapper>
     </GrayButton>
     </View>


           <View style={{ flexDirection: 'row', marginBottom: 0, marginLeft: 20, marginTop: 20 }}>
             <Text style={{ fontSize: 25, marginRight: 130 }}>저녁 </Text>
             <Text style={{ fontSize: 25 }}>간식 </Text>
           </View>

           <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 20, marginTop: 10 }}>
           <GrayButton
             style={{ marginRight: 20 }}
             onPress={() => navigation.navigate('MenuSearch')}>
             <IconWrapper>
               <Icon name="plus-circle" size={30} color="black" />
             </IconWrapper>
           </GrayButton>
          <GrayButton
            onPress={() => navigation.navigate('MenuSearch')}>
               <IconWrapper>
                           <Icon name="plus-circle" size={30} color="black" />
                         </IconWrapper>
          </GrayButton>
          </View>


    </Container>
  );
};

export default Menu;