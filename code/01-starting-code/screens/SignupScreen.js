import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import React, {useState, useContext} from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
 const authCtx = useContext(AuthContext);


  const signupHandler = async ({email, password})=>{
    setIsAuthenticating(true);
    try{
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (e) {
      Alert.alert('Authentification failed');
      setIsAuthenticating(false);
    }
  };
  if(isAuthenticating){
    return (
      <LoadingOverlay message="Creating user..."/>
    )
  }

  return (
    <AuthContent onAuthenticate={signupHandler}/>
    );
}

export default SignupScreen;
