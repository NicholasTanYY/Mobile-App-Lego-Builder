import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonComponent = ({text, func}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={func}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
    button: {
      marginTop: 10,
      width: '80%',
      backgroundColor: 'blue',
      paddingVertical: 10,
      borderRadius: 15,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
    },
});

export default ButtonComponent;