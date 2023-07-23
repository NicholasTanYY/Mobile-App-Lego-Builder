import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { RootStackParamList } from '../AppNavigator';
import ButtonComponent from '../Assets/ButtonComponent';
import TextComponent from '../Assets/TextComponent';
import {
  handleExistingBuild,
  handleNewBuild,
  handleSettings,
} from '../BE/MainPage';
import { getBackgroundMusic } from '../BE/MusicSettings';
import TrackPlayer from 'react-native-track-player';

type MainPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = {
  navigation: MainPageNavigationProp;
};

const MainPage = ({ navigation }: Props) => {
  useEffect(() => {
    async function setup() {
      const backgroundMusicStatus = await getBackgroundMusic();
      if (backgroundMusicStatus) {
        TrackPlayer.play();
      }
    }
    setup();
  }, []);

  return (
    <ImageBackground
      source={require('../Assets/images/lego_border.jpg')}
      style={styles.background_img}>
      <View style={styles.container}>
        <ButtonComponent
          text="New Build"
          func={() => handleNewBuild(navigation)}
        />
        <ButtonComponent
          text="Existing Build"
          func={() => handleExistingBuild(navigation)}
        />
        <ButtonComponent
          text="Settings"
          func={() => handleSettings(navigation)}
        />
      </View>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default MainPage;
