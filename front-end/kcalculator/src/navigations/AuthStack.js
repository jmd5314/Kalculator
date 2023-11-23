import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerTitleAlign: 'center' }}/>
        </Stack.Navigator>
    );
};

export default AuthStack;