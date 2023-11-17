import { useState,createContext,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',                                    //default value
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

function AuthContextProvider ({ children }) { //function responsible for managing Auth Context,and will be wrapper for the App.js (or component that need context)

   const [authToken, setAuthToken] = useState();


   function authenticate (token) {
       setAuthToken(token);
       AsyncStorage.setItem("token", token) //it has 2 arguments, 1 FieldName, 2 : value(has tobe String)
   };

   function logout () {
       setAuthToken(null);
       AsyncStorage.removeItem('token');

   }

   const value = {     //th valuewich will be available as AuthContext
       token: authToken,
       isAuthenticated: !!authToken,
       authenticate: authenticate,
       logout: logout

   };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
