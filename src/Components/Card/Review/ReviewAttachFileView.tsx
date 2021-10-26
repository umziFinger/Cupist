import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';

interface ReviewAttachFileView {
  item: any;
  afterImg: any;
  beforeImg: any;
}

const { width } = Dimensions.get('window');
const ReviewAttachFileView = (props: ReviewAttachFileView) => {
  const dispatch = useDispatch();

  const { item, afterImg, beforeImg } = props;
  const photoCnt = item?.length || 0;

  const onTotalImage = (index: number) => {
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'totalImage',
        data: {
          totalImageType: 'review',
          totalImageList: [...beforeImg, ...afterImg],
        },
      }),
    );
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'totalSelectImageIndex',
        data: index,
      }),
    );

    navigate('TotalImageScreen', { startIdx: index });
  };

  const card = (data: any, index: number) => {
    if (photoCnt === 1) {
      return (
        <View style={{ width: '100%', height: 95 }}>
          <CustomButton onPress={() => onTotalImage(index)} effect={false}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={{ uri: data.image_url }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </CustomButton>
        </View>
      );
    }
    if (photoCnt === 2) {
      return (
        <View style={{ width: '48%', height: 95 }}>
          <CustomButton onPress={() => onTotalImage(index)} effect={false}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={{ uri: data.image_url }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </CustomButton>
        </View>
      );
    }
    if (photoCnt >= 3) {
      return (
        <View style={{ width: '32%', height: 95, marginTop: index > 2 ? 5 : 0 }}>
          <CustomButton onPress={() => onTotalImage(index)} effect={false}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={{ uri: data.image_url }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </CustomButton>
        </View>
      );
    }
    return (
      <View style={{ width: '48%', height: 95 }}>
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          source={{ uri: data.image_url }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };
  if (photoCnt) {
    return (
      <View style={{ width: width - 80 }}>
        <FlatList
          data={item}
          renderItem={({ item: photo, index }) => card(photo, index)}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          keyExtractor={(keyItem, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
        />
      </View>
    );
  }
  return null;
};

export default ReviewAttachFileView;
