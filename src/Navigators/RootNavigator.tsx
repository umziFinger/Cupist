import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { navigationRef } from '@/Services/NavigationService';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const routeNameRef = React.useRef();
  const dispatch = useDispatch();
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state: any) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName: any = navigationRef?.current?.getCurrentRoute()?.name;
        console.log('previousRouteName : ', previousRouteName);
        console.log('currentRouteName : ', currentRouteName);
        routeNameRef.current = currentRouteName;
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Startup" component={StartupContainer} /> */}
        {/* <Stack.Screen name="CodePush" component={CodePushContainer} /> */}
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
