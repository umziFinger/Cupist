import React, { useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';
import Header from '@/Components/Header';
import Star from '@/Components/Star';
import { MyState } from '@/Stores/My/InitialState';

const MyCouponScreen = () => {
  const dispatch = useDispatch();
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { myCouponPage, myCouponList } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    const params = {
      page: 1,
      per_page: 10,
    };
    dispatch(MyActions.fetchMyCouponList(params));
    return () => {
      dispatch(MyActions.fetchMyReducer({ type: 'myCouponPage', data: 1 }));
    };
  }, []);

  const onMore = () => {
    const params = {
      page: myCouponPage || 1,
      per_page: 10,
    };
    if (myCouponPage > 2) {
      dispatch(MyActions.fetchMyCouponList(params));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} text={`쿠폰 (${myCouponList?.length || 0})`} />
      <View style={{ height: 8, backgroundColor: Color.grayBg }} />
      <FlatList
        data={myCouponList || []}
        ListHeaderComponent={() => {
          return (
            <View style={{ paddingVertical: 16.5, paddingHorizontal: 31, alignItems: 'flex-end' }}>
              <CustomText style={{ fontSize: 13, color: Color.black70, letterSpacing: -0.25 }}>
                * 기한이 지난 쿠폰은 자동 삭제됩니다.
              </CustomText>
            </View>
          );
        }}
        renderItem={() => (
          <View
            style={{
              paddingHorizontal: 24,
              marginBottom: 24,
            }}
          >
            <View style={{ height: 327, borderRadius: 10 }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                source={require('@/Assets/Images/Button/btnImageUpload.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        onEndReached={() => onMore()}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: 131,
            }}
          >
            <CustomText style={{ color: Color.grayDefault, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}>
              소유한 쿠폰이 없습니다
            </CustomText>
          </View>
        }
        ListFooterComponent={<View style={{ marginBottom: statusHeight }} />}
      />
    </View>
  );
};

export default MyCouponScreen;
