import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import { navigate } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import WriteableReviewItem from '@/Containers/My/MyScreen/WriteableReviewItem';
import WriteReviewItem from '@/Containers/My/MyScreen/WriteReviewItem';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';

const ReviewList = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { myReviewPage } = useSelector((state: MyState) => state.my);
  const onRefresh = () => {
    const params = {
      perPage: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyReservationList(params));
    dispatch(
      MyActions.fetchMyReducer({
        type: 'myReviewPage',
        data: 1,
      }),
    );
  };

  const onMore = () => {
    const params = {
      perPage: 10,
      page: myReviewPage,
    };

    if (myReviewPage > 0) dispatch(MyActions.fetchMyReservationList(params));
  };

  const renderItem = (index: number) => {
    switch (index) {
      case 0: {
        return (
          <>
            <View style={{ paddingTop: 30, paddingHorizontal: 24, backgroundColor: Color.White, paddingBottom: 30 }}>
              <WriteableReviewItem />
            </View>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
          </>
        );
      }
      case 1: {
        return (
          <>
            <View style={{ backgroundColor: Color.White, paddingTop: 30 }}>
              <WriteReviewItem />
            </View>
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[0, 1]}
        renderItem={({ index }) => renderItem(index)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => onRefresh()}
        scrollEnabled
        onEndReached={() => onMore()}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: Color.White,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 60, height: 60, marginTop: 120 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/emptyReview.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ marginTop: 8 }}>
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  letterSpacing: -0.25,
                  textAlign: 'center',
                  color: Color.Gray400,
                }}
              >
                {`작성한 리뷰가 없습니다.\n 볼링장 이용 후 리뷰를 남겨보세요!`}
              </CustomText>
            </View>
            <CustomButton onPress={() => navigate('MyAroundScreen')}>
              <View style={{ marginTop: 24 }}>
                <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}>
                  내 주변 볼링장 보기
                </CustomText>
              </View>
            </CustomButton>
          </View>
        )}
        ListFooterComponent={<View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
      />
    </View>
  );
};
export default ReviewList;
