import React, { useState } from 'react';
import { FlatList, Platform, RefreshControl, TextInput, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomButton from '@/Components/CustomButton';
import TabMenu from '@/Components/TabMenu';
import { MY_COUPON_TAB_MENU } from '@/Containers/More/MyCouponScreen/data';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import { MyState } from '@/Stores/My/InitialState';
import AvailableItem from '@/Containers/More/MyCouponScreen/AvailableItem';
import DisableItem from '@/Containers/More/MyCouponScreen/DisableItem';

const MyCouponScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { couponSelectedTab = { title: '사용가능', key: 'Y' } } = useSelector((state: MyState) => state.my);

  const { width } = useWindowDimensions();

  const [coupon, setCoupon] = useState('');

  const onChangeText = (text: string) => {
    setCoupon(text);
  };

  const onCouponGuide = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCouponGuideRBS', data: true }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ paddingHorizontal: 24, marginTop: 12 }}>
        <CustomText
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: -0.25,
            color: '#1c1c1c',
          }}
        >
          쿠폰 등록하기
        </CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: Color.Gray300,
              borderRadius: 3,
              paddingLeft: 11,
              paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
              marginRight: 8,
            }}
          >
            <TextInput
              autoCompleteType="off"
              placeholder={'쿠폰코드를 입력해주세요'}
              placeholderTextColor={Color.Gray400}
              style={{
                color: Color.Black1000,
                fontSize: 14,
                letterSpacing: -0.22,
                padding: 0,
              }}
              autoFocus={false}
              autoCorrect={false}
              onChangeText={(text) => onChangeText(text)}
              value={coupon}
              allowFontScaling={false}
            />
          </View>
          <CustomButton>
            <View
              style={{
                borderRadius: 3,
                backgroundColor: Color.Primary1000,
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
            >
              <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
                등록
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>

      <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 24 }} />

      <TabMenu type={'coupon'} data={MY_COUPON_TAB_MENU} />

      <View style={{ paddingHorizontal: 24 }}>
        <FlatList
          data={[0, 1, 2]}
          renderItem={({ item, index }) => {
            return (
              <>
                {couponSelectedTab.key === 'Y' ? (
                  <AvailableItem item={item} index={index} />
                ) : (
                  <DisableItem item={item} index={index} />
                )}
              </>
            );
          }}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.fixBottomHeight }} />}
          ListEmptyComponent={() => (
            <View style={{ marginTop: 130, alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, marginBottom: 8 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/More/emptyCoupon.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Gray400 }}>
                {couponSelectedTab.key === 'Y' ? '보유한 쿠폰이 없습니다.' : '만료한 쿠폰이 없습니다.'}
              </CustomText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyCouponScreen;
