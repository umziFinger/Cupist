import React from 'react';
import { View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import { NotificationState } from '@/Stores/Notification/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import NotificationActions from '@/Stores/Notification/Actions';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { notificationConfirm } = useSelector((state: NotificationState) => state.notification);

  const onNotificationScreen = () => {
    // if (!userIdx) {
    //   dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: true }));
    // } else {
    //   dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'Y' }));
    //   navigate('NotificationScreen');
    // }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'android' ? 53 : 53 + statusHeight,
        paddingTop: Platform.OS === 'android' ? 0 : statusHeight,
        paddingHorizontal: 20,
        backgroundColor: Color.White,
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
      <View style={{ width: 24, height: 24, marginRight: 12 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={require('@/Assets/Images/Common/icSearch.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={{ width: 24, height: 24 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={require('@/Assets/Images/Common/icNotify.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
