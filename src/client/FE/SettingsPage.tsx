import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from '../Assets/ButtonComponent';
import { openPhoneSettings } from '../BE/SettingsPage';
import SettingsVolumeComponent from '../Assets/Settings/SettingsVolumeComponent';
import SettingsAccountComponent from '../Assets/Settings/SettingsAccountComponent';
import PictureComponent from '../Assets/PictureComponent';
import { RootStackParamList } from '../AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type SettingsPageNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
type Props = {
  navigation: SettingsPageNavigationProp;
};

const SettingsPage = ({ navigation }: Props) => {

  return (
    <View style={styles.container}>
      <PictureComponent />
      <SettingsAccountComponent navigation={navigation} />
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
