import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Login,
    Signup,
    ProfileProduction,
    MenuSelection,
    TargetCalorie,
    Profile,
    PostList,
    GroupList,
    UserDelete,
    ProfileRevise
} from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerTitleAlign: 'center' }}/>
            <Stack.Screen name="ProfileProduction" component={ProfileProduction} />
            <Stack.Screen name="MenuSelection" component={MenuSelection} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="PostList" component={PostList} />
            <Stack.Screen name="GroupList" component={GroupList} />
            <Stack.Screen name="UserDelete" component={UserDelete} />
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} />
        </Stack.Navigator>
    );
};

export default AuthStack;