import React from 'react';
//import { StatusBar } from 'react-native';
//import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/ProfileStack';

const App = () => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    );
};

export default App;