import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { numberFormat } from '@/Components/Function';
import CustomDashed from '@/Components/CustomDashed';
import { MyState } from '@/Stores/My/InitialState';

const PaymentMethod = () => {
  const { reservationDetail } = useSelector((state: MyState) => state.my);
  console.log('@@@@@@@@@reservationDetail', reservationDetail);
  return (
    <View style={{ paddingTop: 28, paddingHorizontal: 24 }}>
      <View>
        <CustomText
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            letterSpacing: -0.2,
            color: Color.Black1000,
          }}
        >
          결제 수단
        </CustomText>
      </View>
      <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
              width: 48,
            }}
          >
            결제방식
          </CustomText>
        </View>
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 13,
              color: Color.Black1000,
              marginLeft: 38,
            }}
          >
            {reservationDetail?.type || ''}
          </CustomText>
        </View>
        <View
          style={{
            backgroundColor: reservationDetail?.stateText === '입금대기' ? Color.Gray300 : Color.White,
            borderRadius: 3,
            width: 90,
            paddingVertical: 5,
            alignItems: 'center',
            borderWidth: reservationDetail?.stateText === '입금대기' ? 0 : 1,
            borderColor: Color.Point1000,
          }}
        >
          <CustomText
            style={{
              color: reservationDetail?.stateText === '입금대기' ? Color.Gray600 : Color.Point1000,
              fontSize: 13,
            }}
          >
            {reservationDetail?.stateText === '입금대기' ? '입금대기' : '입금완료'}
          </CustomText>
        </View>
      </View>

      <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
              width: 48,
            }}
          >
            입금계좌
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              textAlign: 'right',
              color: Color.Black1000,
              marginLeft: 38,
            }}
          >
            {reservationDetail?.vbankName || ''} {reservationDetail?.vbankNo || ''}
          </CustomText>
        </View>
      </View>
      <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
              width: 48,
            }}
          >
            예금주
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              textAlign: 'right',
              color: Color.Black1000,
              marginLeft: 38,
            }}
          >
            (주)볼링플러스
          </CustomText>
        </View>
      </View>
      <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
              width: 48,
            }}
          >
            입금기한
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              marginLeft: 38,
              color: Color.Black1000,
            }}
          >
            {moment(reservationDetail?.vbankDate).format('YYYY년 MM월 DD일 hh:mm:ss') || ''}
          </CustomText>
        </View>
      </View>
      <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
              width: 48,
            }}
          >
            결제일시
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              color: Color.Black1000,
              marginLeft: 38,
            }}
          >
            {reservationDetail?.paymentDate || ''}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
export default PaymentMethod;
