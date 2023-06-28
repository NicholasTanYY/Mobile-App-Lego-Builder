import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../TextComponent';
import PlayButtonComponent from '../PlayButtonComponent';
import Slider from '@react-native-community/slider';
import { handlePlayPause, handleVolumeChange } from '../../BE/MusicSettings';
import TrackPlayer, { State } from 'react-native-track-player';

const SettingsVolumeComponent = () => {
  const [volumeSlider, setVolumeSlider] = useState(50);
  const [isPlaying, setIsPlaying] = useState<Boolean>();

  useEffect(() => {
    async function checkMusic() {
      const isPlayingRightNow = await TrackPlayer.getState()
      if (isPlayingRightNow == State.Playing) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
    checkMusic();
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
