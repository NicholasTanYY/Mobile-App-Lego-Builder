import axios from 'axios';
import { load } from 'cheerio';
import { SERVER } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';

export const getBuildInstructions = async (build, setInstructions) => {
  try {
    const response = (
      await axios.get(`https://rebrickable.com/instructions/${build.set_num}`)
    ).data;
    const $ = load(response);
    const instructionsLink = `https://rebrickable.com${
      $('#content div.row a')
        .get()
        .map(x => $(x).attr('href'))[0]
    }`;
    setInstructions(instructionsLink);
  } catch (error) {
    console.error('Error getting instructions: ', error);
    throw error;
  }
};

export const goToPage = async (ref, build, pageNumber) => {
  ref.current.setPage(pageNumber);
  const username = await AsyncStorage.getItem('userData');
  const resp = await axios.post(`${SERVER}/api/updateBuildPage`, {
    username,
    build,
    pageNumber,
  });
  if (resp.data.error) {
    alert(resp.data.error);
    return;
  }
  return resp.data.data;
};

export const openCloseCamera = async (
  showCamera,
  setShowCamera,
  setCameraButtonText,
) => {
  await setShowCamera(!showCamera);
  if (showCamera) {
    setCameraButtonText('Open Camera');
    setShowCamera(false);
  } else {
    setCameraButtonText('Close Camera');
    setShowCamera(true);
  }
};
