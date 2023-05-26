import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TextComponent from '../Assets/TextComponent';
import ButtonComponent from '../Assets/ButtonComponent';
import { handleVolumeChange, openPhoneSettings } from '../BE/SettingsPage';

const SettingsPage = () => {
  const [volume, setVolume] = useState(50);

  return (
    <View style={styles.container}>
      <TextComponent type="textTitle" text="Adjust Music Volume" />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={volume}
        onValueChange={(value) => handleVolumeChange(value, setVolume)}
      />
      <TextComponent type="text" text={"Volume: " + volume} />
      <ButtonComponent text="Open Settings" func={openPhoneSettings} />
    </View>
  );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: '80%',
        marginBottom: 20,
      }
});

export default SettingsPage;
