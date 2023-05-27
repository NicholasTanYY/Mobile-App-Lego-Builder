import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../AppNavigator';
import ButtonComponent from '../Assets/ButtonComponent';
import TextInputComponent from '../Assets/TextInputComponent';
import { handleLogin, handleSignup } from '../BE/LoginPage';
import TouchableTextComponent from '../Assets/TouchableTextComponent';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginPage = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInputComponent placeholder="Username" func={setUsername} value={username} />
      <TextInputComponent placeholder="Password" func={setPassword} value={password} />
      <ButtonComponent text="Login" func={() => handleLogin(username, password, navigation)} />
      <TouchableTextComponent text="Don't have an account? Sign up here!" func={() => handleSignup(navigation)}/>
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

export default LoginPage;