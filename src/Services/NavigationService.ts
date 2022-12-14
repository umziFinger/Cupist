import React from 'react';
import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainStackParamList } from '@/Navigators/MainNavigator';

export const navigationRef = React.createRef<NavigationContainerRef<MainStackParamList>>();

export function navigate(name: keyof MainStackParamList, params?: MainStackParamList[keyof MainStackParamList]) {
  AsyncStorage.setItem('currentScreen', name);

  navigationRef.current?.navigate(name, params);
  // console.log('네이게이터 푸시');
  // navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function navigateReplace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function navigateGoBack() {
  navigationRef.current?.goBack();
}

export function navigateAndReset(name: string, index = 0) {
  navigationRef.current?.dispatch((state: any) => {
    const tempRoutes = [];
    const routes = state.routes.filter((r) => {
      if (r.name === 'Bottom') {
        return r;
      }
      if (r.name === name) {
        return r;
      }
    });
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
}

export function navigateAndJoinReset(name: string, index = 0) {
  navigationRef.current?.dispatch((state: any) => {
    const routes = state.routes.filter((r) => {
      if (r.name === 'Bottom') {
        return r;
      }
      if (r.name === 'SimpleLoginScreen') {
        return r;
      }
      if (r.name === name) {
        return r;
      }
    });
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
}

export function navigateAndSimpleReset(name: string, index = 0) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes: [{ name }],
    }),
  );
}
