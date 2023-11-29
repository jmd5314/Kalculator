import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GroupedBarChart, LineChart } from 'react-native-chart-kit';
/*
const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};
  // 막대 그래프 데이터
const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    legend: ['Data 1', 'Data 2', 'Data 3'],
    data: [
      [20, 45, 28, 80, 99, 43, 60], // Data 1
      [50, 80, 60, 45, 70, 55, 75], // Data 2
      [30, 60, 45, 75, 82, 62, 90], // Data 3
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'], // 각 데이터의 막대 색상
};

  // 선 그래프 데이터
const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [10, 25, 18, 40, 49, 33, 50], // Data for the line chart
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 선 색상
        strokeWidth: 2, // 선 두께
      },
    ],
};
*/

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons name="account-circle" size={50} />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
            <Text style={{ fontSize: 20, marginRight: 20 }}>일일 섭취 칼로리 kcal</Text>
            <Text style={{ fontSize: 20}}>남은 칼로리 kcal</Text>
        </View>
        <View>
            <Text style={{ fontSize: 20, marginBottom: 10}}>탄수화물 g/ g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10}}>단백질 g/ g</Text>
            <Text style={{ fontSize: 20, marginBottom: 10}}>지방 g/ g</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;