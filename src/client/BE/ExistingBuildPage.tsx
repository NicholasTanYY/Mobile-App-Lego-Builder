import AsyncStorage from "@react-native-async-storage/async-storage";
import { PORT } from '@env';
import axios from "axios";

export const handleBuild = (selectedBuild, navigation) => {
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

export const removeBuild = async (selectedBuild, setSelectedBuild) => {
  const username = await AsyncStorage.getItem("userData");
  const resp = await axios.post(`http://10.0.2.2:${PORT}/api/removeBuild`, {username, selectedBuild});
    if (resp.data.error) {
      alert(resp.data.error);
      return;
    }
    setSelectedBuild(null);
    alert(resp.data.data);
    return resp.data.data;
}