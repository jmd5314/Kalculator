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
            <Stack.Screen name="MenuSelection" component={MenuSelection} options={{ title:'' }} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} options={{ title:'' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title:'' }} />
            <Stack.Screen name="UserDelete" component={UserDelete} options={{ title:'' }}/>
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} options={{ title:'' }} />
            <Stack.Screen name="UpdateMenuSelection" component={UpdateMenuSelection} options={{ title:'' }} />
            <Stack.Screen name="UpdateTargetCalorie" component={UpdateTargetCalorie} options={{ title:'' }} />
            <Stack.Screen name="MenuSearch" component={MenuSearch} options={{ title:'' }} />
        </Stack.Navigator>
    );
};

export default MainStack;