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
    ProfileRevise, Home, Menu, MenuSearch
} from '../screens';
import MainTab from "./MainTab";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title:'' }}/>
            <Stack.Screen name="ProfileProduction" component={ProfileProduction} options={{headerShown:false}} />
            <Stack.Screen name="MenuSelection" component={MenuSelection} options={{headerShown:false}} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="PostList" component={PostList} />
            <Stack.Screen name="GroupList" component={GroupList} />
            <Stack.Screen name="UserDelete" component={UserDelete} />
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }}/>
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
            <Stack.Screen name="MenuSearch" component={MenuSearch} />
        </Stack.Navigator>
    );
};

export default AuthStack;