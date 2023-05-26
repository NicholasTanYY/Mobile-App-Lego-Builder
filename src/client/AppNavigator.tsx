import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomePage from './FE/HomePage';
import LoginPage from './FE/LoginPage';
import SettingsPage from './FE/SettingsPage';
import FAQPage from './FE/FAQPage';
import SignupPage from './FE/SignupPage';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Settings: undefined,
  FAQ: undefined,
  Signup: undefined
};

const AppNavigator = () => {

  const Stack = createStackNavigator<RootStackParamList>();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Settings" component={SettingsPage} />
          <Stack.Screen name="FAQ" component={FAQPage} />
          <Stack.Screen name="Signup" component={SignupPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;