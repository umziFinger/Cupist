import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import SwitchNavigator from '@/Navigators/SwitchNavigator';
import { navigationRef } from '@/Services/NavigationService';

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SwitchNavigator />
    </NavigationContainer>
  );
};
export default RootNavigator;
