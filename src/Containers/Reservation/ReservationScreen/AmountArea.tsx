import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { numberFormat } from '@/Components/Function';
import { Color } from '@/Assets/Color';
import ReservationActions from '@/Stores/Reservation/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import CommonActions from '@/Stores/Common/Actions';

interface PropTypes {
  item: any;
}

const AmountArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { totalPrice, personCount, shoesCount, selectedCoupon } = useSelector(
    (state: ReservationState) => state.reservation,
  );

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
  }, [item, personCount, shoesCount, selectedCoupon]);

  const onChangeTotalPrice = () => {
    const tempPrice = item?.salePrice * personCount + item?.shoesPrice * shoesCount;

    if (tempPrice - (selectedCoupon?.Coupon?.price || 0) < 0) {
      CommonActions.fetchCommonReducer({
        type: 'alertToast',
        data: {
          alertToast: true,
          alertToastPosition: 'top',
          alertToastMessage: '0원 미만은 결제할 수 없습니다.',
        },
      });
    } else {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'totalPrice', data: tempPrice }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.Gray300,
          borderRadius: 10,
          paddingVertical: 24,
          paddingHorizontal: 16,
          marginTop: 28,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              총 상품 금액
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold' }}>
              {numberFormat(totalPrice)}원
            </CustomText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              옵션 금액
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold' }}>
              {numberFormat(item?.shoesPrice * shoesCount)}원
            </CustomText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              할인 금액
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold' }}>
              - {numberFormat(selectedCoupon?.Coupon?.price || 0)}원
            </CustomText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Point1000, fontSize: 18, fontWeight: 'bold' }}>
              {numberFormat(totalPrice - (selectedCoupon?.Coupon?.price || 0))}원
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AmountArea;
