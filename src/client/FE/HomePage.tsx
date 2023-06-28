import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNavigator';
import ButtonComponent from '../Assets/ButtonComponent';
import TextComponent from '../Assets/TextComponent';
import { handleFAQ, handleLogin, handleSignup } from '../BE/HomePage';
import { addTracks, pauseMusic, setupPlayer } from '../BE/MusicSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';
import { useIsFocused } from '@react-navigation/native';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
  navigation: HomePageNavigationProp;
};

const HomePage = ({navigation}: Props) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    async function clearState() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      pauseMusic();
      AsyncStorage.clear();
    }
    clearState();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TextComponent type="textTitle" text="Welcome to the Home Screen!" />
      <ButtonComponent text="Login" func={() => handleLogin(navigation)} />
      <ButtonComponent text="Signup" func={() => handleSignup(navigation)} />
      <ButtonComponent text="FAQ" func={() => handleFAQ(navigation)} />
    </View>
  );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HomePage;