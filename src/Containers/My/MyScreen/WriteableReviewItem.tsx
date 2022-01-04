import { FlatList, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';

const WriteableReviewItem = () => {
  const dispatch = useDispatch();
  const { myReviewList } = useSelector((state: MyState) => state.my);

  const onWriteReview = (item: any) => {
    dispatch(
      MyActions.fetchMyReducer({
        type: 'writeReviewInfo',
        data: {
          paymentIdx: item.paymentIdx,
          placeIdx: item.placeIdx,
          placeName: item.placeName,
          ticketName: item.placeName,
          star: 0,
          content: '',
          files: '',
        },
      }),
    );
    navigate('WriteReviewScreen');
  };

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
          리뷰 작성이 가능해요
        </CustomText>
        <View style={{ marginLeft: 2 }}>
          <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Primary1000 }}>
            {myReviewList?.writeableReview?.length || ''}
          </CustomText>
        </View>
      </View>
      <View>
        <FlatList
          data={myReviewList?.writeableReview}
          renderItem={({ item, index }) => (
            <CustomButton onPress={() => onWriteReview(item)}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Color.White,
                  borderWidth: 1,
                  borderColor: Color.Gray300,
                  paddingVertical: 16,
                  paddingLeft: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: index === 0 ? 16 : 8,
                }}
              >
                <View style={{ width: 40, height: 40, borderRadius: 5 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={
                      item?.PlacePhoto ? { uri: item?.PlacePhoto } : require('@/Assets/Images/Common/icNoImage.png')
                    }
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View>
                    <CustomText
                      style={{ fontSize: 17, fontWeight: '500', letterSpacing: -0.3, color: Color.Black1000 }}
                    >
                      {item?.placeName || ''}
                    </CustomText>
                  </View>
                  <View style={{ marginTop: 4 }}>
                    <CustomText style={{ fontSize: 12, color: Color.Gray400 }}>{item?.useDateAndTime || ''}</CustomText>
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

export default WriteableReviewItem;
