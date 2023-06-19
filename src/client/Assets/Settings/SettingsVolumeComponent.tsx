import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../TextComponent';
import PlayButtonComponent from '../PlayButtonComponent';
import Slider from '@react-native-community/slider';
import { handlePlayPause, handleVolumeChange } from '../../BE/SettingsPage';
import TrackPlayer, { State } from 'react-native-track-player';
import { setupPlayer, addTracks } from './TrackPlayerServices';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsVolumeComponent = () => {
  const [volumeSlider, setVolumeSlider] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextComponent type="textTitle" text="Adjust Music Volume" />
        <View style={styles.adjustablesContainer}>
          <View style={styles.playButtonContainer}>
            <PlayButtonComponent
              text={isPlaying ? 'Pause' : 'Play'}
              func={() =>
                handlePlayPause(isPlaying, setIsPlaying, TrackPlayer, State)
              }
            />
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={volumeSlider}
                onValueChange={value =>
                  handleVolumeChange(value, setVolumeSlider, TrackPlayer)
                }
              />
              <TextComponent type="text" text={'Volume: ' + volumeSlider} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  box: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustablesContainer: {
    flexDirection: 'row',
  },
  playButtonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  sliderContainer: {
    alignItems: 'center',
    flex: 1,
  },
  slider: {
    flex: 1,
    width: '80%',
  },
});

export default SettingsVolumeComponent;
