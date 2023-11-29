import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Menu } from '../screens';

const Stack = createStackNavigator();

const MenuStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Menu" component={Menu} />
        </Stack.Navigator>
    );
};

export default MenuStack;