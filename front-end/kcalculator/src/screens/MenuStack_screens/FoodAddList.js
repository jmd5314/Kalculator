import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FoodAddList = ({ navigation, onUpdateList, route }) => {
    const { selectedItemList } = route.params;

    const totalCalories = selectedItemList ? selectedItemList.reduce((acc, item) => acc + parseInt(item.calories, 10), 0) : 0;
    const totalCarbs = selectedItemList ? selectedItemList.reduce((acc, item) => acc + parseInt(item.carbs, 10), 0) : 0;
    const totalProtein = selectedItemList ? selectedItemList.reduce((acc, item) => acc + parseInt(item.protein, 10), 0) : 0;
    const totalFat = selectedItemList ? selectedItemList.reduce((acc, item) => acc + parseInt(item.fat, 10), 0) : 0;

  const handleDeleteItem = (itemId) => {

    const updatedList = selectedItemList.filter(item => item.id !== itemId);
    

    onUpdateList(updatedList);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View>
        <Text style={{ fontSize: 30, marginLeft: 15, marginBottom: 15 }}>추가한 음식</Text>
      </View>
      <View>
        <Text style={{ fontSize: 15, marginLeft: 15, marginBottom: 5 }}>
            추가한 음식들의 총 칼로리 및 영양정보
        </Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.boxText}>총 칼로리: {totalCalories} kcal</Text>
        <Text style={styles.boxText}>총 탄수화물: {totalCarbs} g</Text>
        <Text style={styles.boxText}>총 단백질: {totalProtein} g</Text>
        <Text style={styles.boxText}>총 지방: {totalFat} g</Text>
      </View>
      <View style={styles.itemListContainer}>
        <Text style={{ fontSize: 15, marginLeft: 15, marginBottom: 5 }}>추가한 음식 항목</Text>
        <FlatList
            data={selectedItemList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.itemBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={{ fontSize: 15 }}>{item.title}</Text>
                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                            <MaterialIcons name="remove" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ 
            height: 50, width: 350, backgroundColor: '#39D02C', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('Menu')}
            >
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>기록완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  itemListContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  itemBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  boxText: {
    fontSize: 18, 
    marginLeft: 15, 
    marginBottom: 5,
  },
});

export default FoodAddList;