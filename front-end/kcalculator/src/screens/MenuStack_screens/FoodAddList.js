import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import config from "../config";

const backendUrl = config.backendUrl;

const FoodAddList = ({ navigation }) => {
    const [selectedItemList, setSelectedItemList] = useState([]);

    useEffect(() => {
        const loadItemList = async () => {
            const itemList = await AsyncStorage.getItem('selectedItemList');
            if (itemList !== null) {
                setSelectedItemList(JSON.parse(itemList));
            }
        };

        loadItemList();
    }, []);

    const calculateTotals = () => {
        const totals = selectedItemList.reduce((acc, item) => {
            acc.calories += item.calories * item.quantity;
            acc.carbs += item.carbs * item.quantity;
            acc.protein += item.protein * item.quantity;
            acc.fat += item.fat * item.quantity;
            return acc;
        }, { calories: 0, carbs: 0, protein: 0, fat: 0 });
        return totals;
    };

    const handleDeleteItem = (itemId) => {
        const updatedItemList = selectedItemList.filter(item => item.id !== itemId);
        setSelectedItemList(updatedItemList);
        AsyncStorage.setItem('selectedItemList', JSON.stringify(updatedItemList));
    };

    const sendFoodToServer = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('토큰을 찾을 수 없습니다.');
            return;
        }

        const foodDataList = selectedItemList.map(item => ({
            foodName: item.title,
            calories: item.calories,
            fats: item.fat,
            carbohydrates: item.carbs,
            proteins: item.protein,
            quantity: item.quantity,
            mealType: item.mealType
        }));

        fetch(`${backendUrl}/api/foodRecords/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(foodDataList),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 정상이 아닙니다');
                }
                return response.json();
            })
            .then(data => {
                console.log('음식 정보가 성공적으로 전송되었습니다:', data);
                // 음식 정보 전송 후 로컬 저장소에서 항목 목록을 비웁니다.
                AsyncStorage.setItem('selectedItemList', JSON.stringify([]));
                setSelectedItemList([]);
                navigation.navigate("Menu");
            })
            .catch(error => {
                console.error('음식 정보 전송 중 오류 발생:', error);
            });
    };

    const { calories, carbs, protein, fat } = calculateTotals();

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Text style={{ fontSize: 30, marginLeft: 15, marginBottom: 15 }}>추가한 음식</Text>
            <Text style={{ fontSize: 15, marginLeft: 15, marginBottom: 5 }}>추가한 음식들의 총 칼로리 및 영양정보</Text>
            <View style={styles.summaryContainer}>
                <Text style={styles.boxText}>총 칼로리: {calories} kcal</Text>
                <Text style={styles.boxText}>총 탄수화물: {carbs} g</Text>
                <Text style={styles.boxText}>총 단백질: {protein} g</Text>
                <Text style={styles.boxText}>총 지방: {fat} g</Text>
            </View>
            <FlatList
                data={selectedItemList}
                keyExtractor={(item) => item.id.toString()}
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
            <TouchableOpacity style={styles.button}
                              onPress={sendFoodToServer}>
                <Text style={{ color: 'white', fontSize: 20 }}>기록완료</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    summaryContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 15
    },
    itemBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 15
    },
    boxText: {
        fontSize: 18,
        marginBottom: 5
    },
    button: {
        height: 50,
        backgroundColor: '#39D02C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 15
    }
});

export default FoodAddList;