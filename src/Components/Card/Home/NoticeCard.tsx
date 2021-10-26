import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

interface NoticeCardProps {
  type: string;
  cnt: number;
  message?: string;
}
const NoticeCard = (props: NoticeCardProps) => {
  const { type, cnt, message } = props;

  const dispatch = useDispatch();
  const { userIdx } = useSelector((state: AuthState) => state.auth);

  const onNotificationNavigate = () => {
    if (!userIdx) {
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: true }));
    } else {
      navigate('NotificationScreen');
    }
  };

  let isRepairStatus = false;
  if (type === 'end') {
    isRepairStatus = false;
  } else if (type === 'start') {
    isRepairStatus = true;
  }
  return (
    <CustomButton onPress={() => onNotificationNavigate()}>
      <View
        style={{
          marginHorizontal: 24,
          borderRadius: 24,
          padding: 23,
          backgroundColor: Color.palePink,
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderWidth: isRepairStatus ? 0 : 2,
          borderColor: isRepairStatus ? undefined : Color.pinkDefault,
          // marginTop: 17,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              letterSpacing: -0.38,
              color: Color.pinkDefault,
              lineHeight: 23,
            }}
            numberOfLines={2}
          >
            {message}
          </CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: Color.pinkDefault,
              marginRight: 10.9,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 4,
              paddingBottom: 3,
            }}
          >
            <CustomText style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.33, color: Color.White }}>
              {cnt || 0}
            </CustomText>
          </View>
          <View style={{ width: 9.2, height: 16.2, alignItems: 'center' }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icRightArrowPink.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      </View>
    </CustomButton>
  );
};

export default NoticeCard;
