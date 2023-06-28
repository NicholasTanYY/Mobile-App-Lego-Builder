import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../AppNavigator';
import ButtonComponent from '../Assets/ButtonComponent';
import TextComponent from '../Assets/TextComponent';
import { handleExistingBuild, handleNewBuild, handleSettings } from '../BE/MainPage';
import { getBackgroundMusic } from '../BE/MusicSettings';
import TrackPlayer from 'react-native-track-player';

type MainPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = {
  navigation: MainPageNavigationProp;
};

const MainPage = ( {navigation} : Props ) => {

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
    <View style={styles.container}>
        <TextComponent type="textTitle" text="Welcome to the Main Page!"/>
        <ButtonComponent text="New Build" func={() => handleNewBuild(navigation)} />
        <ButtonComponent text="Existing Build" func={() => handleExistingBuild(navigation)} />
        <ButtonComponent text="Settings" func={() => handleSettings(navigation)}/>
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

export default MainPage;
