import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import ReservationActions from '@/Stores/Reservation/Actions';
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
import CommonActions from '@/Stores/Common/Actions';
import { HomeState } from '@/Stores/Home/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'ReservationScreen'>;
}

const ReservationScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { placeIdx, ticketInfoIdx } = route.params;
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { myCardList, selcetedCardIdx, paymentMethod, paymentType, totalPrice, personCount, shoesCount } = useSelector(
    (state: ReservationState) => state.reservation,
  );
  const reservationInfo = useSelector((state: ReservationState) => state.reservation.reservationInfo);
  const [validation, setValidation] = useState<boolean>(false);

  useEffect(() => {
    if (paymentType === 'simple') {
      if (selcetedCardIdx > -1) {
        setValidation(true);
      } else {
        setValidation(false);
      }
    }
    if (paymentType === 'normal') {
      if (paymentMethod > -1) {
        setValidation(true);
      } else {
        setValidation(false);
      }
    }
  }, [paymentType, selcetedCardIdx, paymentMethod]);

  useEffect(() => {
    if (!userIdx) {
      return navigate('SimpleLoginScreen');
    }
    dispatch(ReservationActions.fetchReservationInfo({ placeIdx, ticketInfoIdx }));
    dispatch(ReservationActions.fetchReservationCardList());

    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'reservationInfoInit' }));
    };
  }, []);

  // 결제 임시 데이터 생성
  const onCreateTempReservation = () => {
    if (validation) {
      console.log('onPressReservation : ', reservationInfo);
      const params = {
        placeIdx,
        placeTicketIdx: ticketInfoIdx,
        useDate: calendarDate,
        memberCnt: personCount,
        shoesCnt: shoesCount,
        price: reservationInfo?.price,
        salePrice: reservationInfo?.salePrice,
        shoesPrice: reservationInfo?.shoesPrice,
        totalPrice,
        username: reservationInfo?.username,
        mobile: reservationInfo?.mobile,
      };
      console.log('params : ', params);
      dispatch(ReservationActions.fetchReservation(params));
      // dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenReservationRBS', data: true }));
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
          </View>
        );
      }
      case 3: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28 }}>
              <PaymentMethodArea list={myCardList} />
              {/* <PaymentMethodArea list={[]} /> */}
            </View>
          </View>
        );
      }
      case 4: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
              <CancelInfoArea />
            </View>
          </View>
        );
      }
      case 5: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
              <PermissionArea />
            </View>
          </View>
        );
      }
      case 6: {
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
        data={[0, 1, 2, 3, 4, 5, 6]}
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