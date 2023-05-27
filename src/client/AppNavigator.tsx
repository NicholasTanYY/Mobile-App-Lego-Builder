import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomePage from './FE/HomePage';
import LoginPage from './FE/LoginPage';
import SettingsPage from './FE/SettingsPage';
import FAQPage from './FE/FAQPage';
import SignupPage from './FE/SignupPage';
import MainPage from './FE/MainPage';
import NewBuildPage from './FE/NewBuildPage';
import ExistingBuildPage from './FE/ExistingBuildPage';
import BuildPage from './FE/BuildPage';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Settings: undefined,
  FAQ: undefined,
  "Sign up": undefined,
  Main: undefined,
  "New Build": undefined,
  "Existing Build": undefined,
  Build: undefined
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
          <Stack.Screen name="Sign up" component={SignupPage} />
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="New Build" component={NewBuildPage} />
          <Stack.Screen name="Existing Build" component={ExistingBuildPage} />
          <Stack.Screen name="Build" component={BuildPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;