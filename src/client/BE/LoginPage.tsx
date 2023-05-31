import axios from 'axios';
import { ADMIN_USERNAME, ADMIN_PASSWORD, SERVER } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (username, password, navigation) => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    navigation.navigate('Main');
    return;
  }
  const resp = await axios.post(`${SERVER}/api/login`, {
    username,
    password,
  });
  if (resp.data.error) {
    alert(resp.data.error);
    return;
  }
  AsyncStorage.setItem("userData", username);
  navigation.navigate('Main');
  return;
};

export const handleSignup = async (navigation) => {
  navigation.navigate("Sign up");
}
