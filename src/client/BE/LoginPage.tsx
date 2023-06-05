import axios from 'axios';
import { SERVER } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (username, password, navigation) => {
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
