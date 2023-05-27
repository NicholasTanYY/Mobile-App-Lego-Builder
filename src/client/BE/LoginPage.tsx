import axios from "axios";
import {ADMIN_USERNAME, ADMIN_PASSWORD, PORT} from '@env';

export const handleLogin = async (username, password, navigation) => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      navigation.navigate("Main");
      return;
  }
  const resp = await axios.post(`http://10.0.2.2:${PORT}/api/login`, {username, password});
  if (resp.data.error) {
    alert(resp.data.error);
    return;
  }
  navigation.navigate("Main");
  return;
}

export const handleSignup = async (navigation) => {
  navigation.navigate("Signup");
}