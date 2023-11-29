import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Running } from '../screens';

const Stack = createStackNavigator();

const RunningStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Running" component={Running} />
        </Stack.Navigator>
    );
};

export default RunningStack;