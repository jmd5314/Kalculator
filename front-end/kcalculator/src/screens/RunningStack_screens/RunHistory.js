import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RunHistory = ({navigation}) => {
  const [runHistory, setRunHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);

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

  const groupDataByDate = () => {
    const groupedData = runHistory.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    return groupedData;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text>Time: {item.time}</Text>
      <Text>Distance: {item.distance} km</Text>
    </TouchableOpacity>
  );

  const renderGroupedData = () => {
    const groupedData = groupDataByDate();
    const dataArray = Object.entries(groupedData).map(([date, data]) => ({
      date,
      data,
    }));

    return (
      <FlatList
        data={selectedDate ? groupedData[selectedDate] : dataArray.flatMap((group) => group.data)}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => renderItem({ item })}
      />
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setCalendarModalVisible(false);
  };

  const toggleCalendarModal = () => {
    setCalendarModalVisible(!isCalendarModalVisible);
  };


  return (
    <View style={styles.container}>
        <Text style={styles.title}>달리기 기록</Text>
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
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default RunHistory;