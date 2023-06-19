import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// // Adding an icon to the button
// const PlayButtonComponent = ({ iconName, color, func }) => {
//   return (
//     <TouchableOpacity style={styles.button} onPress={func}>
//       <Icon name={iconName} size={24} color={color} />
//     </TouchableOpacity>
//   );
// };

const PlayButtonComponent = ({ text, func }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={func}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: '30%',
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PlayButtonComponent;
