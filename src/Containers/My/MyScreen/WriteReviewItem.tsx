import { FlatList, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color, Opacity } from '@/Assets/Color';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import Star from '@/Components/Star';
import CommonActions from '@/Stores/Common/Actions';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';
import CustomShowMore from '@/Components/CustomShowMore';

const WriteReviewItem = () => {
  const dispatch = useDispatch();

  const { myReviewList } = useSelector((state: MyState) => state.my);
  const { width } = useWindowDimensions();
  const onPressReviewRBS = (item: any) => {
    console.log('더보기', item);
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenMyReviewMoreRBS', data: true }));
    dispatch(MyActions.fetchMyReducer({ type: 'clickedReviewItem', data: item }));
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: Color.Gray300,
          paddingHorizontal: 24,
        }}
      >
        <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
          내가 쓴 리뷰
        </CustomText>
        <View style={{ marginLeft: 2 }}>
          <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Primary1000 }}>
            {myReviewList?.writeReview?.length || ''}
          </CustomText>
        </View>
      </View>
      <View style={{}}>
        <FlatList
          data={myReviewList?.writeReview}
          renderItem={({ item, index }) => (
            <View
              style={{
                borderRadius: 5,
                backgroundColor: Color.White,
                paddingVertical: 20,
                borderBottomWidth: myReviewList?.writeReview?.length - 1 === index ? 0 : 1,
                borderBottomColor: Color.Gray300,
              }}
            >
              <View style={{ paddingHorizontal: 24 }}>
                <CustomButton onPress={() => navigate('PlaceDetailScreen', { idx: item.placeIdx })}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomText
                      style={{ fontSize: 15, fontWeight: '500', letterSpacing: -0.2, color: Color.Black1000 }}
                    >
                      {item?.placeName || ''}
                    </CustomText>
                    <View style={{ width: 16, height: 16, marginLeft: 2 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </CustomButton>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Star
                      default={item?.PlaceReview?.star || 0}
                      opacity
                      count={5}
                      starSize={12}
                      spacing={0}
                      disabled
                      fullStar={require('@/Assets/Images/Common/icStarOnBig.png')}
                      emptyStar={require('@/Assets/Images/Common/icStarOffBig.png')}
                    />
                    <View>
                      <CustomText style={{ fontSize: 10, letterSpacing: 0, color: Color.Gray800 }}>
                        {item?.PlaceReview?.regDateView || ''}
                      </CustomText>
                    </View>
                  </View>
                  <CustomButton onPress={() => onPressReviewRBS(item)}>
                    <View style={{ width: 16, height: 16 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Button/icReveiwPlus.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </CustomButton>
                </View>

                <View style={{ marginTop: 13 }}>
                  <CustomText
                    style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}
                  >
                    {item?.PlaceReview?.visitCnt || 1}번째 방문
                  </CustomText>
                </View>

                <View style={{ marginTop: 10 }}>
                  <CustomShowMore
                    text={item?.PlaceReview?.content || ''}
                    targetLines={2}
                    backgroundColor={'transparent'}
                    textColor={Color.Black1000}
                    buttonColor={Color.Primary1000}
                  />
                </View>
              </View>

              {item?.reviewPhoto?.length > 0 && (
                <FlatList
                  data={item?.reviewPhoto}
                  renderItem={({ item: reviewPhoto }) => (
                    <View
                      style={{
                        width: 176,
                        height: 110,
                        borderRadius: 5,
                        // marginLeft: reviewPhotoIndex === 0 ? 8 : 18,
                        marginRight: 8,
                        backgroundColor: Color.Gray200,
                        alignSelf: 'center',
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 5 }}
                        source={{ uri: reviewPhoto.url || '' }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  )}
                  keyExtractor={(photo, photoKey) => photoKey.toString()}
                  contentContainerStyle={{ paddingLeft: 24, marginTop: 16 }}
                  horizontal
                  initialNumToRender={5}
                  maxToRenderPerBatch={8}
                  windowSize={7}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>
          )}
          initialNumToRender={7}
          maxToRenderPerBatch={10}
          windowSize={7}
          scrollEnabled={false}
        />
      </View>
    </>
  );
};

export default WriteReviewItem;
