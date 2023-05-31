import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from '@env';
import axios from "axios";

export const handleBuild = (selectedBuild, navigation) => {
    navigation.navigate("Build");
}

export const getExistingCollection = async () => {
    const username = await AsyncStorage.getItem("userData");
    const resp = await axios.post(`${SERVER}/api/getExistingCollection`, {username});
      if (resp.data.error) {
        alert(resp.data.error);
        return;
      }
    return resp.data.collections;
}

export const removeBuild = async (selectedBuild, setSelectedBuild) => {
  const username = await AsyncStorage.getItem("userData");
  const resp = await axios.post(`${SERVER}/api/removeBuild`, {username, selectedBuild});
    if (resp.data.error) {
      alert(resp.data.error);
      return;
    }
    setSelectedBuild(null);
    alert(resp.data.data);
    return resp.data.data;
}