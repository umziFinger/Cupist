import React, { useEffect } from 'react';
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

interface PropTypes {
  route: RouteProp<MainStackParamList, 'ReservationScreen'>;
}

const ReservationScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { placeIdx, ticketInfoIdx } = route.params;
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { reservationInfo } = useSelector((state: ReservationState) => state.reservation);

  useEffect(() => {
    if (!userIdx) {
      return navigate('SimpleLoginScreen');
    }
    dispatch(ReservationActions.fetchReservationInfo({ placeIdx, ticketInfoIdx }));
    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'reservationInfoInit' }));
    };
  }, []);

  const renderItem = ({ item }: { item: any; index: number }) => {
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

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} />
      <FlatList
        data={[0, 1, 2]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={7}
      />
    </View>
  );
};

export default ReservationScreen;
