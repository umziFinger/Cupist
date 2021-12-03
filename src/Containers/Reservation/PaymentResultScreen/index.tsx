import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';

const PaymentResultScreen = () => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { paymentResult, reservationInfo } = useSelector((state: ReservationState) => state.reservation);
  const place = paymentResult?.Place || {};
  const dispatch = useDispatch();
  const onMyScreen = () => {
    const params = {
      perPage: 10,
      page: 1,
      state: 'before',
    };
    dispatch(MyActions.fetchMyReservationList(params));
    navigate('MyScreen');
  };

  const cancelLimit = reservationInfo?.cancelLimit || moment().format('YYYY년 MM월 DD일 HH시 mm분');

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.fixBottomHeight + 48 }}>
      <Header type={'back'} />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 60, height: 60 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icCom.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ justifyContent: 'center', marginTop: 20 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, letterSpacing: -0.35 }}>
              {place?.name}
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
              예약완료
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 16 }}>
            <CustomText
              style={{ color: Color.Gray600, fontSize: 12, textAlign: 'center' }}
            >{`볼링장 예약이 완료되었습니다.\n아래 내용을 확인해주세요.`}</CustomText>
          </View>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 0.5,
            borderColor: Color.Gray350,
            marginTop: 36,
          }}
        />
        <View style={{ marginTop: 36 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                볼링장명
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>{place?.name}</CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                이용날짜
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>{paymentResult?.useDateDetail}</CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                이용시간
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>{paymentResult?.useTimeDetail}</CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                상품명
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>{place?.name}</CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                예약인원
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>{paymentResult?.memberCnt}명</CustomText>
            </View>
          </View>
          {paymentResult?.shoesCnt !== 0 && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText
                  style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}
                >
                  추가옵션
                </CustomText>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>
                  볼링화 {paymentResult?.shoesCnt}켤레
                </CustomText>
              </View>
            </View>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                결제방법
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>{paymentResult?.type}</CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                결제금액
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 13 }}>
                {numberFormat(paymentResult?.totalPrice)}원
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 0.5,
            borderColor: Color.Gray350,
            marginTop: 36,
          }}
        />
        <CustomButton
          onPress={() => onMyScreen()}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: Color.Grayyellow200,
              borderRadius: 3,
            }}
          >
            <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2 }}>
              예약내역 바로가기
            </CustomText>
          </View>
        </CustomButton>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
          <CustomText style={{ color: Color.Point1000, fontSize: 13, letterSpacing: -0.2 }}>
            {cancelLimit}까지 취소가 가능합니다.
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default PaymentResultScreen;
