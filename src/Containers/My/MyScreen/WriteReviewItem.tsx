import { FlatList, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ReviewList from '@/Containers/My/MyScreen/ReviewList';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import Star from '@/Components/Star';

const WriteReviewItem = () => {
  const { myReviewList } = useSelector((state: MyState) => state.my);

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
            <CustomButton>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Color.White,
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.Gray300,
                }}
              >
                <View style={{ paddingHorizontal: 24 }}>
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
                    <View style={{ width: 16, height: 16 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Button/icReveiwPlus.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>

                  <View style={{ marginTop: 13 }}>
                    <CustomText
                      style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}
                    >
                      n번째 방문
                    </CustomText>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <CustomText
                      numberOfLines={4}
                      style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}
                    >
                      {item?.PlaceReview?.content || ''}
                    </CustomText>
                  </View>
                </View>
              </View>
            </CustomButton>
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
