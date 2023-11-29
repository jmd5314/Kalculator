import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Post } from '../screens';

const Stack = createStackNavigator();

const PostStack = () => {
    return(
        <Stack.Navigator  screenOptions={{  headerTitleAlign: 'center' }}>
             <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
    );
};

export default PostStack;