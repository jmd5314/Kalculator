import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";



const MenuSearch = ({ navigation }) => {
    const [ searchText, setSearchText ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ selectedItemList, setSelectedItemList ] = useState([]);
    const [ selectedItemQuantity, setSelectedItemQuantity ] = useState(0);

    const updateSelectedItemList = useCallback((updatedList) => {
        setSelectedItemList(updatedList);
    }, []);

    // useEffect를 사용하여 화면 포커스 시 이벤트 추가
    useEffect(() => {
        // MenuSearch 화면이 포커스를 얻을 때마다 동기화
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('MenuSearch 화면이 포커스를 얻었습니다.');
            // 여기서 서버에서 데이터를 가져오거나 다른 동기화 작업을 수행할 수 있습니다.
            // 예시: setSelectedItemList(새로운 데이터);
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);
    const handleButton = async () => {
        try {
            // AsyncStorage에서 mealType 가져오기
            const mealType = await AsyncStorage.getItem('selectedMealType');

            // 선택된 음식 목록을 준비
            const selectedItemListWithMealType = selectedItemList.map(item => ({
                ...item,
                mealType: mealType || 'defaultMealType', // 기본값은 'defaultMealType'
            }));

            // FoodAddList 화면으로 이동하면서 selectedItemList 및 updateSelectedItemList 함수 전달
            navigation.navigate('FoodAddList', {
                selectedItemList: selectedItemListWithMealType,
                updateSelectedItemList,
            });
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

            // Extract relevant information for each item in the resultData array
            const formattedResults = resultData.map(item => ({
                id: item.FOOD_CD,
                title: item.DESC_KOR,
                calories: item.NUTR_CONT1,
                carbs: item.NUTR_CONT2||0,
                protein: item.NUTR_CONT3||0,
                fat: item.NUTR_CONT4||0,
                servingSize: item.SERVING_SIZE,
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
            if (selectedItem) {
                if (selectedItemQuantity > 0) {
                    const selectedItemWithQuantity = {
                        ...selectedItem,
                        quantity: selectedItemQuantity,
                    };

                    setSelectedItemList([...selectedItemList, selectedItemWithQuantity]);
                    console.log(`선택한 음식이 추가되었습니다. 수량은 ${selectedItemWithQuantity.quantity}개 입니다.`);
                    console.log(selectedItemList);

                    setSelectedItemQuantity(0);
                    setSelectedItem(null);
                } else {
                    console.log('음식이 선택되지 않았습니다.');
                }
            } else {
                console.log('선택한 음식이 없습니다.');
                setSelectedItem(null);
            }
        } catch (error) {
            console.error('에러가 발생하였습니다.', error);
        }
    };



        const [isButtonPressed, setButtonPressed] = useState(false);

        const handleButtonPress = () => {
            // 버튼이 눌렸을 때 실행할 로직 추가

            setButtonPressed(true);
        };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20, marginLeft: 10,marginTop:20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 25, marginRight: 180,fontWeight:"bold" }}>음식 검색</Text>
            <TouchableOpacity
                style={[
                    styles.buttonContainer,
                    isButtonPressed ? styles.buttonPressed : null,
                ]}
                onPress= {handleButton}
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: '', marginTop: 10 }}>
                    <Text style= {{marginRight: 100}}>칼로리: {selectedItem.calories} kcal</Text>

                                <TouchableOpacity onPress={() => setSelectedItemQuantity(selectedItemQuantity > 0 ? selectedItemQuantity - 1 : 0)}>
                                    <Text style={{marginHorizontal: 5}}>-</Text>
                                </TouchableOpacity>
                                <Text style={{marginHorizontal: 5}}>{selectedItemQuantity}</Text>
                                <TouchableOpacity onPress={() => setSelectedItemQuantity(selectedItemQuantity + 1)}>
                                    <Text style={{marginHorizontal: 5}}>+</Text>
                                </TouchableOpacity>

                    </View>

                    <Text>탄수화물: {selectedItem.carbs} g</Text>
                    <Text>지방: {selectedItem.fat} g</Text>
                    <Text>단백질: {selectedItem.protein} g</Text>
                    <Text>1회제공량: {selectedItem.servingSize} g</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: '', marginTop: 10 }}>
                     <TouchableOpacity onPress={() => setSelectedItem(null)}>
                        <Text style={{ marginTop: 10 }}>닫기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handleButtonPress();
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
        width: '85%', // 전체 너비의 85%를 사용
        borderColor: '#CCCCCC',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 25, // 입력창에 둥근 모서리 적용
        fontSize: 16, // 더 큰 글꼴 크기 사용
        color: '#333', // 입력 글꼴 색상 조정
    },
    resultItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF', // 각 아이템 배경색 추가
        marginTop: 2, // 아이템 간 간격 추가
    },
    itemDetailsContainer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 12, // 상세 정보 패널에 둥근 모서리 적용
        shadowOpacity: 0.1, // 그림자 효과 추가
        shadowRadius: 5,
        shadowColor: '#000000',
        shadowOffset: { height: 2, width: 2 },
    },
    buttonContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#2ecc71',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10, // 버튼 위치 조정
    },
    buttonPressed: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});


export default MenuSearch;