import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { DATA_MENUS } from '@/Navigators/CustomTabBar/data';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { Color } from '@/Assets/Color';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = (props: TabBarProps) => {
  const dispatch = useDispatch();
  const { state, descriptors, navigation } = props;
  const { userIdx } = useSelector((authState: AuthState) => authState.auth);
  const [backHandlerClickCount, setBackHandlerClickCount] = useState(0);

  useEffect(() => {
    // const onBackButtonPressAndroid = () => {
    //   console.log('navigation : ', navigation);
    //   console.log('state : ', state);
    //   setBackHandlerClickCount(backHandlerClickCount + 1);
    //   if (backHandlerClickCount < 1) {
    //     ToastAndroid.show('뒤로 버튼을 한번 더 누르시면 종료됩니다.', 2000);
    //   } else {
    //     BackHandler.exitApp();
    //   }
    //
    //   setTimeout(() => {
    //     setBackHandlerClickCount(0);
    //   }, 2000);
    //
    //   return true;
    // };
    //
    // if (Platform.OS === 'android') {
    //   BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
    // }

    // histroy[]의 최초 length = 1
    if (state.history.length > 1) {
      const prevMenu = state.history[state.history.length - 2].key.split('-')[0];
      const currMenu = state.routeNames[state.index];
      if (prevMenu !== currMenu) {
        // if (backHandler) {
        //   backHandler.remove();
        // }
      }
      console.log('prev Menu : ', state.history[state.history.length - 2].key.split('-')[0]);
      console.log('curr Menu : ', state.routeNames[state.index]);
    }

    return () => {
      // if (backHandler) backHandler.remove();
    };
  }, [backHandlerClickCount, state.index, userIdx]);

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

  const onPressMenu = (value: string) => {
    const authGuardScreen = ['MoreScreen', 'MyScreen'];
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
