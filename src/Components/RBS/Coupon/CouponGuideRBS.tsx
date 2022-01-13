import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, View } from 'react-native';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

const CouponGuideRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { heightInfo, isOpenCouponGuideRBS } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    if (isOpenCouponGuideRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenCouponGuideRBS]);

  return (
    <RBSheet
      ref={RBSheetRef}
      height={461}
      openDuration={500}
      closeDuration={300}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => {
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCouponGuideRBS', data: false }));
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
          renderItem={() => (
            <View style={{}}>
              <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3, color: Color.Black1000 }}>
                쿠폰안내
              </CustomText>

              <View style={{ marginTop: 28 }}>
                <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                  사용기간
                </CustomText>
              </View>

              <View style={{ marginTop: 8 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>
                  2022.01.10 10:00 ~ 2022.01.18 10:00까지 사용
                </CustomText>
              </View>

              <View style={{ marginTop: 20 }}>
                <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                  사용조건
                </CustomText>
              </View>

              <View style={{ marginTop: 8 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>
                  {'회원가입 후 첫 예약시 사용 가능\n계정당 1회 사용 가능'}
                </CustomText>
              </View>

              <View style={{ marginTop: 20 }}>
                <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                  유의사항
                </CustomText>
              </View>

              <View style={{ marginTop: 8 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>
                  중복 가입시 사용이 불가합니다.
                </CustomText>
              </View>
            </View>
          )}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />

        <CustomButton onPress={() => RBSheetRef.current.close()}>
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
              borderRadius: 3,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: -0.25,
                textAlign: 'center',
                color: Color.White,
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
