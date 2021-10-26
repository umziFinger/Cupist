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

const height = Platform.select({ android: 80, ios: isIphoneX() ? getBottomSpace() + 48 : 80 });

const TabBar = (props: TabBarProps) => {
  const { state, descriptors, navigation } = props;

  const dispatch = useDispatch();
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
          ? require('@/Assets/Images/BottomTabBar/icHomeOn.png')
          : require('@/Assets/Images/BottomTabBar/icHomeOff.png');
      case 'MyScreen':
        return state.index === 1
          ? require('@/Assets/Images/BottomTabBar/icMyOn.png')
          : require('@/Assets/Images/BottomTabBar/icMyOff.png');

      default:
        return state.index === 0
          ? require('@/Assets/Images/BottomTabBar/icHomeOff.png')
          : require('@/Assets/Images/BottomTabBar/icHomeOn.png');
    }
  };
  const renderTextColor = <T extends React.ReactNode>(type: T) => {
    switch (type) {
      case 'HomeScreen':
        return state.index === 0 ? Color.Primary1000 : Color.Gray800;
      case 'RepairScreen':
        return state.index === 1 ? Color.Primary1000 : Color.Gray800;
      case 'RepairBridge':
        return state.index === 2 ? Color.Primary1000 : Color.Gray800;
      case 'RentScreen':
        return state.index === 3 ? Color.Primary1000 : Color.Gray800;
      case 'MyScreen':
        return state.index === 4 ? Color.Primary1000 : Color.Gray800;
      default:
        return state.index === 0 ? Color.Primary1000 : Color.Gray800;
    }
  };

  const onPressMenu = (value: string) => {
    // if (value === 'MyScreen' && !userIdx) {
    //   dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: true }));
    //   return;
    // }
    navigate(value);
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        // paddingTop: 13,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '100%',
        height,
        // borderColor: '#c2c2c2',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 16,
          position: 'absolute',
          backgroundColor: '#ffffff',
          top: -16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderColor: '#c2c2c2',
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
        }}
      />
      {state.routes.map((route: any, index: number) => {
        // const { options } = descriptors[route.key];
        return (
          <CustomButton
            key={index.toString()}
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              borderRadius: 24,
              backgroundColor: Color.White,
            }}
            onPress={() => onPressMenu(route.name)}
          >
            <View key={route.name} style={{ alignItems: 'center' }}>
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
              <View style={{ marginTop: 8 }}>
                <CustomText
                  style={{ fontSize: 11, fontWeight: '500', letterSpacing: -0.28, color: renderTextColor(route.name) }}
                >
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
