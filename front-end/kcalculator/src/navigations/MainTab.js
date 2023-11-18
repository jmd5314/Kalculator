import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HoemStack';
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
                    if(route.name === 'Home') name="main";
                    else if (route.name === 'MenuStack') name="menu";
                    else if (route.name === 'PostStack') name="post";
                    else if (route.name === 'RunningStack') name="running";
                    else name = 'battle';
                    return TabIcon({...props, name });
                },
                headerShown: false
            })}>
            <Tab.Screen 
                name="HomeStack" 
                component={HomeStack} 
                options={{ tabBarLabel: 'Home' }}/>
            <Tab.Screen 
                name="MenuStack" 
                component={SearchStack} 
                options={{ tabBarLabel: 'Menu' }}/>
            <Tab.Screen 
                name="PostStack" 
                component={FriendStack} 
                options={{ tabBarLabel: 'Post' }}/>
            <Tab.Screen 
                name="RunningStack" 
                component={MypageStack} 
                options={{ tabBarLabel: 'running' }}/>
            <Tab.Screen 
                name="BattleStack" 
                component={MypageStack} 
                options={{ tabBarLabel: 'battle' }}/>
        </Tab.Navigator>
    );
};

export default MainTab;