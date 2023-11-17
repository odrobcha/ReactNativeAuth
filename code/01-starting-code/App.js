import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();

function AuthStack () {
    return (
      <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignupScreen}/>
      </Stack.Navigator>
    );
}

function AuthenticatedStack () {
    const authCtx = useContext(AuthContext);
    return (
      <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
          <Stack.Screen name="Welcome"
                        component={WelcomeScreen}
                        options={{
                            headerRight: ({ tintColor }) => <IconButton icon="exit"
                                                                        color={tintColor}
                                                                        size={20}
                                                                        onPress={authCtx.logout}
                            />
                        }}
          />
      </Stack.Navigator>
    );
}

function Navigation () {

    const authCtx = useContext(AuthContext);
    return (

      <NavigationContainer>
          {!authCtx.isAuthenticated && <AuthStack/>}
          {authCtx.isAuthenticated && <AuthenticatedStack/>}

      </NavigationContainer>

    );
}
function Root(){
    const authCtx = useContext(AuthContext);
    const [tokenIsFetching, setTokenIsFetching] = useState(true);
    useEffect(()=>{
        const fetchToken = async ()=>{
            const storedToken = await AsyncStorage.getItem("token");// will return a PROMISE
            if (storedToken){
                authCtx.authenticate(storedToken)
            }
            setTokenIsFetching(false)

        }
        fetchToken();

    }, [])
    if (tokenIsFetching){
        return <LoadingOverlay message="Wait..."/>
    }
    return<Navigation/>
}
export default function App () {

    return (
      <>
          <StatusBar style="light"/>
          <AuthContextProvider>
              <Root/>
          </AuthContextProvider>
      </>
    );
}
