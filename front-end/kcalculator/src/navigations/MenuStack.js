import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Menu, MenuSearch } from '../screens';

const Stack = createStackNavigator();

const MenuStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
            <Stack.Screen name="Menu" component={Menu} options={{headerShown:false}}/>
            <Stack.Screen name="MenuSearch" component={MenuSearch} options={{headerShown:false}} />
        </Stack.Navigator>
    );
};

export default MenuStack;