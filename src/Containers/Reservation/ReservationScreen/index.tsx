import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import DefaultInfoArea from '@/Containers/Reservation/ReservationScreen/DefaultInfoArea';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import BookerArea from '@/Containers/Reservation/ReservationScreen/BookerArea';
import PriceArea from '@/Containers/Reservation/ReservationScreen/PriceArea';
import PaymentMethodArea from '@/Containers/Reservation/ReservationScreen/PaymentMethodArea';
import { CommonState } from '@/Stores/Common/InitialState';
import CancelInfoArea from '@/Containers/Reservation/ReservationScreen/CancelInfoArea';
import PermissionArea from '@/Containers/Reservation/ReservationScreen/PermissionArea';
import CustomButton from '@/Components/CustomButton';
import ReservationActions from '@/Stores/Reservation/Actions';
import { HomeState } from '@/Stores/Home/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import AmountArea from '@/Containers/Reservation/ReservationScreen/AmountArea';
import CouponArea from '@/Containers/Reservation/ReservationScreen/CouponArea';
import WarningArea from '@/Containers/Reservation/ReservationScreen/WarningArea';
import { AlbamonState } from '@/Stores/Albamon/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'ReservationScreen'>;
}

const ReservationScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const flatRef = useRef<any>();
  const { placeIdx, ticketInfoIdx } = route.params;
  const { placeDetailSelectedTab, albamonDate } = useSelector((state: AlbamonState) => state.albamon);

  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const {
    myCardList,
    selcetedCardIdx,
    paymentMethod,
    paymentType,
    totalPrice,
    personCount,
    shoesCount,
    selectedCoupon,
  } = useSelector((state: ReservationState) => state.reservation);
  const reservationInfo = useSelector((state: ReservationState) => state.reservation.reservationInfo);
  const [validation, setValidation] = useState<boolean>(false);

  const checkMobile = () => {
    if (!reservationInfo?.mobile) {
      flatRef?.current?.scrollToIndex({ index: 1, animated: true });
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'bottom',
            alertToastMessage: '예약자 정보를 확인해주세요.',
          },
        }),
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'reservationInfoInit' }));
      // dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
    };
  }, []);

  useEffect(() => {
    if (!userIdx) {
      navigate('SimpleLoginScreen');
      return;
    }
    dispatch(ReservationActions.fetchReservationInfo({ placeIdx, ticketInfoIdx }));
    dispatch(ReservationActions.fetchReservationCardList());
  }, [route]);

  useEffect(() => {
    if (paymentType === 'simple') {
      if (selcetedCardIdx > -1 && myCardList?.length !== 0) {
        setValidation(true);
      } else {
        setValidation(false);
      }
      // setValidation(true);
    }

    if (paymentType === 'normal') {
      if (paymentMethod > -1) {
        setValidation(true);
      } else {
        setValidation(false);
      }
      // setValidation(true);
    }
  }, [paymentType, selcetedCardIdx, paymentMethod, myCardList, reservationInfo]);

  // 결제 임시 데이터 생성
  const onCreateTempReservation = () => {
    if (checkMobile() && validation) {
      const params =
        placeDetailSelectedTab.key === 'default'
          ? {
              placeIdx,
              placeTicketIdx: ticketInfoIdx,
              useDate: calendarDate,
              memberCnt: personCount,
              shoesCnt: shoesCount,
              price: reservationInfo?.price,
              salePrice: reservationInfo?.salePrice,
              shoesPrice: reservationInfo?.shoesPrice,
              totalPrice: totalPrice - (selectedCoupon?.Coupon?.price || 0),
              username: reservationInfo?.username,
              mobile: reservationInfo?.mobile,
              couponPrice: selectedCoupon?.Coupon?.price,
              couponIdx: selectedCoupon?.idx,
            }
          : {
              placeIdx,
              placeTicketIdx: ticketInfoIdx,
              useDate: albamonDate,
              memberCnt: personCount,
              shoesCnt: shoesCount,
              price: reservationInfo?.price,
              salePrice: reservationInfo?.salePrice,
              shoesPrice: reservationInfo?.shoesPrice,
              totalPrice: totalPrice - (selectedCoupon?.Coupon?.price || 0),
              username: reservationInfo?.username,
              mobile: reservationInfo?.mobile,
              couponPrice: selectedCoupon?.Coupon?.price,
              couponIdx: selectedCoupon?.idx,
              competitionJoinsIdx: reservationInfo?.competitionJoinsIdx,
            };
      dispatch(ReservationActions.fetchReservation(params));
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    switch (item) {
      case 0: {
        return (
          <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 16 }}>
            <DefaultInfoArea item={reservationInfo} />
          </View>
        );
      }
      case 1: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ paddingHorizontal: 16, marginTop: 28 }}>
              <BookerArea item={reservationInfo} />
            </View>
          </View>
        );
      }
      case 2: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ paddingHorizontal: 16, marginTop: 28 }}>
              <PriceArea item={reservationInfo} />
            </View>

            <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 28 }} />

            <View style={{ paddingHorizontal: 16 }}>
              <CouponArea item={reservationInfo} />
            </View>

            <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 28 }} />

            <View style={{ paddingHorizontal: 16 }}>
              <AmountArea item={reservationInfo} ticketType={reservationInfo?.eventType} />
            </View>
          </View>
        );
      }
      case 3: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28 }}>
              <PaymentMethodArea list={myCardList} />
            </View>
          </View>
        );
      }
      case 4: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
              <WarningArea />
            </View>
          </View>
        );
      }
      case 5: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
              <CancelInfoArea />
            </View>
          </View>
        );
      }
      case 6: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
              <PermissionArea />
            </View>
          </View>
        );
      }
      case 7: {
        return (
          <CustomButton onPress={() => onCreateTempReservation()}>
            <View style={{ flex: 1, marginTop: 28, paddingHorizontal: 16, marginBottom: 48 }}>
              <View
                style={{
                  backgroundColor: validation ? Color.Primary1000 : Color.Grayyellow200,
                  paddingVertical: 15,
                  alignItems: 'center',
                  borderRadius: 3,
                }}
              >
                <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                  동의하고 예약하기
                </CustomText>
              </View>
            </View>
          </CustomButton>
        );
      }

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} />
      <FlatList
        ref={flatRef}
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: heightInfo.fixBottomHeight }}
      />
    </View>
  );
};

export default ReservationScreen;
