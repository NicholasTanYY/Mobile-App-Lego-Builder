import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { RootStackParamList } from '../AppNavigator';
import ButtonComponent from '../Assets/ButtonComponent';
import TextInputComponent from '../Assets/TextInputComponent';
import { handleSignup } from '../BE/SignupPage';

type SignupPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
type Props = {
  navigation: SignupPageNavigationProp;
};

const SignupPage = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={require('../Assets/images/lego_border.jpg')}
      style={styles.background_img}>
      <View style={styles.container}>
        <TextInputComponent
          placeholder="Username"
          func={setUsername}
          value={username}
        />
        <TextInputComponent
          placeholder="Password"
          func={setPassword}
          value={password}
        />
        <ButtonComponent
          text="Create account"
          func={() => handleSignup(username, password, navigation)}
        />
      </View>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default SignupPage;
