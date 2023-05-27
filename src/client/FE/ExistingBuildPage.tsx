import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../Assets/TextComponent';

const ExistingBuildPage = ({ route, navigation }) => {
  const { selectedLegoSet } = route.params;

  return (
    <View style={styles.container}>
      <TextComponent type="textTitle" text="Existing Project Screen" />
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
