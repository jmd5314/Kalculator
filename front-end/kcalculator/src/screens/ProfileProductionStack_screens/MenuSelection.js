import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
//import profile1 from '../Images/ee5_generated.jpg';
//import profile2 from '../Images/running.jpg';
//import profile3 from '../Images/normalfood.png';


const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const StyledText = styled.Text`
  font-size: 40px;
  margin-bottom: 20px;
`;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 16,
    width: 300,
    height: 150,
  },
});

const MenuSelection = ({ navigation }) => {
  const handleCardPress = (mode) => {
    // 여기에서 각각의 Card가 눌렸을 때의 동작을 처리할 수 있습니다.
    // navigation.navigate('다음 화면'); 또는 다른 동작을 수행하세요.
    navigation.navigate('TargetCalorie', { mode });
  };

  return (
    <Container>
     <Text>어떤 식단 모드로 진행할까요?</Text>
      <TouchableOpacity style={[styles.card, {backgroundColor: 'gray'}]}
       onPress={() => navigation.navigate('TargetCalorie')}>
       <Text style={{ color: 'white', marginBottom: 20 }}>일반 식단</Text>
//
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, {backgroundColor: '#333'}]}
      onPress={() => handleCardPress('운동 식단')}>
       <Text style={{ color: 'white', marginBottom: 20 }}>운동 식단</Text>
//
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, {backgroundColor: 'purple'}]}
      onPress={() => handleCardPress('비건 식단')}>
        <Text style={{ color: 'white', marginBottom:20 }}>비건 식단</Text>
//
      </TouchableOpacity>
    </Container>
  );
};

export default MenuSelection;