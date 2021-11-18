import React, { useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { BootpayWebView } from 'react-native-bootpay-api';
import CommonActions from '@/Stores/Common/Actions';
import ReservationActions from '@/Stores/Reservation/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PlaceState } from '@/Stores/Place/InitialState';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import { HomeState } from '@/Stores/Home/InitialState';
import { DATA_PAYMENT_METHOD } from '@/Containers/Reservation/ReservationScreen/data';
import { fetchReservationSimplePayment } from '@/Sagas/ReservationSaga';

const ReservationRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const bootpay = useRef<BootpayWebView>(null);
  const { height } = useWindowDimensions();
  const { heightInfo, isOpenReservationRBS } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { placeDetail, selectedTicket } = useSelector((state: PlaceState) => state.place);
  const { paymentInfo, paymentType, paymentMethod, myCardList, selcetedCardIdx } = useSelector(
    (state: ReservationState) => state.reservation,
  );
  const reservationInfo = useSelector((state: ReservationState) => state.reservation.reservationInfo);
  const place: any = placeDetail?.place || {};
  const cancelLimit = reservationInfo?.cancelLimit || moment().format('YYYY년 MM월 DD일 HH시 mm분');

  useEffect(() => {
    if (isOpenReservationRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenReservationRBS]);

  const onPressCancel = () => {
    RBSheetRef?.current.close();
  };

  const onPressReservation = () => {
    if (paymentInfo) {
      console.log('onPressReservation paymentMethod : ', paymentType);
      if (paymentType === 'simple') {
        console.log('간편결제 진행합니다. : ', myCardList[selcetedCardIdx].idx);
        const params = {
          paymentIdx: paymentInfo.idx,
          billingIdx: myCardList[selcetedCardIdx].idx,
        };
        console.log('params : ', params);
        dispatch(ReservationActions.fetchReservationSimplePayment(params));
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenReservationRBS', data: false }));
      } else {
        console.log('일반결제 진행합니다. : ', DATA_PAYMENT_METHOD[paymentMethod]);
      }
    }
    // RBSheetRef?.current.close();
  };

  return (
    <>
      <RBSheet
        ref={RBSheetRef}
        height={height * 0.7}
        openDuration={500}
        customStyles={{
          container: {
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          },
        }}
        onClose={() => {
          // dispatch(ReservationActions.fetchReservationReducer({ type: 'paymentInfoInit' }));
          dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenReservationRBS', data: false }));
        }}
      >
        <View style={{ flex: 1, height: height * 0.5, paddingBottom: heightInfo.statusHeight }}>
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ justifyContent: 'center', marginTop: 28 }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
                볼링장 이용시간
              </CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 24 }}>
              <View style={{ width: 60, height: 60, marginRight: 12 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: reservationInfo?.PlacePhoto || '' }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center' }}>
                  <CustomText
                    style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold', letterSpacing: -0.25 }}
                  >
                    {place?.name}
                  </CustomText>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 4 }}>
                  <CustomText
                    style={{ color: Color.Primary1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}
                  >
                    {selectedTicket?.ticketName}
                  </CustomText>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: Color.Gray100, marginTop: 16, borderRadius: 3, padding: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginRight: 16 }}>
                  <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2 }}>
                    일시 및 시간
                  </CustomText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, fontWeight: '500' }}>
                      {moment(calendarDate).format('MM월 DD일(dd)')} {selectedTicket?.startTime.substr(0, 5)} ~{' '}
                      {selectedTicket?.endTime.substr(0, 5)}
                    </CustomText>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 6 }}>
                <View style={{ justifyContent: 'center', marginRight: 35 }}>
                  <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2 }}>
                    1인 금액
                  </CustomText>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, fontWeight: '500' }}>
                    {numberFormat(selectedTicket?.salePrice)}원
                  </CustomText>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 28 }} />
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ justifyContent: 'center', marginTop: 28 }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
                예약자 정보
              </CustomText>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}
            >
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>이름</CustomText>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>
                  {reservationInfo?.username}
                </CustomText>
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}
            >
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>연락처</CustomText>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>
                  {reservationInfo?.mobile}
                </CustomText>
              </View>
            </View>
          </View>

          <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 28 }} />
          <View style={{ flex: 1, alignItems: 'center', marginTop: 28 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Point1000, fontSize: 13, letterSpacing: -0.2 }}>
                {moment(cancelLimit).format('YYYY년 MM월 DD일 HH시 mm분')}까지 취소가 가능합니다.
              </CustomText>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            <CustomButton onPress={() => onPressCancel()}>
              <View
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Color.Gray300,
                  paddingVertical: 15,
                  paddingHorizontal: 22,
                  marginRight: 8,
                }}
              >
                <CustomText style={{ color: Color.Gray400, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                  취소
                </CustomText>
              </View>
            </CustomButton>
            <CustomButton
              onPress={() => onPressReservation()}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 3,
                paddingVertical: 15,
                backgroundColor: Color.Primary1000,
              }}
            >
              <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
                진행하기
              </CustomText>
            </CustomButton>
          </View>
        </View>
      </RBSheet>
      {/* <BootpayWebView
        ref={bootpay}
        ios_application_id={'6170c2637b5ba4f7e3529d48'}
        // ios_application_id={'5b8f6a4d396fa665fdc2b5e9'} // 테스트 아이디
        android_application_id={'6170c2637b5ba4f7e3529d47'}
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
      /> */}
    </>
  );
};

export default ReservationRBS;
