import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PermissionScreen from '@/Containers/Auth/PermissionScreen';
import WalkThroughScreen from '@/Containers/WalkThrough';
// import WalkThroughScreen from '@/Containers/Auth/WalkThroughScreen';

const PermissionStack = createStackNavigator();

const PermissionNavigator = () => {
  return (
    <PermissionStack.Navigator headerMode={'none'}>
      <PermissionStack.Screen name={'PermissionScreen'} component={PermissionScreen} />
      <PermissionStack.Screen name={'WalkThroughScreen'} component={WalkThroughScreen} />
    </PermissionStack.Navigator>
  );
};

export default PermissionNavigator;
