import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { Color } from '@/Assets/Color';
import MyPaymentCard from '@/Components/Card/Common/MyPaymentCard';
import CustomButton from '@/Components/CustomButton';
import { DATA_PAYMENT_METHOD } from './data';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';

interface PropTypes {
  list: Array<any>;
}

const PaymentMethodArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const animatedFlatRef = useRef<any>();
  const { width } = useWindowDimensions();
  const { list } = props;
  const { paymentType, paymentMethod } = useSelector((state: AlbamonState) => state.albamon);
  const [viewableIndex, setViewableIndex] = useState<number | null>(0);

  // console.log('reservationInfo?.simplePaymentYN : ', reservationInfo?.simplePaymentYN);

  useEffect(() => {
    return () => {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'selcetedCardIdx', data: -1 }));
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'paymentMethod', data: -1 }));
    };
  }, []);

  useEffect(() => {
    if (list?.length !== 0) {
      // dispatch(ReservationActions.fetchReservationReducer({ type: 'paymentType', data: 'simple' }));
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'paymentType', data: 'normal' }));
    } else {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'paymentType', data: 'normal' }));
    }
  }, [list]);

  useEffect(() => {
    if (list?.length !== 0) {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'selcetedCardIdx', data: Number(viewableIndex) + 1 }));
    }
  }, [viewableIndex, paymentType]);

  const onViewableItemsChanged = React.useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (info.viewableItems) {
        const tempViewableIndex = info.viewableItems[0]?.key;
        let changeViewableIndex = 0;
        if (tempViewableIndex !== undefined) {
          changeViewableIndex = parseInt(tempViewableIndex);
        }
        setViewableIndex(changeViewableIndex);
      }
    },
  );

  const onPressNormalMethodDetail = (value: number) => {
    console.log('-=-=-==-=-=-=--==-', value);
    console.log('onPressNormalMethodDetail idx : ', value);
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'paymentMethod', data: value }));
  };

  const onPressMethodType = (type: string) => {
    console.log('onPressMethodType');
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'paymentMethod', data: -1 }));

    // Todo 02/17 나이스페이먼츠 간편결제 승인 시 아래 if문 제거
    // if (reservationInfo?.simplePaymentYN === 'N') {
    //   dispatch(
    //     CommonActions.fetchCommonReducer({
    //       type: 'alertDialog',
    //       data: {
    //         alertDialog: true,
    //         alertDialogType: 'confirm',
    //         alertDialogTitle: '서비스 준비중입니다.',
    //       },
    //     }),
    //   );
    //   return;
    // }

    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'paymentType', data: type }));
  };

  const onPressAddCard = () => {
    // Todo 02/22 나이스페이먼츠 간편결제 승인 시 아래 if문 제거
    // if (reservationInfo?.simplePaymentYN === 'N') {
    //   dispatch(
    //     CommonActions.fetchCommonReducer({
    //       type: 'alertDialog',
    //       data: {
    //         alertDialog: true,
    //         alertDialogType: 'confirm',
    //         alertDialogTitle: '서비스 준비중입니다.',
    //       },
    //     }),
    //   );
    //   return;
    // }
    dispatch(CommonActions.fetchCommonReducer({ type: 'registCardAfterScreen', data: 'RegistScreen' }));
    navigate('CertificationScreen');
  };

  return (
    <View style={{ flex: 1, marginTop: 32 }}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}
      >
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
            결제 수단
          </CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginTop: 16,
        }}
      >
        <CustomButton onPress={() => onPressMethodType('simple')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 24, height: 24, marginRight: 4 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  paymentType === 'simple'
                    ? require('@/Assets/Images/Button/btnRadioOn.png')
                    : require('@/Assets/Images/Button/btnRadioOff.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 14, letterSpacing: -0.25 }}>
                볼리미 간편결제
              </CustomText>
            </View>
          </View>
        </CustomButton>
        <CustomButton onPress={() => onPressAddCard()}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: Color.Grayyellow50,
              borderRadius: 15,
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, fontWeight: '500' }}>추가</CustomText>
          </View>
        </CustomButton>
      </View>

      {/* 카드 슬라이더 */}
      {paymentType === 'simple' && list?.length > 0 && (
        <Animated.FlatList
          data={list}
          ref={animatedFlatRef}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                <MyPaymentCard item={item} />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          snapToInterval={width * 0.6 + 31}
          snapToAlignment={'start'}
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          disableIntervalMomentum
          renderToHardwareTextureAndroid
          horizontal
          removeClippedSubviews
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          contentContainerStyle={{ paddingTop: 16, paddingLeft: width * 0.2 - 15, paddingRight: width * 0.2 - 15 }}
        />
      )}

      {/* 등록 카드 없을때 */}
      {list.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 16 }}>
          <View
            style={{
              backgroundColor: Color.Grayyellow50,
              borderRadius: 5,
              width: width * 0.6,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 30,
              paddingBottom: 20,
            }}
          >
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 14 }}>볼리미 간편결제</CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 14, fontWeight: 'bold' }}>
                등록하고 1초 결제
              </CustomText>
            </View>
            <CustomButton onPress={() => onPressAddCard()}>
              <View
                style={{
                  borderRadius: 20.5,
                  backgroundColor: Color.Primary1000,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}
              >
                <CustomText style={{ color: Color.White, fontSize: 12, fontWeight: 'bold' }}>
                  카드, 계좌 등록하기
                </CustomText>
              </View>
            </CustomButton>
          </View>
        </View>
      )}

      <View
        style={{
          backgroundColor: Color.Gray200,
          height: 1,
          marginTop: 20,
          marginHorizontal: 16,
        }}
      />
      <CustomButton onPress={() => onPressMethodType('normal')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginTop: 16,
          }}
        >
          <View style={{ width: 24, height: 24, marginRight: 4 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                paymentType === 'normal'
                  ? require('@/Assets/Images/Button/btnRadioOn.png')
                  : require('@/Assets/Images/Button/btnRadioOff.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 14, letterSpacing: -0.25 }}>
              다른 결제수단
            </CustomText>
          </View>
        </View>
      </CustomButton>
      {paymentType === 'normal' && (
        <View style={{ flex: 1, alignItems: 'flex-start', marginTop: 12, paddingLeft: 16 }}>
          <FlatList
            data={DATA_PAYMENT_METHOD}
            renderItem={({ item }) => (
              <CustomButton onPress={() => onPressNormalMethodDetail(item.idx)}>
                <View
                  style={{
                    width: (width - 32 - 12) / 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: paymentMethod === item.idx ? Color.Primary1000 : Color.Gray350,
                    backgroundColor: paymentMethod === item.idx ? 'rgba(255, 185, 10, 0.05)' : 'transparent',
                    borderRadius: 5,
                    paddingVertical: item.type === 'text' ? 16 : 8,
                    marginHorizontal: 3,
                    marginTop: 8,
                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText
                      style={{
                        color: paymentMethod === item.idx ? Color.Primary1000 : Color.Black1000,
                        fontSize: 14,
                      }}
                    >
                      {item.content}
                    </CustomText>
                  </View>
                  {/* {item?.type === 'text' ? (
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText
                        style={{
                          color: paymentMethod === item.idx ? Color.Primary1000 : Color.Black1000,
                          fontSize: 14,
                        }}
                      >
                        {item.content}
                      </CustomText>
                    </View>
                  ) : (
                    <View style={{ width: 71, height: 34 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={item?.content}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  )} */}
                </View>
              </CustomButton>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={6}
            maxToRenderPerBatch={9}
            windowSize={7}
            numColumns={3}
          />
        </View>
      )}
    </View>
  );
};

export default PaymentMethodArea;