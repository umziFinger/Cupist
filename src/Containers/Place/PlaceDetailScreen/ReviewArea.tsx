import React, { useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import Star from '@/Components/Star';
import CustomShowMore from '@/Components/CustomShowMore';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
  latestReview: Array<any>;
  starReview: Array<any>;
}
const ReviewArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { item, latestReview, starReview } = props;
  const [filter, setFilter] = useState<string>('latest');
  const reviewList = filter === 'latest' ? latestReview : starReview;
  // const reviewList: Array<any> = [];

  const onPressTotalList = () => {
    console.log('onPressTotalList');
  };

  const onPressFilter = (value: string) => {
    console.log('onPressFilter');
    setFilter(value);
  };

  const onPressReviewRBS = () => {
    console.log('onPressReviewRBS');
  };

  const onPressWriteReview = () => {
    console.log('onPressWriteReview');
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
            totalImageList: reviewList[idx]?.reviewPhotoArr || [],
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
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 60, height: 60, marginTop: 60 }}>
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
          <CustomButton onPress={() => onPressWriteReview()}>
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
        renderItem={({ item: reviewItem, index }) => (
          <View style={{ flex: 1, marginTop: 24, paddingLeft: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ width: 40, height: 40, marginRight: 12 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 50 }}
                  source={{ uri: reviewItem?.User?.profile || '' }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 20 }}>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <CustomText
                      style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}
                    >
                      {reviewItem?.User?.nickname}
                    </CustomText>
                  </View>
                  <CustomButton onPress={() => onPressReviewRBS()}>
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
                <FlatList
                  data={[...reviewItem?.reviewPhotoArr] || []}
                  renderItem={({ item: imgItem, index }) => (
                    <CustomButton onPress={() => onTotalImage(reviewItem.idx, index)} effect={false}>
                      <View style={{ marginTop: 16, marginRight: index === 3 ? 0 : 8 }}>
                        <View style={{ width: width * 0.47, height: width * 0.47 * 0.625 }}>
                          <FastImage
                            style={{ width: '100%', height: '100%', borderRadius: 5 }}
                            source={{ uri: imgItem || '' }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      </View>
                    </CustomButton>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  windowSize={7}
                  horizontal
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 1,
                backgroundColor: Color.Gray300,
                marginTop: 24,
                width: width - 40,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={7}
      />
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
          더보기
        </CustomText>
      </View>
    </View>
  ) : (
    renderEmptyArea()
  );
};

export default ReviewArea;