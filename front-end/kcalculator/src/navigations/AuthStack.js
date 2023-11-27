import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, ProfileProduction, MenuSelection, TargetCalorie } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerTitleAlign: 'center' }}/>
            <Stack.Screen name="ProfileProduction" component={ProfileProduction} />
            <Stack.Screen name="MenuSelection" component={MenuSelection} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} />
        </Stack.Navigator>
    );
};

export default AuthStack;