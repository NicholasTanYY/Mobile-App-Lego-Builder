import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../Assets/TextComponent';
import ButtonComponent from '../Assets/ButtonComponent'
import {handleBuild} from '../BE/ExistingBuildPage';

const ExistingBuildPage = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <TextComponent type="textTitle" text="Existing Build Screen"/>
        <ButtonComponent text="Let's start building!" func={() => handleBuild(navigation)} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExistingBuildPage;
