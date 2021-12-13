import React, { useEffect, useRef, useState } from 'react';
import { View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Layout } from '@react-navigation/stack/lib/typescript/src/types';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import { NotificationState } from '@/Stores/Notification/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import NotificationActions from '@/Stores/Notification/Actions';
import { HeaderProps } from '@/Components/Header/index';
import { HomeState } from '@/Stores/Home/InitialState';
import TopDateSelector from '@/Components/Calendar/TopDateSelector';

const HomeHeader = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const { isShow } = props;
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { notificationConfirm } = useSelector((state: NotificationState) => state.notification);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  useEffect(() => {
    console.log('headerHeight : ', headerHeight);
  }, [headerHeight]);

  const onMoveSearchScreen = () => {
    navigate('SearchScreen');
  };
  const onNotificationScreen = () => {
    if (!userIdx) {
      navigate('SimpleLoginScreen');
    } else {
      dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'Y' }));
      navigate('NotificationScreen');
    }
  };

  const onLayout = (e: Layout) => {
    // console.log('onLayout : ', e.height);
    setHeaderHeight(e.height);
  };

  return (
    <>
      <View
        onLayout={(event) => onLayout(event.nativeEvent.layout)}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? 12 : statusHeight + 12,
          paddingBottom: 12,
          paddingHorizontal: 20,
          backgroundColor: Color.White,
          // backgroundColor: 'yellow',
        }}
      >
        <CustomButton onPress={() => navigateGoBack()} hitSlop={20}>
          <View style={{ width: 84, height: 29 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/logoHome.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
        <View style={{ flex: 1 }} />
        <CustomButton onPress={() => onMoveSearchScreen()}>
          <View style={{ width: 24, height: 24, marginRight: 12 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icSearch.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
        <CustomButton onPress={() => onNotificationScreen()}>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icNotify.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
      </View>
      {isShow && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: headerHeight,
            bottom: 0,
            left: 0,
            right: 0,
            height: 24 + 24 + 2 + 9,
            backgroundColor: Color.White,
            // backgroundColor: 'red',
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(240,240,240)',
          }}
        >
          <TopDateSelector calendarDate={calendarDate} />
        </View>
      )}
    </>
  );
};

export default HomeHeader;
