import axios from "axios";
import { SERVER } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { State, AppKilledPlaybackBehavior, Capability, RepeatMode, Event } from 'react-native-track-player';

export const getBackgroundMusic = async () => {
    let username = await AsyncStorage.getItem("userData");
    const resp = await axios.post(`${SERVER}/api/getBackgroundMusic`, {username});
    if (resp.data.error) {
      alert(resp.data.error);
      return;
    }
    return resp.data.data;
}

export const setBackgroundMusic = async (isPlaying) => {
  let username = await AsyncStorage.getItem("userData");
  const resp = await axios.post(`${SERVER}/api/setBackgroundMusic`, {username, isPlaying});
  if (resp.data.error) {
    alert(resp.data.error);
    return;
  }
  return resp.data.data;  
}

export const pauseMusic = async () => {
  TrackPlayer.pause();
}

export const handlePlayPause = async (
  isPlaying,
  setIsPlaying,
  TrackPlayer,
  State,
) => {
  if ((await TrackPlayer.getState()) == State.Playing) {
    TrackPlayer.pause();
    setBackgroundMusic(false);
  } else {
    TrackPlayer.play();
    setBackgroundMusic(true);
  }
  setIsPlaying(!isPlaying);
};

export const handleVolumeChange = async (value, setFunc, TrackPlayer) => {
  let volume = Math.round(value);
  setFunc(volume);
  await TrackPlayer.setVolume(volume / 100);
};

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: require('../data/musicFiles/fluidity-100-ig-edit-4558.mp3'),
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
    },
    {
      id: '2',
      url: require('../data/musicFiles/penguinmusic-modern-chillout-future-calm-12641.mp3'),
      title: 'Modern Chillout',
      artist: 'penguinmusic',
      duration: 66,
    },
    {
      id: '3',
      url: require('../data/musicFiles/powerful-beat-121791.mp3'),
      title: 'Powerful Beat',
      artist: 'penguinmusic',
      duration: 73,
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });
}