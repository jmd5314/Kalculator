import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider  } from 'styled-components/native';
import Navigation from './navigations';
import { theme } from './theme';
import { ProgressProvider, UserProvider } from './contexts';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProgressProvider>
                    <StatusBar barStyle="dark-content" />
                    <Navigation />
                </ProgressProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

export default App;