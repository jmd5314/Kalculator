import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { Spinner } from '../components';
import { ProgressContext, UserContext } from '../contexts';
//import MainStack from './MainStack';
import { ProfileProductionStack } from './ProfileProductionStack';

const Navigation = () => {
    const { inProgress } = useContext(ProgressContext);
    const { user } = useContext(UserContext);

    return (
        <NavigationContainer>
            {user?.uid && user?.id ? <ProfileProductionStack /> : <AuthStack />}
            {inProgress && <Spinner />}
        </NavigationContainer>
/*
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
*/     
    );
};

export default Navigation;