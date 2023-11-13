import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile, ProfileEdit, PostList, GroupList, UserDelete } from '../screens';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Profile" component={Profile} />
             <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
             <Stack.Screen name="PostList" component={PostList} />
             <Stack.Screen name="GroupList" component={GroupList} />
             <Stack.Screen name="UserDelete" component={UserDelete} />
        </Stack.Navigator>
    );
};

export default ProfileStack;