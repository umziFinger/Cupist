import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import { inputMobileNumber } from '@/Components/Function';
import CommonActions from '@/Stores/Common/Actions';

const ReservationInfo = () => {
  const { reservationDetail } = useSelector((state: MyState) => state.my);
  const dispatch = useDispatch();

  const onCopy = () => {
    Clipboard.setString(reservationDetail?.receiptId || '');
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'alertToast',
        data: {
          alertToast: true,
          alertToastPosition: 'bottom',
          alertToastMessage: '예약번호가 복사 되었습니다.',
        },
      }),
    );
  };

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
          예약정보
        </CustomText>
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          // alignItems: 'center',
        }}
      >
        <View style={{ justifyContent: 'center' }}>
          <View style={{ paddingVertical: 5 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Grayyellow500 }}>예약번호</CustomText>
          </View>
          <View style={{ marginTop: 12 }}>
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

        <View style={{ marginLeft: 24, flex: 1, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <CustomText style={{ fontSize: 13, letterSpacing: 0, color: Color.Black1000 }}>
                {reservationDetail?.receiptId || ''}
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
          <View style={{ marginTop: 12 }}>
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
