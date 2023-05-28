import axios from 'axios';
import { PORT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleSearchBuild = async (legoID, setLegoSet, navigation) => {
  const resp = await axios.get(
    `https://rebrickable.com/api/v3/lego/sets/${legoID}`,
    {
      headers: {
        Authorization: `key 5513bf7824a3a30f9281f898490e97dc`,
      },
    },
  );
  setLegoSet(resp.data); // Set the state with new data
};

export const handleAddBuild = async (selectedLegoSet, navigation) => {
  let username = await AsyncStorage.getItem("userData");
  const resp = await axios.post(`http://10.0.2.2:${PORT}/api/addBuild`, {username, selectedLegoSet});
  if (resp.data.error) {
    alert(resp.data.error);
    return;
  }
  alert("Build added");
  navigation.navigate('Existing Build');
};
