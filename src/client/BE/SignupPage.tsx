import axios from "axios";
import { SERVER } from '@env';

export const handleSignup = async (username, password, navigation) => {
    const resp = await axios.post(`${SERVER}/api/signup`, {username, password});
    if (resp.data.error) {
        alert(resp.data.error);
        return;
    }
    alert(resp.data.data);
    navigation.navigate("Login");
}