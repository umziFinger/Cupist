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
import { navigate, navigateAndSimpleReset, navigateReplace } from '@/Services/NavigationService';
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

  useEffect(() => {
    RNBootSplash.hide().then();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackButtonPressAndroid = () => {
        console.log(' back : ', state.history);

        if (!appExit) {
          if (state.history.length < 2) {
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
        } else if (appExit && state.history.length > 1) {
          setAppExit(false);
          return true;
        } else {
          BackHandler.exitApp();
          return false;
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
          ? require('@/Assets/Images/Cupist/Nav/home.png')
          : require('@/Assets/Images/Cupist/Nav/home.png');
      case 'LiveScreen':
        return state.index === 1
          ? require('@/Assets/Images/Cupist/Nav/live.png')
          : require('@/Assets/Images/Cupist/Nav/live.png');
      case 'StationScreen':
        return state.index === 2
          ? require('@/Assets/Images/Cupist/Nav/station.png')
          : require('@/Assets/Images/Cupist/Nav/station.png');
      case 'ConnectionScreen':
        return state.index === 3
          ? require('@/Assets/Images/Cupist/Nav/connection.png')
          : require('@/Assets/Images/Cupist/Nav/connection.png');
      case 'MoreScreen':
        return state.index === 4
          ? require('@/Assets/Images/Cupist/Nav/more.png')
          : require('@/Assets/Images/Cupist/Nav/more.png');

      default:
        return state.index === 0
          ? require('@/Assets/Images/Cupist/Nav/home.png')
          : require('@/Assets/Images/Cupist/Nav/home.png');
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
      // navigate('SimpleLoginScreen');
    }
    // navigate(value);
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
              paddingVertical: 16,
            }}
            onPress={() => onPressMenu(route.name)}
          >
            <View key={route.name} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 28, height: 28 }}>
                <FastImage
                  source={renderIcon(route.name)}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
        );
      })}
    </View>
  );
};
export default TabBar;
