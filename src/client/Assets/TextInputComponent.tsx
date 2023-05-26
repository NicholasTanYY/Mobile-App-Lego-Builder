import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const TextInputComponent = ({placeholder, func, value}) => {
  return <TextInput 
            style={styles.input}
            placeholder={placeholder}
            onChangeText={func}
            value={value}
            secureTextEntry={placeholder === "Password"
                                ? true
                                : false
                            } />
};

export const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 50,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
      },
});

export default TextInputComponent;