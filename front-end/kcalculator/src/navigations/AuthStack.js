import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, ProfileProduction, MenuSelection, TargetCalorie,
Profile,
             PostList,
             GroupList,
             UserDelete,
             ProfileRevise, MenuSearch,
             UpdateMenuSelection, UpdateTargetCalorie
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
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} options={{headerShown:false}} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="UserDelete" component={UserDelete} />
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} options={{headerShown:false}} />
            <Stack.Screen name="UpdateMenuSelection" component={UpdateMenuSelection} options={{headerShown:false}} />
            <Stack.Screen name="UpdateTargetCalorie" component={UpdateTargetCalorie} options={{headerShown:false}} />
            <Stack.Screen name="MenuSearch" component={MenuSearch} />
            <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default AuthStack;