import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const MenuSearch = ({ navigation }) => {
    const [ searchText, setSearchText ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ selectedItemList, setSelectedItemList ] = useState([]);






    const handleSearch = async () => {
        try {
            setSearchResults([]);
            const response = await axios.get(
                `http://openapi.foodsafetykorea.go.kr/api/a9ff4312e52040419e84/I2790/json/1/20/DESC_KOR="${searchText}"`
            );

            const resultData = response.data?.I2790?.row || [];

            // Extract relevant information for each item in the resultData array
            const formattedResults = resultData.map(item => ({
                id: item.FOOD_CD,
                title: item.DESC_KOR,
                calories: item.NUTR_CONT1,
                carbs: item.NUTR_CONT2,
                protein: item.NUTR_CONT3,
                fat: item.NUTR_CONT4,
                quantity: item.SERVING_SIZE,
                unit: item.SERVING_UNIT,
            }));

            // Update the searchResults state with the formatted results
            setSearchResults(formattedResults);
        } catch (error) {
            console.error('검색 중 오류 발생:', error.message);
        }
    };

    const handleItemSelected = (item) => {
        // Set the selected item and show details
        setSelectedItem(item);
    };

    const handleInputCertainItemToArray = () => {
        try {
            if(selectedItem){
                setSelectedItemList([...selectedItemList, selectedItem]);
                console.log('선택한 음식이 추가되었습니다.');
                console.log(selectedItemList);

                setSelectedItem(null);
            } else {
                console.log('선택한 음식이 없습니다.');
                setSelectedItem(null);
            }
        } catch(error) {
            console.error('에러가 발생하였습니다.', error);
        }
    }



        const [isButtonPressed, setButtonPressed] = useState(false);

        const handleButtonPress = () => {
            // 버튼이 눌렸을 때 실행할 로직 추가
            setButtonPressed(true);
        };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20, marginLeft: 10,marginTop:20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 30, marginRight: 180 }}>음식 검색</Text>
            <TouchableOpacity
                style={[
                    styles.buttonContainer,
                    isButtonPressed ? styles.buttonPressed : null,
                ]}
                onPress={() => {
                    handleButtonPress();
                    navigation.navigate('FoodAddList', { selectedItemList });
                }}
            >
                <Text style={styles.buttonText}>{`${selectedItemList.length}`}</Text>
            </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10,marginLeft:10 }}>
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
                        <View style={[styles.resultItem, {marginLeft:10}]}>
                            <Text>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Display item details */}
            {selectedItem && (
                <View style={styles.itemDetailsContainer}>
                    <Text>칼로리: {selectedItem.calories} kcal</Text>
                    <Text>탄수화물: {selectedItem.carbs} g</Text>
                    <Text>지방: {selectedItem.fat} {selectedItem.unit}</Text>
                    <Text>단백질: {selectedItem.protein} g</Text>
                    <Text>1회제공량: {selectedItem.quantity} g</Text>
                    <TouchableOpacity onPress={() => setSelectedItem(null)}>
                        <Text style={{ marginTop: 10 }}>닫기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handleButtonPress();
                            handleInputCertainItemToArray();
                        }}
                    >
                        <Text style={[styles.addButton, isButtonPressed ? styles.buttonPressed : null]}>추가하기</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    resultItem: {
        paddingTop: 15,    // 위 여백
        paddingRight: 15,  // 오른쪽 여백
        paddingBottom: 15, // 아래 여백
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginRight:50,
    },
    itemDetailsContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
          buttonContainer: {
              backgroundColor: '#2ecc71', // 초록색
              padding: 10,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
          },
          buttonPressed: {
              backgroundColor: '#e74c3c', // 빨강색
          },
        buttonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },

});



export default MenuSearch;