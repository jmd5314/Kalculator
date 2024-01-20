import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, ProfileProduction, MenuSelection, TargetCalorie,
    Profile, UserDelete, ProfileRevise, MenuSearch,
    UpdateMenuSelection, UpdateTargetCalorie, FoodAddList, Post, PostRegister
} from '../screens';
import MainTab from "./MainTab";



const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title:'' }}/>
            <Stack.Screen name="ProfileProduction" component={ProfileProduction} options={{headerShown:false}} />
            <Stack.Screen name="MenuSelection" component={MenuSelection} options={{ title:'' }} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} options={{ title:'' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title:'' }}/>
            <Stack.Screen name="UserDelete" component={UserDelete} options={{ title:'' }}/>
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} options={{ title:'' }} />
            <Stack.Screen name="UpdateMenuSelection" component={UpdateMenuSelection} options={{ title:'' }} />
            <Stack.Screen name="UpdateTargetCalorie" component={UpdateTargetCalorie} options={{ title:'' }} />
            <Stack.Screen name="MenuSearch" component={MenuSearch} options={{ title:'' }}/>
            <Stack.Screen name="FoodAddList" component={FoodAddList} options={{ title:'' }} initialParams={{ selectedItemList: [] }}/>
            <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }}/>
           <Stack.Screen name="Post" component={Post} options={{ headerShown: false }}/>
           <Stack.Screen name="PostRegister" component={PostRegister} options={{ headerShown: false }}/>

        </Stack.Navigator>
    );
};

export default AuthStack;