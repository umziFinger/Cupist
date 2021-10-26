import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchNavigator from '@/Navigators/SwitchNavigator';
import { navigationRef } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import SplashScreen from '@/Containers/Splash/SplashScreen';
import OptimizationScreen from '@/Containers/Common/OptimizationScreen';
import CommonActions from '@/Stores/Common/Actions';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { codePushStatus } = useSelector((state: CommonState) => state.common);
  const [loading, setLoading] = useState('start');

  useEffect(() => {
    const getStorage = async () => {
      setTimeout(() => {
        // 초기에 앱에서 체크용 storage
        AsyncStorage.setItem('splashStatus', 'end').then(() => console.log('splashStatus end'));
        // 코드푸시에서 체크용 리듀서
        dispatch(CommonActions.fetchCommonReducer({ type: 'splashStart', data: 'end' }));
        // root navigator에서 체크용 state
        setLoading('end');
      }, 3000);
    };

    getStorage();
  }, []);

  if (loading === 'start') {
    return <SplashScreen />;
  }
  if (codePushStatus === 'ing') {
    return <OptimizationScreen />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SwitchNavigator />
    </NavigationContainer>
  );
};
export default RootNavigator;
