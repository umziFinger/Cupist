import React, { useEffect } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { numberFormat } from '@/Components/Function';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import ReservationActions from '@/Stores/Reservation/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import CommonActions from '@/Stores/Common/Actions';

interface PropTypes {
  item: any;
}

const PriceArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { personCount, shoesCount } = useSelector((state: ReservationState) => state.reservation);

  useEffect(() => {
    dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: 1 }));
    dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: 0 }));
    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: 1 }));
      dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: 0 }));
    };
  }, []);

  useEffect(() => {
    dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: item?.minPeople || 1 }));
  }, [item]);

  const onPressPersonCount = (type: string) => {
    if (type === 'plus') {
      const maxPeople = item?.maxPeople;
      if (maxPeople) {
        if (maxPeople === personCount) {
          return dispatch(
            CommonActions.fetchCommonReducer({
              type: 'alertToast',
              data: {
                alertToast: true,
                alertToastPosition: 'bottom',
                alertToastMessage: '예약가능한 인원수를 초과했습니다. 인원 1~4인당 1레인이 배치됩니다',
              },
            }),
          );
        }
      }
      dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: personCount + 1 }));
    }
    if (type === 'minus') {
      const minPeople = item?.minPeople;
      if (personCount === minPeople) {
        return null;
      }
      dispatch(ReservationActions.fetchReservationReducer({ type: 'personCount', data: personCount - 1 }));
    }
    return null;
  };

  const onPressShoesCount = (type: string) => {
    if (type === 'plus') {
      const maxPeople = item?.maxPeople;
      if (maxPeople) {
        if (maxPeople === shoesCount) {
          return dispatch(
            CommonActions.fetchCommonReducer({
              type: 'alertToast',
              data: {
                alertToast: true,
                alertToastPosition: 'bottom',
                alertToastMessage: '대여가능한 수량을 초과하였습니다. 1인당 1개까지 가능합니다',
              },
            }),
          );
        }
      }
      dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: shoesCount + 1 }));
    }
    if (type === 'minus') {
      if (shoesCount === 0) {
        return null;
      }
      dispatch(ReservationActions.fetchReservationReducer({ type: 'shoesCount', data: shoesCount - 1 }));
    }
    return null;
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
                backgroundColor: personCount === item?.minPeople ? Color.Gray100 : Color.Gray300,
                borderRadius: 50,
                padding: 12,
              }}
            >
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    Number(personCount) === item?.minPeople
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
            <View
              style={{
                backgroundColor: item?.maxPeople !== personCount ? Color.Gray300 : Color.Gray100,
                borderRadius: 50,
                padding: 12,
              }}
            >
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    item?.maxPeople !== personCount
                      ? require('@/Assets/Images/Button/icNumPlusOn.png')
                      : require('@/Assets/Images/Button/icNumPlusOff.png')
                  }
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
            <View
              style={{
                backgroundColor: item?.maxPeople !== shoesCount ? Color.Gray300 : Color.Gray100,
                borderRadius: 50,
                padding: 12,
              }}
            >
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    item?.maxPeople !== shoesCount
                      ? require('@/Assets/Images/Button/icNumPlusOn.png')
                      : require('@/Assets/Images/Button/icNumPlusOff.png')
                  }
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
    </View>
  );
};

export default PriceArea;
