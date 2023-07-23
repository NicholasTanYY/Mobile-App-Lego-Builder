import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextComponent = ({ type, text }) => {
  return type == 'mainHeading' ? (
    <Text style={styles.mainHeading}>{text}</Text>
  ) : type == 'textTitle' ? (
    <Text style={styles.textTitle}>{text}</Text>
  ) : type == 'text' ? (
    <Text style={styles.text}>{text}</Text>
  ) : (
    <Text style={styles.subText}>{text}</Text>
  );
};

export const styles = StyleSheet.create({
  mainHeading: {
    fontFamily: 'monospace',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  textTitle: {
    // fontFamily: 'LondrinaSolid-Regular',
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    fontSize: 16,
    marginLeft: 16,
    color: 'black',
  },
});

export default TextComponent;
