import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextComponent from '../TextComponent';
import Slider from '@react-native-community/slider';
import { handleVolumeChange } from '../../BE/SettingsPage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsVolumeComponent = () => {
    const [volume, setVolume] = useState(50);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TextComponent type="textTitle" text="Adjust Music Volume" />
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={volume}
                        onValueChange={(value) => handleVolumeChange(value, setVolume)}
                    />
                <TextComponent type="text" text={"Volume: " + volume} />
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
    alignItems: 'center'
  },
  slider: {
    width: '100%'
  }
});

export default SettingsVolumeComponent;