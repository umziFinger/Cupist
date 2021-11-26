import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { MyState } from '@/Stores/My/InitialState';
import Star from '@/Components/Star';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';

const WriteReviewScreen = () => {
  const dispatch = useDispatch();
  const { writeReviewInfo } = useSelector((state: MyState) => state.my);

  const onStarUpdate = (e: number) => {
    dispatch(
      MyActions.fetchMyReducer({
        type: 'setWriteReview',
        data: { key: 'star', value: e },
      }),
    );
    navigate('WriteReviewDetailScreen', { type: 'my' });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header type={'back'} />
      <View style={{ backgroundColor: Color.White, flex: 1, paddingTop: 91, alignItems: 'center' }}>
        <FlatList
          data={[0]}
          renderItem={({ index }) => (
            <View>
              <CustomText
                style={{
                  fontSize: 24,
                  letterSpacing: -0.5,
                  color: Color.Black1000,
                }}
              >
                볼링장 이용은 어떠셨나요?
              </CustomText>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
                  {writeReviewInfo?.placeName || ''}
                </CustomText>
              </View>

              <View style={{ alignItems: 'center', marginTop: 8 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                  {writeReviewInfo?.ticketName || ''}
                </CustomText>
              </View>

              <View style={{ alignItems: 'center', marginTop: 80 }}>
                <Star
                  default={writeReviewInfo?.star || 0}
                  opacity
                  count={5}
                  starSize={48}
                  spacing={0}
                  fullStar={require('@/Assets/Images/Common/icStarOnBig.png')}
                  emptyStar={require('@/Assets/Images/Common/icStarOffBig.png')}
                  update={(e: any) => onStarUpdate(e)}
                />
              </View>
            </View>
          )}
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default WriteReviewScreen;
