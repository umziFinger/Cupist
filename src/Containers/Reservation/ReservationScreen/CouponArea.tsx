import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import ReservationActions from '@/Stores/Reservation/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';

interface PropTypes {
  item: any;
}

const CouponArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { totalPrice, personCount, shoesCount } = useSelector((state: ReservationState) => state.reservation);

  useEffect(() => {
    dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: 1 }));
    dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: 0 }));
    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: 1 }));
      dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: 0 }));
    };
  }, []);

  useEffect(() => {
    onChangeTotalPrice();
  }, [item, personCount, shoesCount]);

  const onChangeTotalPrice = () => {
    const tempPrice = item?.salePrice * personCount + item?.shoesPrice * shoesCount;
    dispatch(ReservationActions.fetchReservationReducer({ type: 'totalPrice', data: tempPrice }));
  };

  const onCouponSelect = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCouponSelectRBS', data: true }));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 28 }}>
        <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
          쿠폰
        </CustomText>
      </View>
      <CustomButton onPress={() => onCouponSelect()}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.Gray300,
            backgroundColor: Color.Gray200,
            borderRadius: 10,
            paddingVertical: 16,
            paddingHorizontal: 12,
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Gray400 }}>
              사용 가능 쿠폰 0장 / 전체 0장
            </CustomText>
          </View>

          <View style={{ width: 16, height: 16 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icArrowRi.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
      </CustomButton>
    </View>
  );
};

export default CouponArea;
