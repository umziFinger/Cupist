import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootSplash from 'react-native-bootsplash';
import MainNavigator from '@/Navigators/MainNavigator';
import { CommonState } from '@/Stores/Common/InitialState';
import OptimizationScreen from '@/Containers/Common/OptimizationScreen';
import PermissionScreen from '@/Containers/Auth/PermissionScreen';

const MainStack = createStackNavigator();
const OptimizationStack = createStackNavigator();
const PermissionStack = createStackNavigator();
/** ****************
 * codePushStatus 상태별 타입
 *
 * init : 최초 초기화
 * sync : 앱센터와 어플리케이션과 sync 작업
 * ing  : 코드푸쉬 내용 있으면 앱 다운로드 진행
 * end  : 코드푸쉬 작업 종료
 *
 ***************** */
const SwitchNavigator = () => {
  const { permissionYN = 'Y' } = useSelector((state: CommonState) => state.common);
  const { codePushStatus } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    const getStorage = async () => {
      setTimeout(() => {
        // 초기에 앱에서 체크용 storage
        AsyncStorage.setItem('splashStatus', 'end').then(() => console.log('splashStatus end'));
      }, 3000);
    };
    getStorage();
  }, []);

  const splashHide = async () => {
    await BootSplash.hide({ fade: true });
  };

  useEffect(() => {
    if (codePushStatus === 'ing') {
      splashHide().then(() => {
        console.log('코드 푸시 시작');
      });
    }
    if (codePushStatus === 'end') {
      splashHide().then(() => {
        console.log('코드 푸시 끝');
      });
    }
  }, [codePushStatus]);

  if (codePushStatus === 'ing') {
    return (
      <OptimizationStack.Navigator headerMode={'none'}>
        <OptimizationStack.Screen
          name="OptimizationScreen"
          component={OptimizationScreen}
          options={{
            animationEnabled: true,
          }}
        />
      </OptimizationStack.Navigator>
    );
  }

  if (permissionYN === 'Y') {
    return (
      <MainStack.Navigator headerMode={'none'}>
        <MainStack.Screen
          name="Main"
          component={MainNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <PermissionStack.Navigator headerMode={'none'}>
      <PermissionStack.Screen
        name="PermissionScreen"
        component={PermissionScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </PermissionStack.Navigator>
  );
};

export default SwitchNavigator;
