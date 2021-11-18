import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { numberFormat } from '@/Components/Function';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import ReservationActions from '@/Stores/Reservation/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';

interface PropTypes {
  item: any;
}

const PriceArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { totalPrice, personCount, shoesCount } = useSelector((state: ReservationState) => state.reservation);
  // const [personCount, setPersonCount] = useState<number>(1);
  // const [shoesCount, setShoesCount] = useState<number>(0);

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

  const onPressPersonCount = (type: string) => {
    if (type === 'plus') {
      console.log(personCount);
      dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: personCount + 1 }));
    }
    if (type === 'minus') {
      if (personCount === 1) {
        return;
      }
      dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: personCount - 1 }));
    }
  };

  const onPressShoesCount = (type: string) => {
    if (type === 'plus')
      dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: shoesCount + 1 }));
    if (type === 'minus') {
      if (shoesCount === 0) {
        return;
      }
      dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: shoesCount - 1 }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
              인원
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>1인</CustomText>
            </View>
            <View style={{ width: 1, height: 10, backgroundColor: Color.Gray400, marginHorizontal: 6 }} />
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>{numberFormat(item?.salePrice)}원</CustomText>
            </View>
          </View>
        </View>
        {/* 인원수 count */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomButton onPress={() => onPressPersonCount('minus')}>
            <View
              style={{
                backgroundColor: personCount === 1 ? Color.Gray100 : Color.Gray300,
                borderRadius: 50,
                padding: 12,
              }}
            >
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    Number(personCount) === 1
                      ? require('@/Assets/Images/Button/icNumMinusOff.png')
                      : require('@/Assets/Images/Button/icNumMinusOn.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
          <View style={{ justifyContent: 'center', marginHorizontal: 16 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
              {personCount}
            </CustomText>
          </View>
          <CustomButton onPress={() => onPressPersonCount('plus')}>
            <View style={{ backgroundColor: Color.Gray300, borderRadius: 50, padding: 12 }}>
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Button/icNumPlusOn.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: Color.Gray200, marginTop: 24 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
        <View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
              볼링화대여
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>1켤레</CustomText>
            </View>
            <View style={{ width: 1, height: 10, backgroundColor: Color.Gray400, marginHorizontal: 6 }} />
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>{numberFormat(item?.shoesPrice)}원</CustomText>
            </View>
          </View>
        </View>
        {/* 볼링화 count */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomButton onPress={() => onPressShoesCount('minus')}>
            <View
              style={{
                backgroundColor: shoesCount === 0 ? Color.Gray100 : Color.Gray300,
                borderRadius: 50,
                padding: 12,
              }}
            >
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    Number(shoesCount) === 0
                      ? require('@/Assets/Images/Button/icNumMinusOff.png')
                      : require('@/Assets/Images/Button/icNumMinusOn.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
          <View style={{ justifyContent: 'center', marginHorizontal: 16 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
              {shoesCount}
            </CustomText>
          </View>
          <CustomButton onPress={() => onPressShoesCount('plus')}>
            <View style={{ backgroundColor: Color.Gray300, borderRadius: 50, padding: 12 }}>
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Button/icNumPlusOn.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: Color.Gray200, marginTop: 24 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: Color.Gray600,
            backgroundColor: Color.Gray600,
            marginRight: 4,
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray600, fontSize: 11 }}> 인원 1~4인당 1레인이 배치됩니다.</CustomText>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.Gray200,
          borderRadius: 10,
          paddingVertical: 24,
          paddingHorizontal: 16,
          marginTop: 28,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              상품 금액
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold' }}>
              {numberFormat(item?.salePrice * personCount)}원
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
              결제 금액
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold' }}>
              {numberFormat(totalPrice)}원
            </CustomText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Point1000, fontSize: 18, fontWeight: 'bold' }}>
              {numberFormat(totalPrice)}원
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PriceArea;
