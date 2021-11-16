import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import { inputMobileNumber } from '@/Components/Function';

const ReservationInfo = () => {
  const { reservationDetail } = useSelector((state: MyState) => state.my);
  const onCopy = () => {
    console.log('예약번호 복사 클릭');
  };

  return (
    <View style={{ paddingTop: 28 }}>
      <View>
        <CustomText
          style={{
            fontSize: 17,
            fontWeight: '500',
            letterSpacing: -0.3,
            color: Color.Black1000,
          }}
        >
          예약정보
        </CustomText>
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
          <View style={{}}>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Grayyellow500 }}>예약번호</CustomText>
          </View>
          <View style={{ marginTop: 17 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Grayyellow500 }}>
              예약자 이름
            </CustomText>
          </View>
          <View style={{ marginTop: 16, marginBottom: 28 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Grayyellow500 }}>
              휴대폰 번호
            </CustomText>
          </View>
        </View>

        <View style={{ marginLeft: 24, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <CustomText style={{ fontSize: 13, letterSpacing: 0, color: Color.Black1000 }}>
                {reservationDetail?.receiptId}
              </CustomText>
            </View>

            <CustomButton onPress={() => onCopy()}>
              <View
                style={{
                  borderRadius: 3,
                  backgroundColor: Color.Gray300,
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                }}
              >
                <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Gray600 }}>
                  예약번호 복사
                </CustomText>
              </View>
            </CustomButton>
          </View>
          <View style={{ marginTop: 17 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: 0, color: Color.Black1000 }}>
              {reservationDetail?.username || ''}
            </CustomText>
          </View>
          <View style={{ marginTop: 16, marginBottom: 28 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: 0, color: Color.Black1000 }}>
              {inputMobileNumber(reservationDetail?.mobile) || ''}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReservationInfo;
