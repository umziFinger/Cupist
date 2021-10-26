import React from 'react';
import { View } from 'react-native';
import Star from '@/Components/Star';
import { Color, Opacity } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import ReviewAttachFileView from '@/Components/Card/Review/ReviewAttachFileView';
import { navigate } from '@/Services/NavigationService';
import CustomButton from '@/Components/CustomButton';

const ReviewVerticalItem = (props: any) => {
  const { item, type } = props;

  let showAttachFileArr;
  let totalImageClick = false;
  if (type === 'home') {
    showAttachFileArr = item.after;
    totalImageClick = false;
  } else if (type === 'all') {
    showAttachFileArr = item.after;
    totalImageClick = true;
  } else if (type === 'my') {
    showAttachFileArr = item.after;
    totalImageClick = true;
  }

  // 이미지 최대 3개 처리
  let newAttachFileArr;
  if (showAttachFileArr && showAttachFileArr.length) {
    newAttachFileArr = showAttachFileArr.filter((x: any, index: number) => {
      return index < 3;
    });
  }

  const onReviewScreen = () => {
    navigate('ReviewScreen', { type });
  };

  return (
    <CustomButton onPress={() => onReviewScreen()} effect={false}>
      <View
        style={{
          paddingTop: 18,
          paddingHorizontal: 16,
          backgroundColor: `${Color.Gray800}${Opacity._40}`,
          borderRadius: 15,
          marginBottom: 16,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Star
              default={item?.points / 10 || 0}
              opacity
              count={5}
              starSize={15}
              spacing={2.2}
              disabled
              fullStar={require('@/Assets/Images/Common/icStarOn.png')}
              emptyStar={require('@/Assets/Images/Common/icStarOff.png')}
            />
            <View style={{ marginLeft: 15 }}>
              <CustomText style={{ fontSize: 13, color: Color.Black1000 }}>{`${item?.user_name || ''}`}</CustomText>
            </View>
            <View style={{ marginLeft: 12 }}>
              <CustomText style={{ fontSize: 13, color: Color.Gray800, letterSpacing: -0.33 }}>
                {item?.register_time || ''}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <ReviewAttachFileView item={newAttachFileArr} afterImg={item?.after} beforeImg={item?.before} />
        </View>

        <View
          style={{
            marginTop: 16,
            paddingBottom: 18,
          }}
        >
          <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.25 }} numberOfLines={3}>
            {`${item?.message || ''}`}
          </CustomText>
        </View>
      </View>
    </CustomButton>
  );
};

export default ReviewVerticalItem;
