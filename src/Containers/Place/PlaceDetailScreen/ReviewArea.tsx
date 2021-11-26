import React, { useEffect, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import Star from '@/Components/Star';
import CustomShowMore from '@/Components/CustomShowMore';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import PlaceActions from '@/Stores/Place/Actions';
import MyActions from '@/Stores/My/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

interface PropTypes {
  item: any;
  latestReview: Array<any>;
  starReview: Array<any>;
}
const ReviewArea = (props: PropTypes) => {
  const { item, latestReview, starReview } = props;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { placeDetail } = useSelector((state: PlaceState) => state.place);

  const [filter, setFilter] = useState<string>('latest');
  const [reviewList, setReviewList] = useState<any>([]);
  const [isReviewMore, setIsReviewMore] = useState(true);

  useEffect(() => {
    setReviewList(filter === 'latest' ? latestReview?.slice(-2) : starReview.slice(-2));
    setIsReviewMore(true);
  }, [item]);

  const onReviewMore = () => {
    setReviewList(filter === 'latest' ? latestReview : starReview);
    setIsReviewMore(false);
  };

  const onPressTotalList = () => {
    const params = {
      perPage: 10,
      page: 1,
      sort: 'latest',
      placeIdx: item.idx,
    };
    dispatch(PlaceActions.fetchPlaceReviewList(params));
  };

  const onPressFilter = (value: string) => {
    console.log('onPressFilter');
    setFilter(value);
  };

  const onPressReviewRBS = (review: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenPlaceReviewMoreRBS', data: true }));
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'clickedReviewItem',
        data: { ...review, placeName: item.name, placeIdx: item.idx, screenType: 'placeDetail' },
      }),
    );
  };

  const onReviewWrite = () => {
    if (placeDetail?.user.isWriteable) {
      dispatch(
        MyActions.fetchMyReducer({
          type: 'writeReviewInfo',
          data: {
            paymentIdx: placeDetail?.user.paymentIdx,
            placeIdx: placeDetail?.place?.idx,
            placeName: placeDetail?.place?.name,
            ticketName: placeDetail?.user.ticketName,
            star: 0,
            content: '',
            files: '',
          },
        }),
      );
      navigate('WriteReviewDetailScreen', { type: 'placeDetail' });
    } else {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '이용한 내역이 없습니다.',
          },
        }),
      );
    }
  };

  const onTotalImage = (reviewIdx: number, value: number) => {
    console.log('totalImage : ', reviewIdx, value);
    const idx = reviewList.findIndex((review: any) => review.idx === reviewIdx);
    if (idx > -1) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'totalImage',
          data: {
            totalImageType: 'review',
            totalImageList: reviewList[idx]?.reviewPhoto || [],
          },
        }),
      );
      navigate('TotalImageScreen', { startIdx: value });
    }
  };

  const renderEmptyArea = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
            방문자리뷰
          </CustomText>
        </View>
        <View style={{ alignItems: 'center', paddingVertical: 60 }}>
          <View style={{ width: 60, height: 60 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/emptyReview.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ justifyContent: 'center', marginTop: 8 }}>
            <CustomText
              style={{ color: '#333', fontSize: 14 }}
            >{`이 볼링장을 이용해보셨나요?\n볼링장에 대한 경험을 나눠주세요!`}</CustomText>
          </View>
          <CustomButton onPress={() => onReviewWrite()}>
            <View style={{ justifyContent: 'center', marginTop: 24 }}>
              <CustomText style={{ color: Color.Point1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                리뷰쓰기
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    );
  };

  return reviewList.length > 0 ? (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ marginRight: 2, justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
              방문자리뷰
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Primary1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
              {item?.reviewCnt || 0}
            </CustomText>
          </View>
        </View>

        <CustomButton onPress={() => onPressTotalList()} hitSlop={7}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Primary1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
              전체보기
            </CustomText>
          </View>
        </CustomButton>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, marginTop: 16 }}>
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
        <CustomButton onPress={() => onPressFilter('star')}>
          <View
            style={{
              justifyContent: 'center',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 16.5,
              borderWidth: 1,
              backgroundColor: filter === 'star' ? Color.Grayyellow1000 : Color.White,
              borderColor: filter === 'star' ? Color.Grayyellow1000 : Color.Gray300,
            }}
          >
            <CustomText
              style={{
                color: filter === 'star' ? Color.White : Color.Grayyellow1000,
                fontSize: 13,
                fontWeight: filter === 'star' ? '500' : 'normal',
              }}
            >
              평점순
            </CustomText>
          </View>
        </CustomButton>
      </View>
      <FlatList
        data={reviewList}
        renderItem={({ item: reviewItem }) => (
          <View style={{ flex: 1, marginTop: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingRight: 20, paddingLeft: 20 }}>
              <View style={{ width: 40, height: 40, marginRight: 12 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 50 }}
                  source={{ uri: reviewItem?.User?.profile || '' }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <CustomText
                      style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}
                    >
                      {reviewItem?.User?.nickname}
                    </CustomText>
                  </View>
                  <CustomButton onPress={() => onPressReviewRBS(reviewItem)}>
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
                renderItem={({ item: imgItem, index }) => (
                  <CustomButton onPress={() => onTotalImage(reviewItem.idx, index)} effect={false}>
                    <View
                      style={{
                        marginTop: 16,
                        marginRight: index === 5 ? 0 : 8,
                        marginLeft: index === 0 ? 72 : undefined,
                      }}
                    >
                      <View style={{ width: width * 0.47, height: width * 0.47 * 0.625 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%', borderRadius: 5 }}
                          source={{ uri: imgItem.url || '' }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </CustomButton>
                )}
                keyExtractor={(keyItem, index) => index.toString()}
                initialNumToRender={2}
                maxToRenderPerBatch={5}
                windowSize={7}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
            <View
              style={{
                alignItems: 'center',
                height: 1,
                backgroundColor: Color.Gray300,
                marginTop: 24,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
          </View>
        )}
        keyExtractor={(parentKeyItem, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={7}
      />
      {reviewList?.length < 5 && isReviewMore && (
        <CustomButton onPress={() => onReviewMore()}>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              더보기
            </CustomText>
          </View>
        </CustomButton>
      )}
    </View>
  ) : (
    renderEmptyArea()
  );
};

export default ReviewArea;
