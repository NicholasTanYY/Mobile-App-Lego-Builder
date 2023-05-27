import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNavigator';
import ButtonComponent from '../Assets/ButtonComponent';
import TextComponent from '../Assets/TextComponent';
import { handleFAQ, handleLogin, handleSignup } from '../BE/HomePage';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
  navigation: HomePageNavigationProp;
};

const HomePage = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <TextComponent type="textTitle" text="Welcome to the Home Screen!" />
      <ButtonComponent text="Login" func={() => handleLogin(navigation)} />
      <ButtonComponent text="Signup" func={() => handleSignup(navigation)} />
      <ButtonComponent text="FAQ" func={() => handleFAQ(navigation)} />
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

export default HomePage;