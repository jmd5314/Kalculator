import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeStack_screens/Home';
import Menu from '../screens/MenuStack_screens/Menu';
import Post from '../screens/PostStack_screens/Post';
import Running from '../screens/RunningStack_screens/Running';
import Battle from '../screens/BattleStack_screens/Battle';
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
                    if(route.name === 'Home') name="home";
                    else if (route.name === 'Menu') name="menu-book";
                    else if (route.name === 'Post') name="article";
                    else if (route.name === 'Running') name="directions-run";
                    else name = 'groups';
                    return TabIcon({...props, name });
                },
                headerShown: false
            })}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarLabel: 'Home', headerShown: false }}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        // 화면을 리랜더링하려면 navigation.navigate를 호출합니다.
                        navigation.navigate('Home', { key: Math.random() });
                    },
                })}
            />
            <Tab.Screen 
                name="Menu"
                component={Menu}
                options={{ tabBarLabel: 'Menu',headerShown: false }}/>
            <Tab.Screen 
                name="Post"
                component={Post}
                options={{ tabBarLabel: 'Post' }}/>
            <Tab.Screen 
                name="Running"
                component={Running}
                options={{ tabBarLabel: 'Running' }}/>
            <Tab.Screen 
                name="Battle"
                component={Battle}
                options={{ tabBarLabel: 'Battle' }}/>
        </Tab.Navigator>
    );
};

export default MainTab;