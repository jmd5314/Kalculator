import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile, PostList, GroupList, UserDelete, ProfileRevise } from '../screens';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Profile" component={Profile} />
             <Stack.Screen name="ProfileRevise" component={ProfileRevise} />
             <Stack.Screen name="PostList" component={PostList} />
             <Stack.Screen name="GroupList" component={GroupList} />
             <Stack.Screen name="UserDelete" component={UserDelete} />
        </Stack.Navigator>
    );
};

export default ProfileStack;