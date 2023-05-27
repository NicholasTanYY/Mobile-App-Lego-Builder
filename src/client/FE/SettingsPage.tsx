import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from '../Assets/ButtonComponent';
import { openPhoneSettings } from '../BE/SettingsPage';
import SettingsVolumeComponent from '../Assets/Settings/SettingsVolumeComponent';
import SettingsAccountComponent from '../Assets/Settings/SettingsAccountComponent';
import PictureComponent from '../Assets/PictureComponent';

const SettingsPage = () => {

  return (
    <View style={styles.container}>
      <PictureComponent />
      <SettingsAccountComponent />
      <SettingsVolumeComponent />
      <ButtonComponent text="Open Settings" func={openPhoneSettings} />
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

export default SettingsPage;
