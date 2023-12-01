import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: { token:null},
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ token }) => {
        setUser({ token });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };