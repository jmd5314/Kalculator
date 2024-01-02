import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import { ProfileProduction,
             MenuSelection,
             TargetCalorie,
             Profile,
             UserDelete,
             ProfileRevise, MenuSearch,
             UpdateMenuSelection, UpdateTargetCalorie } from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator >
            <Stack.Screen name="Main" component={MainTab} options={{headerShown: false}}/>
            <Stack.Screen name="ProfileProduction" component={ProfileProduction} options={{headerShown:false}} />
            <Stack.Screen name="MenuSelection" component={MenuSelection} options={{headerShown:false}} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} options={{headerShown:false}} />
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
            <Stack.Screen name="UserDelete" component={UserDelete} />
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} options={{headerShown:false}} />
            <Stack.Screen name="UpdateMenuSelection" component={UpdateMenuSelection} options={{headerShown:false}} />
            <Stack.Screen name="UpdateTargetCalorie" component={UpdateTargetCalorie} options={{headerShown:false}} />
            <Stack.Screen name="MenuSearch" component={MenuSearch} options={{headerShown:false}} />
        </Stack.Navigator>
    );
};

export default MainStack;