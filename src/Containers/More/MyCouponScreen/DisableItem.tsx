import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';

const DisableItem = ({ item, index }: any) => {
  const dispatch = useDispatch();

  const onCouponGuide = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCouponGuideRBS', data: true }));
  };

  return (
    <View style={{ marginTop: index === 0 ? 20 : 12, flex: 1 }}>
      <View
        style={{
          backgroundColor: Color.Gray100,
          paddingVertical: 8,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopEndRadius: 4,
          borderTopStartRadius: 4,
          borderColor: Color.Gray300,
          borderWidth: 1,
          borderBottomWidth: 0,
        }}
      >
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: 'white',
            borderRadius: 50,
            position: 'absolute',
            bottom: -5,
            right: -5,
            borderColor: Color.Gray300,
            borderWidth: 1,
          }}
        />

        <View style={{ flex: 1, paddingLeft: 20 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray600 }}>
            볼리미예약 결제 쿠폰
          </CustomText>
        </View>
        <View
          style={{
            marginRight: 16,
            backgroundColor: Color.White,
            paddingVertical: 2,
            borderRadius: 9.5,
            paddingLeft: 11,
            paddingRight: 10,
          }}
        >
          <CustomText
            style={{
              fontSize: 11,
              letterSpacing: -0.2,
              color: Color.Gray600,
            }}
          >
            D-3
          </CustomText>
        </View>
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: 'white',
            borderRadius: 50,
            position: 'absolute',
            bottom: -5,
            left: -5,
            borderColor: Color.Gray300,
            borderWidth: 1,
          }}
        />
      </View>

      <View
        style={{
          borderColor: Color.Gray300,
          borderWidth: 1,
          borderTopWidth: 0,
          borderBottomEndRadius: 4,
          borderBottomStartRadius: 4,
          marginTop: 5,
          paddingTop: 11,
          paddingLeft: 20,
          paddingBottom: 20,
        }}
      >
        <View>
          <CustomText style={{ fontSize: 20, fontWeight: 'bold', color: Color.Gray400 }}>5,000원</CustomText>
        </View>

        <View style={{ marginTop: 2 }}>
          <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Gray400 }}>앱 첫결제 감사 쿠폰</CustomText>
        </View>

        <View style={{ marginTop: 16 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
            회원가입 후 첫 예약 시 적용
          </CustomText>
        </View>

        <View style={{ marginTop: 4 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray700 }}>
            사용완료일 : 2021.01.12 23:50
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default DisableItem;
