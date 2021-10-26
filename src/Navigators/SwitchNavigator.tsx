import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from '@/Navigators/MainNavigator';
import SplashScreen from '@/Containers/Splash/SplashScreen';
import { CommonState } from '@/Stores/Common/InitialState';
import OptimizationScreen from '@/Containers/Common/OptimizationScreen';

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
  const { permissionYN } = useSelector((state: CommonState) => state.common);

  // if (permissionYN === 'Y') {
  //   return (
  //     <MainStack.Navigator headerMode={'none'}>
  //       <MainStack.Screen
  //         name="Main"
  //         component={MainNavigator}
  //         options={{
  //           animationEnabled: false,
  //         }}
  //       />
  //     </MainStack.Navigator>
  //   );
  // }
  // return (
  //   <PermissionStack.Navigator headerMode={'none'}>
  //     <PermissionStack.Screen
  //       name="PermissionScreen"
  //       component={PermissionScreen}
  //       options={{
  //         animationEnabled: false,
  //       }}
  //     />
  //   </PermissionStack.Navigator>
  // );
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
};

export default SwitchNavigator;
