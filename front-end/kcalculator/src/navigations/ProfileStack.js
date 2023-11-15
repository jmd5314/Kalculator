import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile, ProfileEdit, PostList, GroupList, UserDelete, ProfileProduction, MenuSelection, TargetCalorie } from '../screens';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Profile" component={Profile} />
             <Stack.Screen name="ProfileProduction" component={ProfileProduction} />
             <Stack.Screen name="PostList" component={PostList} />
             <Stack.Screen name="GroupList" component={GroupList} />
             <Stack.Screen name="UserDelete" component={UserDelete} />
             <Stack.Screen name="MenuSelection" component={MenuSelection} />
             <Stack.Screen name="TargetCalorie" component={TargetCalorie} />
        </Stack.Navigator>
    );
};

export default ProfileStack;