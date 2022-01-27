import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import { CouponItemType } from '@/Stores/My/InitialState';
import { numberFormat } from '@/Components/Function';

const DisableItem = ({ item, index }: any) => {
  const dispatch = useDispatch();

  console.log('dddd : ', item);

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
            {item?.status || '사용불가'}
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
          <CustomText style={{ fontSize: 20, fontWeight: 'bold', color: Color.Gray400 }}>
            {numberFormat(item?.Coupon?.price || 0)}원
          </CustomText>
        </View>

        <View style={{ marginTop: 2 }}>
          <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Gray400 }}>
            {item?.Coupon?.title || ''}
          </CustomText>
        </View>

        <View style={{ marginTop: 16 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
            {item?.Coupon?.useTerms || ''}
          </CustomText>
        </View>

        <View style={{ marginTop: 4 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray700 }}>
            {item?.status === '사용완료'
              ? `사용완료일 : ${moment(item?.useDate).format('YYYY.MM.DD HH:mm')}`
              : `기간만료일 : ${moment(item?.expireDate).format('YYYY.MM.DD HH:mm')}`}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default DisableItem;
