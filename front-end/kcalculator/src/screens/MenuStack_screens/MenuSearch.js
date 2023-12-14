import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const MenuSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20, marginLeft: 20,marginTop:20 }}>
                <Text style={{ fontSize: 30 }}>음식 검색</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10,marginLeft:20 }}>
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
                        <View style={[styles.resultItem, {marginLeft:20}]}>
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
                    <Text>지방: {selectedItem.fat} g</Text>
                    <Text>프로틴: {selectedItem.protein} g</Text>
                    <TouchableOpacity onPress={() => setSelectedItem(null)}>
                        <Text style={{ marginTop: 10 }}>닫기</Text>
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
        marginRight:40,
    },
    itemDetailsContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default MenuSearch;