import AsyncStorage from "@react-native-async-storage/async-storage";
import { PORT } from '@env';
import axios from "axios";

export const handleBuild = (navigation) => {
    navigation.navigate("Build");
}

export const getExistingCollection = async () => {
    const username = await AsyncStorage.getItem("userData");
    const resp = await axios.post(`http://10.0.2.2:${PORT}/api/getExistingCollection`, {username});
      if (resp.data.error) {
        alert(resp.data.error);
        return;
      }
    return resp.data.collections;
}