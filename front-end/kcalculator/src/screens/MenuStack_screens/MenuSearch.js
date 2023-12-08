import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const MenuSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        {
          params: {
            query: searchText,
          },
          headers: {
          },
        }
      );

      const formattedResults = response.data.items.map((item) => ({
        id: item.id,
        title: item.title,
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error('검색 중 오류 발생:', error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={{ marginBottom: 10, marginLeft: 1 }}>
        <Text style={{ fontSize: 30 }}>음식 검색</Text>
        </View>
        <View style= {{ flexDirection: 'row', marginBottom: 10 }}>
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
            <View style={styles.resultItem}>
                <Text>{item.title}</Text>
            </View>
            )}
        />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MenuSearch;
