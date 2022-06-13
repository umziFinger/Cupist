import React, { useEffect, useState } from 'react';
// eslint-disable-next-line react-native/split-platform-components
import { BackHandler, Platform, ToastAndroid, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';

import RNBootSplash from 'react-native-bootsplash';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { DATA_MENUS } from '@/Navigators/CustomTabBar/data';
import CustomText from '@/Components/CustomText';
import { AuthState } from '@/Stores/Auth/InitialState';
import { Color } from '@/Assets/Color';
import CommonActions from '@/Stores/Common/Actions';

const TabBar = (props: BottomTabBarProps) => {
  const { state } = props;
  const dispatch = useDispatch();
  const { userIdx } = useSelector((authState: AuthState) => authState.auth);
  const [appExit, setAppExit] = useState(false);
  const [backHandlerClickCount, setBackHandlerClickCount] = useState(0);

  useEffect(() => {
    RNBootSplash.hide().then();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackButtonPressAndroid = () => {
        console.log(' back : ', state.history);
        if (appExit) {
          BackHandler.exitApp();
          return false;
        } else if (state.history.length < 2) {
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'alertToast',
              data: {
                alertToast: true,
                alertToastPosition: 'bottom',
                alertToastMessage: '뒤로 버튼을 한번 더 누르시면 종료됩니다.',
              },
            }),
          );
          setAppExit(true);
          navigate('HomeScreen');
          return true;
        }

        return false;
      };
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
      }
      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid);
        }
      };
    }, [state.history, appExit]),
  );

  const renderIcon = <T extends React.ReactNode>(type: T) => {
    switch (type) {
      case 'HomeScreen':
        return state.index === 0
          ? require('@/Assets/Images/BottomTabBar/icBtHomeOn.png')
          : require('@/Assets/Images/BottomTabBar/icBtHomeOff.png');
      case 'MyScreen':
        return state.index === 1
          ? require('@/Assets/Images/BottomTabBar/icBtMyOn.png')
          : require('@/Assets/Images/BottomTabBar/icBtMyOff.png');
      case 'MyAroundScreen':
        return state.index === 2
          ? require('@/Assets/Images/BottomTabBar/icBtLocaOn.png')
          : require('@/Assets/Images/BottomTabBar/icBtLocaOff.png');
      case 'DibsScreen':
        return state.index === 3
          ? require('@/Assets/Images/BottomTabBar/icBtHeartOn.png')
          : require('@/Assets/Images/BottomTabBar/icBtHeartOff.png');
      case 'MoreScreen':
        return state.index === 4
          ? require('@/Assets/Images/BottomTabBar/icPlusOn.png')
          : require('@/Assets/Images/BottomTabBar/icPlusOff.png');

      default:
        return state.index === 0
          ? require('@/Assets/Images/BottomTabBar/icBtHomeOff.png')
          : require('@/Assets/Images/BottomTabBar/icBtHomeOn.png');
    }
  };
  const renderTextColor = <T extends React.ReactNode>(type: T) => {
    switch (type) {
      case 'HomeScreen':
        return state.index === 0 ? Color.Black1000 : Color.Gray400;
      case 'MyScreen':
        return state.index === 1 ? Color.Black1000 : Color.Gray400;
      case 'MyAroundScreen':
        return state.index === 2 ? Color.Black1000 : Color.Gray400;
      case 'DibsScreen':
        return state.index === 3 ? Color.Black1000 : Color.Gray400;
      case 'MoreScreen':
        return state.index === 4 ? Color.Black1000 : Color.Gray400;
      default:
        return state.index === 0 ? Color.Black1000 : Color.Gray400;
    }
  };

  const onPressMenu = (value: 'HomeScreen' | 'MyScreen' | 'MyAroundScreen' | 'DibsScreen' | 'MoreScreen') => {
    const authGuardScreen = ['MoreScreen', 'MyScreen', 'DibsScreen'];
    if (authGuardScreen.includes(value) && !userIdx) {
      navigate('SimpleLoginScreen');
      return;
    }
    navigate(value);
  };

  return (
    <View
      style={{
        backgroundColor: Color.White,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '100%',
        paddingBottom: Platform.select({ android: 0, ios: isIphoneX() ? getBottomSpace() : 0 }),
      }}
    >
      <View
        style={{
          width: '100%',
          position: 'absolute',
          backgroundColor: Color.White,
          borderColor: Color.Gray300,
          borderTopWidth: 1,
          top: -1,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      {state.routes.map((route: any, index: number) => {
        return (
          <CustomButton
            key={index.toString()}
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              backgroundColor: Color.White,
              paddingVertical: 6,
            }}
            onPress={() => onPressMenu(route.name)}
          >
            <View key={route.name} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 24, height: 24 }}>
                <FastImage
                  source={renderIcon(route.name)}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ marginTop: 2 }}>
                <CustomText style={{ fontSize: 10, letterSpacing: -0.1, color: renderTextColor(route.name) }}>
                  {DATA_MENUS[index].text}
                </CustomText>
              </View>
            </View>
          </CustomButton>
        );
      })}
    </View>
  );
};
export default TabBar;
