import React, { useEffect, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { RouteProp } from '@react-navigation/native';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { PlaceState } from '@/Stores/Place/InitialState';
import Star from '@/Components/Star';
import CustomShowMore from '@/Components/CustomShowMore';
import CommonActions from '@/Stores/Common/Actions';
import PlaceActions from '@/Stores/Place/Actions';
import { navigate } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import { MainStackParamList } from '@/Navigators/MainNavigator';

interface PropsType {
  route: RouteProp<MainStackParamList, 'PlaceReviewScreen'>;
}

const PlaceReviewScreen = ({ route }: PropsType) => {
  // console.log('======', route?.params?.place);
  const placeIdx = route?.params?.placeIdx || 0;
  const placeName = route?.params?.placeName || '';
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [isScroll, setIsScroll] = useState(false);
  const { placeReview, reviewListPage = 1 } = useSelector((state: PlaceState) => state.place);
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const [filter, setFilter] = useState<string>('latest');
  useEffect(() => {
    const params = {
      perPage: 10,
      page: 1,
      sort: 'latest',
      placeIdx,
    };
    dispatch(PlaceActions.fetchPlaceReviewList(params));
  }, [placeIdx]);

  useEffect(() => {
    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'reviewListPage', data: 1 }));
    };
  }, []);

  const onRefresh = () => {
    const params = {
      perPage: 10,
      page: 1,
      sort: filter,
      placeIdx,
    };
    dispatch(PlaceActions.fetchPlaceReviewList(params));
  };

  const onMore = () => {
    const params = {
      perPage: 10,
      page: reviewListPage,
      sort: filter,
      placeIdx,
    };
    if (reviewListPage > 1) dispatch(PlaceActions.fetchPlaceReviewList(params));
  };

  const onPressFilter = (value: string) => {
    // console.log('onPressFilter: ', place);
    setFilter(value);
    const params = {
      perPage: 10,
      page: 1,
      sort: value,
      placeIdx,
    };
    dispatch(PlaceActions.fetchPlaceReviewList(params));
  };

  const onPressReviewRBS = (review: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenPlaceReviewMoreRBS', data: true }));
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'clickedReviewItem',
        data: {
          ...review,
          placeName,
          placeIdx,
          screenType: 'placeReview',
        },
      }),
    );
  };

  const onTotalImage = (reviewIdx: number, value: number) => {
    console.log('totalImage : ', reviewIdx, value);
    const idx = placeReview.review.findIndex((review: any) => review.idx === reviewIdx);
    if (idx > -1) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'totalImage',
          data: {
            totalImageType: 'review',
            totalImageList: placeReview.review[idx]?.reviewPhoto || [],
          },
        }),
      );
      navigate('TotalImageScreen', { startIdx: value });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'placeReview'} isScroll={isScroll} />

      {!isScroll && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ marginRight: 2, justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
                  방문자리뷰
                </CustomText>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Primary1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
                  {placeReview?.reviewCnt || 0}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, marginVertical: 16 }}>
            <CustomButton onPress={() => onPressFilter('latest')}>
              <View
                style={{
                  justifyContent: 'center',
                  marginRight: 7,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 16.5,
                  borderWidth: 1,
                  borderColor: filter === 'latest' ? Color.Grayyellow1000 : Color.Gray300,
                  backgroundColor: filter === 'latest' ? Color.Grayyellow1000 : Color.White,
                }}
              >
                <CustomText
                  style={{
                    color: filter === 'latest' ? Color.White : Color.Grayyellow1000,
                    fontSize: 13,
                    fontWeight: filter === 'latest' ? '500' : 'normal',
                  }}
                >
                  최신순
                </CustomText>
              </View>
            </CustomButton>
            <CustomButton onPress={() => onPressFilter('reviewStar')}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 16.5,
                  borderWidth: 1,
                  backgroundColor: filter === 'reviewStar' ? Color.Grayyellow1000 : Color.White,
                  borderColor: filter === 'reviewStar' ? Color.Grayyellow1000 : Color.Gray300,
                }}
              >
                <CustomText
                  style={{
                    color: filter === 'reviewStar' ? Color.White : Color.Grayyellow1000,
                    fontSize: 13,
                    fontWeight: filter === 'reviewStar' ? '500' : 'normal',
                  }}
                >
                  평점순
                </CustomText>
              </View>
            </CustomButton>
          </View>
        </>
      )}

      <FlatList
        data={placeReview?.review}
        renderItem={({ item: reviewItem, index }) => (
          <View style={{ flex: 1, marginTop: index === 0 ? 20 : 24 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 20,
              }}
            >
              <View style={{ width: 40, height: 40, marginRight: 12 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 50 }}
                  source={{ uri: reviewItem?.User?.profile || '' }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ flex: 1, marginTop: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <CustomText
                      style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}
                    >
                      {reviewItem?.User?.nickname}
                    </CustomText>
                  </View>
                  <CustomButton onPress={() => onPressReviewRBS(reviewItem)} hitSlop={7}>
                    <View style={{ width: 16, height: 16 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Button/icReveiwPlus.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </CustomButton>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, paddingRight: 20 }}>
                  <View style={{ marginRight: 4 }}>
                    <Star
                      default={reviewItem?.star || 0}
                      opacity
                      count={5}
                      starSize={12}
                      spacing={0}
                      disabled
                      fullStar={require('@/Assets/Images/Common/icStarOnBig.png')}
                      emptyStar={require('@/Assets/Images/Common/icStarOffBig.png')}
                    />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Gray800, fontSize: 10 }}>{reviewItem?.regDateView}</CustomText>
                  </View>
                </View>
                <View style={{ marginTop: 12 }}>
                  <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow1000 }}>
                    {reviewItem?.visitCnt || 0}번째 방문
                  </CustomText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 20,
                    marginTop: 10,
                  }}
                >
                  <CustomShowMore
                    text={reviewItem?.content}
                    targetLines={2}
                    backgroundColor={'transparent'}
                    textColor={Color.Black1000}
                    buttonColor={Color.Primary1000}
                  />
                </View>
              </View>
            </View>
            {reviewItem?.reviewPhoto?.length > 0 && (
              <FlatList
                data={reviewItem?.reviewPhoto}
                renderItem={({ item: imgItem, index: imgIndex }) => (
                  <CustomButton onPress={() => onTotalImage(reviewItem.idx, imgIndex)} effect={false}>
                    <View
                      style={{
                        marginTop: 16,
                        marginRight: imgIndex === 3 ? 0 : 8,
                        marginLeft: imgIndex === 0 ? 72 : undefined,
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.47,
                          height: width * 0.47 * 0.625,
                          backgroundColor: Color.Grayyellow200,
                          borderRadius: 5,
                        }}
                      >
                        <FastImage
                          style={{ width: '100%', height: '100%', borderRadius: 5 }}
                          source={{ uri: imgItem.url || '' }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </CustomButton>
                )}
                keyExtractor={(keyItem, keyIndex) => keyIndex.toString()}
                initialNumToRender={2}
                maxToRenderPerBatch={5}
                windowSize={7}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
            {/* 사장님 댓글 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingRight: 20,
                paddingLeft: 25,
                marginTop: 16,
              }}
            >
              <View style={{ width: 30, height: 30, marginRight: 8 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 50 }}
                  source={require('@/Assets/Images/Common/imgReviewPrfoile.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: 9, height: 15, marginTop: 6 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/imgSpeach.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 6,
                  backgroundColor: Color.Grayyellow50,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  padding: 15,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', marginRight: 4 }}>
                    <CustomText
                      style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2, fontWeight: 'bold' }}
                    >
                      사장님
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Gray600, fontSize: 10 }}>
                      {reviewItem?.PlaceReviewComment[0]?.regDateView || '0일 전'}
                    </CustomText>
                  </View>
                </View>

                <View style={{ justifyContent: 'center', marginTop: 6 }}>
                  <CustomShowMore
                    text={reviewItem?.PlaceReviewComment[0]?.content}
                    targetLines={2}
                    backgroundColor={'transparent'}
                    textColor={Color.Grayyellow1000}
                    buttonColor={Color.Primary1000}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 1,
                backgroundColor: Color.Gray300,
                marginTop: 24,
                marginHorizontal: 20,
              }}
            />
          </View>
        )}
        keyExtractor={(parentKeyItem, index) => index.toString()}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={7}
        refreshing={false}
        onRefresh={() => onRefresh()}
        onEndReached={() => onMore()}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 60 && placeReview?.review?.length > 5) {
            setIsScroll(true);
          } else {
            setIsScroll(false);
          }
        }}
      />
    </View>
  );
};

export default PlaceReviewScreen;
