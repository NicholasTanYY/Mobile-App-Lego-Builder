import { Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER } from '@env';
import axios from 'axios';
import { set } from 'react-native-reanimated';

export const handleChangeProfilePicture = () => {};

export const handleChangeUsernameOrPassword = async (
  username,
  password,
  setModalState,
) => {
  const currentUsername = await AsyncStorage.getItem('userData');
  const resp = await axios.post(`${SERVER}/api/changeUsernameOrPassword`, {
    currentUsername,
    username,
    password,
  });
  if (resp.data.error) {
    alert(resp.data.error);
    return;
  }
  await AsyncStorage.setItem('userData', resp.data.username);
  alert('Username/Password changed!');
  setModalState(false);
  return;
};

export const deleteAccount = navigation => {
  Alert.alert(
    'Delete Account',
    'Are you sure you want to delete your account?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const username = await AsyncStorage.getItem('userData');
          const resp = await axios.post(`${SERVER}/api/deleteAccount`, {
            username,
          });
          if (resp.data.error) {
            alert(resp.data.error);
            return;
          }
          alert('Account deleted');
          await AsyncStorage.clear();
          navigation.navigate('Home');
        },
      },
    ],
  );
};

export const handlePlayPause = async (
  isPlaying,
  setIsPlaying,
  TrackPlayer,
  State,
) => {
  if ((await TrackPlayer.getState()) == State.Playing) {
    TrackPlayer.pause();
  } else {
    TrackPlayer.play();
  }
  setIsPlaying(!isPlaying);
  // console.log(isPlaying ? 'paused' : 'playing');
};

export const handleVolumeChange = async (value, setFunc, TrackPlayer) => {
  let volume = Math.round(value);
  setFunc(volume);
  await TrackPlayer.setVolume(volume / 100);
  // console.log('volume: ' + volume);
};

export const openPhoneSettings = async () => {
  Linking.openSettings();
};
