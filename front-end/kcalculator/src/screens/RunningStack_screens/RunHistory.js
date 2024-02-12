import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RunHistory = ({ navigation }) => {
  const [runHistory, setRunHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const loadRunHistory = async () => {
      try {
        const savedData = await AsyncStorage.getItem('runData');
        const data = savedData ? JSON.parse(savedData) : [];
        setRunHistory(data);
      } catch (error) {
        console.error('Error loading run history:', error);
      }
    };
  
    // 화면이 focus될 때마다 저장된 데이터를 불러옴
    const unsubscribe = navigation.addListener('focus', () => {
      loadRunHistory();
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const groupDataByDate = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    return groupedData;
  };

  const renderGroupedData = () => {
    const groupedData = groupDataByDate(runHistory);

    return (
      <FlatList
        data={Object.entries(groupedData)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const date = item[0]; // 날짜
          const data = item[1]; // 해당 날짜에 대한 데이터 배열

          return (
            <View style={styles.item}>
              <Text style={styles.date}>{date}</Text>
              {data.map((item, index) => (
                <View key={index} style={styles.dataItem}>
                  <Text style={{fontSize: 16}}>Time: {item.time}</Text>
                  <Text style={{fontSize: 16}}>Distance: {item.distance} km</Text>
                </View>
              ))}
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, marginLeft: 15, marginBottom: 10}}>달리기 기록</Text>
      {runHistory.length === 0 ? (
        <Text>No run history available</Text>
      ) : (
        renderGroupedData()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  dataItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    marginBottom: 5,
  },
});

export default RunHistory;