import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import { numberFormat } from '@/Components/Function';
import ReservationActions from '@/Stores/Reservation/Actions';

const CouponGuideRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { heightInfo, isOpenCouponSelectRBS } = useSelector((state: CommonState) => state.common);
  const { reservationInfo, totalPrice, selectedCoupon } = useSelector((state: ReservationState) => state.reservation);
  const { height } = useWindowDimensions();
  const [coupon, setCoupon] = useState<any>({ disableCoupon: [], usableCoupon: [] });

  useEffect(() => {
    if (isOpenCouponSelectRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenCouponSelectRBS]);

  useEffect(() => {
    if (reservationInfo?.coupon && totalPrice) {
      onCouponDivision(reservationInfo?.coupon);
    }
  }, [reservationInfo, totalPrice]);

  const onCouponDivision = (couponList: any) => {
    try {
      const usableCoupon = couponList?.filter((value: any) => {
        if (value.Coupon.usePrice < totalPrice) {
          return value;
        }
        return false;
      });

      const disableCoupon = couponList?.filter((value: any) => {
        if (value.Coupon.usePrice > totalPrice) {
          return value;
        }
        return false;
      });
      setCoupon({ usableCoupon, disableCoupon });
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectCoupon = (couponItem: any) => {
    dispatch(ReservationActions.fetchReservationReducer({ type: 'selectedCoupon', data: couponItem }));
    RBSheetRef?.current.close();
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.8}
      openDuration={500}
      closeDuration={300}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => {
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCouponSelectRBS', data: false }));
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Color.White,
          paddingTop: 35,
          paddingHorizontal: 24,
          paddingBottom: heightInfo.fixBottomHeight,
        }}
      >
        <FlatList
          data={[0]}
          listKey={'parent'}
          renderItem={() => (
            <View style={{}}>
              <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3, color: Color.Black1000 }}>
                쿠폰 선택
              </CustomText>

              <CustomButton onPress={() => onSelectCoupon(null)}>
                <View
                  style={{
                    marginTop: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: Color.Gray300,
                    paddingVertical: 15,
                    paddingLeft: 16,
                    paddingRight: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <CustomText
                      style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}
                    >
                      선택없음
                    </CustomText>
                  </View>

                  <View style={{ width: 24, height: 24 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={
                        selectedCoupon?.idx
                          ? require('@/Assets/Images/Button/btnRadioOff.png')
                          : require('@/Assets/Images/Button/btnRadioOn.png')
                      }
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </View>
              </CustomButton>

              <View style={{ marginTop: 28 }}>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                  사용가능 쿠폰 {coupon?.usableCoupon?.length || 0}
                </CustomText>

                <FlatList
                  data={coupon?.usableCoupon || []}
                  listKey={'available'}
                  renderItem={({ item }) => (
                    <CustomButton onPress={() => onSelectCoupon(item)}>
                      <View
                        style={{
                          marginTop: 12,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: Color.Gray300,
                          paddingVertical: 15,
                          paddingLeft: 16,
                          paddingRight: 12,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <CustomText
                              style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}
                            >
                              {numberFormat(item?.Coupon?.price || 0)}원 할인
                            </CustomText>
                          </View>

                          <View style={{ width: 24, height: 24 }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={
                                selectedCoupon?.idx === item.idx
                                  ? require('@/Assets/Images/Button/btnRadioOn.png')
                                  : require('@/Assets/Images/Button/btnRadioOff.png')
                              }
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                          <View>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              쿠폰
                            </CustomText>
                          </View>
                          <View style={{ marginLeft: 8 }}>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray800 }}>
                              {item?.Coupon?.title || ''}
                            </CustomText>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                          <View>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              기간
                            </CustomText>
                          </View>
                          <View style={{ marginLeft: 8 }}>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray800 }}>
                              {item?.useDateView || ''}
                            </CustomText>
                          </View>
                        </View>
                      </View>
                    </CustomButton>
                  )}
                  initialNumToRender={7}
                  maxToRenderPerBatch={10}
                  windowSize={7}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <View style={{ marginTop: 28 }}>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                  보유 쿠폰 {coupon?.disableCoupon?.length || 0}
                </CustomText>

                <FlatList
                  data={coupon?.disableCoupon || []}
                  listKey={'disable'}
                  renderItem={({ item: disableItem }) => (
                    <CustomButton>
                      <View
                        style={{
                          marginTop: 12,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: Color.Gray300,
                          paddingVertical: 15,
                          paddingLeft: 16,
                          paddingRight: 12,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <CustomText
                              style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Gray400 }}
                            >
                              {numberFormat(disableItem?.Coupon?.price || 0)}원 할인
                            </CustomText>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                          <View>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              쿠폰
                            </CustomText>
                          </View>
                          <View style={{ marginLeft: 8 }}>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              {disableItem?.Coupon?.title || ''}
                            </CustomText>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                          <View>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              기간
                            </CustomText>
                          </View>
                          <View style={{ marginLeft: 8 }}>
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              {disableItem?.useDateView || ''}
                            </CustomText>
                          </View>
                        </View>
                      </View>
                    </CustomButton>
                  )}
                  initialNumToRender={7}
                  maxToRenderPerBatch={10}
                  windowSize={7}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          )}
          initialNumToRender={7}
          maxToRenderPerBatch={10}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />

        <CustomButton onPress={() => RBSheetRef.current.close()}>
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: Color.White,
              borderRadius: 3,
              alignItems: 'center',
              marginBottom: 10,
              borderColor: Color.Gray300,
              borderWidth: 1,
              marginTop: 14,
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: -0.25,
                textAlign: 'center',
                color: Color.Gray400,
              }}
            >
              닫기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </RBSheet>
  );
};

export default CouponGuideRBS;
