import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextComponent = ({type, text}) => {
  return type == "textTitle"
        ? <Text style={styles.textTitle}>{text}</Text>
        : type == "text"
        ? <Text style={styles.text}>{text}</Text>
        : <Text style={styles.subText}>{text}</Text>;
};

export const styles = StyleSheet.create({
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "black"
      },
      text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
      },
      subText: {
        fontSize: 16,
        marginLeft: 16,
        color: "black"
      },
});

export default TextComponent;