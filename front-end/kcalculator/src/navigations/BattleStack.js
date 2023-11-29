import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Battle } from '../screens';

const Stack = createStackNavigator();

const BattleStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Battle" component={Battle} />
        </Stack.Navigator>
    );
};

export default BattleStack;