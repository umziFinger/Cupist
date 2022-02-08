import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { navigationRef } from '@/Services/NavigationService';
import CodePushContainer from './CodePushContainer';
import StartupContainer from './StartupContainer';
import MainNavigator from './MainNavigator';
import PermissionNavigator from './PermissionNavigator';
import AuthActions from '@/Stores/Auth/Actions';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const routeNameRef = React.useRef();
  const dispatch = useDispatch();
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state: any) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
        console.log('previousRouteName : ', previousRouteName);
        console.log('currentRouteName : ', currentRouteName);

        // 일반 가입 시 socialType 초기화 안되는 현상때문에 추가함
        if (currentRouteName === 'SimpleLoginScreen') {
          dispatch(AuthActions.fetchAuthReducer({ type: 'socialType', data: '' }));
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={StartupContainer} />
        <Stack.Screen name="CodePush" component={CodePushContainer} />
        <Stack.Screen
          name="Permission"
          component={PermissionNavigator}
          options={{
            animationEnabled: false,
          }}
        />
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
