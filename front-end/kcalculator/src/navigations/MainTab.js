import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MenuStack from './MenuStack';
import PostStack from './PostStack';
import RunningStack from './RunningStack';
import BattleStack from './BattleStack';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, size, color }) => {
    return <MaterialIcons name={name} size={size} color={color} />
};

const MainTab = () => {
    return (
        <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: props => {
                    let name = ''
                    if(route.name === 'HomeStack') name="home";
                    else if (route.name === 'MenuStack') name="menu-book";
                    else if (route.name === 'PostStack') name="article";
                    else if (route.name === 'RunningStack') name="directions-run";
                    else name = 'groups';
                    return TabIcon({...props, name });
                },
                headerShown: false
            })}>
            <Tab.Screen 
                name="HomeStack" 
                component={HomeStack} 
                options={{ tabBarLabel: 'Home',headerShown: false}}/>
            <Tab.Screen 
                name="MenuStack" 
                component={MenuStack} 
                options={{ tabBarLabel: 'Menu',headerShown: false }}/>
            <Tab.Screen 
                name="PostStack" 
                component={PostStack} 
                options={{ tabBarLabel: 'Post' }}/>
            <Tab.Screen 
                name="RunningStack" 
                component={RunningStack} 
                options={{ tabBarLabel: 'Running' }}/>
            <Tab.Screen 
                name="BattleStack" 
                component={BattleStack} 
                options={{ tabBarLabel: 'Battle' }}/>
        </Tab.Navigator>
    );
};

export default MainTab;