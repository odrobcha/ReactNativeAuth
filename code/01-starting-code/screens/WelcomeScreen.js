import {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token
  const [fetchedMessage, setFetchedMessage] = useState('');

  useEffect(()=>{
    axios.get(
      `https://react-native-course-49a03-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`,
      )
      .then(res =>{
       setFetchedMessage(res.data);
      })
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
