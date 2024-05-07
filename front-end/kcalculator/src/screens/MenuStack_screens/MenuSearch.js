import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuSearch = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemList, setSelectedItemList] = useState([]);
    const [selectedItemQuantity, setSelectedItemQuantity] = useState(0);

    const updateSelectedItemList = useCallback((updatedList) => {
        setSelectedItemList(updatedList);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('MenuSearch 화면이 포커스를 얻었습니다.');
            const storedItems = await AsyncStorage.getItem('selectedItemList');
            if (storedItems) {
                setSelectedItemList(JSON.parse(storedItems));
            }
        });

        return unsubscribe;
    }, [navigation]);

    const handleButton = async () => {
        try {
            const mealType = await AsyncStorage.getItem('selectedMealType');
            const selectedItemListWithMealType = selectedItemList.map(item => ({
                ...item,
                mealType: mealType || 'defaultMealType',
            }));
            await AsyncStorage.setItem('selectedItemList', JSON.stringify(selectedItemListWithMealType));
            navigation.navigate('FoodAddList');
        } catch (error) {
            console.error('AsyncStorage에서 mealType을 가져오는 중 오류 발생:', error);
        }
    };

    const handleSearch = async () => {
        try {
            setSearchResults([]);
            const response = await axios.get(
                `http://openapi.foodsafetykorea.go.kr/api/a9ff4312e52040419e84/I2790/json/1/20/DESC_KOR="${searchText}"`
            );
            const resultData = response.data?.I2790?.row || [];
            const formattedResults = resultData.map(item => ({
                id: item.FOOD_CD,
                title: item.DESC_KOR,
                calories: item.NUTR_CONT1,
                carbs: item.NUTR_CONT2 || 0,
                protein: item.NUTR_CONT3 || 0,
                fat: item.NUTR_CONT4 || 0,
                servingSize: item.SERVING_SIZE,
                unit: item.SERVING_UNIT,
            }));
            setSearchResults(formattedResults);
        } catch (error) {
            console.error('검색 중 오류 발생:', error.message);
        }
    };

    const handleItemSelected = (item) => {
        setSelectedItem(item);
    };

    const handleInputCertainItemToArray = () => {
        if (selectedItem && selectedItemQuantity > 0) {
            const selectedItemWithQuantity = {
                ...selectedItem,
                quantity: selectedItemQuantity,
            };
            setSelectedItemList([...selectedItemList, selectedItemWithQuantity]);
            console.log(`선택한 음식이 추가되었습니다. 수량은 ${selectedItemWithQuantity.quantity}개 입니다.`);
            setSelectedItemQuantity(0);
            setSelectedItem(null);
        } else {
            console.log('음식을 선택해주세요.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20, marginLeft: 10, marginTop: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 25, marginRight: 180, fontWeight: "bold" }}>음식 검색</Text>
                <TouchableOpacity
                    style={[
                        styles.buttonContainer,
                        { backgroundColor: selectedItemList.length > 0 ? '#2ecc71' : '#e74c3c' },
                    ]}
                    onPress={handleButton}
                >
                    <Text style={styles.buttonText}>{`${selectedItemList.length}`}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                <TextInput
                    style={styles.input}
                    placeholder="검색어를 입력하세요"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={handleSearch}>
                    <MaterialIcons name="search" size={50} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemSelected(item)}>
                        <View style={[styles.resultItem, { marginLeft: 10 }]}>
                            <Text>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {selectedItem && (
                <View style={styles.itemDetailsContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={{ marginRight: 100 }}>칼로리: {selectedItem.calories} kcal</Text>
                        <TouchableOpacity onPress={() => setSelectedItemQuantity(Math.max(0, selectedItemQuantity - 1))}>
                            <Text style={{ marginHorizontal: 5 }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 5 }}>{selectedItemQuantity}</Text>
                        <TouchableOpacity onPress={() => setSelectedItemQuantity(selectedItemQuantity + 1)}>
                            <Text style={{ marginHorizontal: 5 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>탄수화물: {selectedItem.carbs} g</Text>
                    <Text>지방: {selectedItem.fat} g</Text>
                    <Text>단백질: {selectedItem.protein} g</Text>
                    <Text>1회제공량: {selectedItem.servingSize} g</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setSelectedItem(null)}>
                            <Text style={{ marginTop: 10 }}>닫기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleInputCertainItemToArray();
                            }}
                        >
                            <Text style={{ marginTop: 10, marginLeft: 200 }}>추가하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    input: {
        height: 50,
        width: '85%',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 25,
        fontSize: 16,
        color: '#333',
    },
    resultItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        marginTop: 2,
    },
    itemDetailsContainer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 12,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowColor: '#000000',
        shadowOffset: { height: 2, width: 2 },
    },
    buttonContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default MenuSearch;