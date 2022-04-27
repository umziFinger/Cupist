import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import { MyState } from '@/Stores/My/InitialState';
import { numberFormat } from '@/Components/Function';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomDashed from '@/Components/CustomDashed';

const ReservationInfo = () => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { reservationDetail } = useSelector((state: MyState) => state.my);
  return (
    <View style={{ paddingTop: 28 }}>
      <View>
        <CustomText
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            letterSpacing: -0.2,
            color: Color.Black1000,
          }}
        >
          결제 정보
        </CustomText>
      </View>
      <View style={{ marginTop: 6 }}>
        <CustomText
          style={{
            fontSize: 12,
            letterSpacing: 0,
            color: Color.Gray600,
          }}
        >
          결제일시 {reservationDetail?.paymentDate}
        </CustomText>
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
            }}
          >
            상품 금액
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: '500',
              letterSpacing: -0.2,
              textAlign: 'right',
              color: Color.Black1000,
            }}
          >
            {numberFormat(reservationDetail?.price * reservationDetail?.memberCnt)}원
          </CustomText>
        </View>
      </View>

      <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
            }}
          >
            옵션 금액
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: '500',
              letterSpacing: -0.2,
              textAlign: 'right',
              color: Color.Black1000,
            }}
          >
            {numberFormat(reservationDetail?.shoesPrice * reservationDetail?.shoesCnt)}원
          </CustomText>
        </View>
      </View>
      <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
            }}
          >
            할인 금액
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: '500',
              letterSpacing: -0.2,
              textAlign: 'right',
              color: Color.Black1000,
            }}
          >
            -{numberFormat(reservationDetail?.couponPrice)}원
          </CustomText>
        </View>
      </View>
      {/* <View style={{ borderStyle: 'dotted', borderWidth: 1, borderColor: Color.Gray350, marginTop: 20 }} /> */}
      <View style={{ height: 0.5, marginTop: 20 }}>
        <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
            }}
          >
            실 결제 금액
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              textAlign: 'right',
              color: Color.Point1000,
            }}
          >
            {numberFormat(reservationDetail?.totalPrice)}원
          </CustomText>
        </View>
      </View>
      <View style={{ marginTop: 13, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              letterSpacing: -0.2,
              color: Color.Grayyellow500,
            }}
          >
            결제 수단
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              letterSpacing: 0,
              textAlign: 'right',
              color: Color.Black1000,
            }}
          >
            {reservationDetail?.type || ''}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default ReservationInfo;
