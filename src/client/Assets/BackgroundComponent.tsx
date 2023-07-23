import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export const LegoBorderBackground = ({ props }) => {
  return (
    <ImageBackground
      source={require('./Images/lego_border.jpg')}
      style={styles.background}>
      {props.children}
      {/* <View style={styles.container}>{children}</View> */}
    </ImageBackground>
  );
};

export const WhiteBackground = ({ props }) => {
  return (
    <ImageBackground
      source={require('./Images/white_lego_background.jpg')}
      style={styles.background}>
      {props.children}
      {/* <View style={styles.container}>{children}</View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
