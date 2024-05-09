import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../config";
const backendUrl = config.backendUrl;

const RunHistory = ({ navigation }) => {
  const [runHistory, setRunHistory] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const fetchRunHistory = async () => {
      const token = await AsyncStorage.getItem('token'); // 사용자 인증을 위해 토큰을 가져옴
      if (!token) {
        console.log('Authentication token not found');
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/runningRecords/list`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch run history');
        }

        const data = await response.json();
        setRunHistory(data);
        calculateTotalCalories(data);
      } catch (error) {
        console.error('Error loading run history:', error);
      }
    };

    fetchRunHistory();
  }, []);

  const calculateTotalCalories = (data) => {
    const total = data.reduce((sum, record) => sum + (record.caloriesBurned || 0), 0);
    setTotalCalories(total);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>달리기 기록</Text>
        {runHistory.length === 0 ? (
            <Text style={styles.noDataText}>달리기 기록이 없습니다.</Text>
        ) : (
            <FlatList
                data={runHistory}
                keyExtractor={(item, index) => `run-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text style={styles.detail}>시간: {item.time.toFixed(2)} 시간</Text>
                      <Text style={styles.detail}>거리: {item.distance.toFixed(2)} km</Text>
                      <Text style={styles.detail}>칼로리: {item.caloriesBurned} kcal</Text>
                    </View>
                )}
            />
        )}
        <Text style={styles.totalCalories}>오늘 소모한 총 칼로리: {totalCalories} kcal</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
  totalCalories: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default RunHistory;