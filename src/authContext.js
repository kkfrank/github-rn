import React from 'react';

export const AuthContext = React.createContext({
    currentUser: null,
    setLoading: null,
    setCurrentUser: null
})
