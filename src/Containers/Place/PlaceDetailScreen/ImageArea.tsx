import React, { useState } from 'react';
import { FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
}

const ImageArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { item } = props;
  const [viewableIndex, setViewableIndex] = useState<number>(0);

  const onViewableItemsChanged = React.useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (info.viewableItems) {
        const tempViewableIndex = info.viewableItems[0]?.key;
        let changeViewableIndex = 0;
        if (tempViewableIndex !== undefined) {
          changeViewableIndex = parseInt(tempViewableIndex);
        }
        setViewableIndex(changeViewableIndex);
      }
    },
  );

  const onTotalImage = (value: number) => {
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'totalImage',
        data: {
          totalImageType: 'placeDetail',
          totalImageList: item.placePhotoArr,
        },
      }),
    );
    navigate('TotalImageScreen', { startIdx: value });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={item.placePhotoArr || []}
        renderItem={({ item: image, index }) => (
          <CustomButton onPress={() => onTotalImage(index)} effect={false}>
            <View
              style={{
                width,
                height: width * 0.5,
                backgroundColor: Color.White,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: image || '',
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
        )}
        ListEmptyComponent={
          <View
            style={{
              width,
              height: width * 0.5,
              backgroundColor: Color.White,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icNoImage.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        pagingEnabled
        horizontal
        disableIntervalMomentum
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        onViewableItemsChanged={onViewableItemsChanged?.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      {/* 이미지 페이징 영역 */}
      {item.placePhotoArr && (
        <View style={{ position: 'absolute', bottom: 12, right: 12 }}>
          <View
            style={{
              paddingVertical: 7.5,
              paddingHorizontal: 10,
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 15,
            }}
          >
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.White, fontSize: 10 }}>{`${viewableIndex + 1 || 0} / ${
                item.placePhotoArr?.length || 0
              }`}</CustomText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ImageArea;
