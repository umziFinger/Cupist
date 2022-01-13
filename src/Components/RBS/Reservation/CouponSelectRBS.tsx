import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

const CouponGuideRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { heightInfo, isOpenCouponSelectRBS } = useSelector((state: CommonState) => state.common);
  const { height } = useWindowDimensions();
  useEffect(() => {
    if (isOpenCouponSelectRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenCouponSelectRBS]);

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

              <CustomButton>
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
                        true
                          ? require('@/Assets/Images/Button/btnRadioOn.png')
                          : require('@/Assets/Images/Button/btnRadioOff.png')
                      }
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </View>
              </CustomButton>

              <View style={{ marginTop: 28 }}>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                  사용가능 쿠폰 2
                </CustomText>

                <FlatList
                  data={[0, 1]}
                  listKey={'available'}
                  renderItem={() => (
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
                              style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}
                            >
                              5,000원 할인
                            </CustomText>
                          </View>

                          <View style={{ width: 24, height: 24 }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={
                                true
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
                              최초 예약 이용권
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
                              2022. 01. 22까지 (10일 10시간 9분 남음)
                            </CustomText>
                          </View>
                        </View>
                      </View>
                    </CustomButton>
                  )}
                  initialNumToRender={3}
                  maxToRenderPerBatch={7}
                  windowSize={7}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <View style={{ marginTop: 28 }}>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                  보유 쿠폰 3
                </CustomText>

                <FlatList
                  data={[0, 1]}
                  listKey={'disable'}
                  renderItem={() => (
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
                              5,000원 할인
                            </CustomText>
                          </View>

                          <View style={{ width: 24, height: 24 }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={
                                true
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
                            <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray400 }}>
                              최초 예약 이용권
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
                              2022. 01. 22까지 (10일 10시간 9분 남음)
                            </CustomText>
                          </View>
                        </View>
                      </View>
                    </CustomButton>
                  )}
                  initialNumToRender={1}
                  maxToRenderPerBatch={1}
                  windowSize={7}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          )}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
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
