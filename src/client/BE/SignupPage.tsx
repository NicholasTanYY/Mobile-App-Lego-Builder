import axios from "axios";
import {PORT} from '@env';

export const handleSignup = async (username, password, navigation) => {
    const resp = await axios.post(`http://10.0.2.2:${PORT}/api/signup`, {username, password});
    if (resp.data.error) {
        alert(resp.data.error);
        return;
    }
    alert(resp.data.data);
    navigation.navigate("Login");
}