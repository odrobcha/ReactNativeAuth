import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const signinHandler = async ({email, password})=>{
    setIsAuthenticating(true);
    try{
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch(error) {
      Alert.alert('Authentification failed');
      setIsAuthenticating(false);
    }

  };

  if(isAuthenticating){
    return <LoadingOverlay message='Looging in...' />
  }
  return <AuthContent isLogin onAuthenticate={signinHandler}/>;
}

export default LoginScreen;
