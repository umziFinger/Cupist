import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, Animated, ViewToken, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';

import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';

import CommonActions from '@/Stores/Common/Actions';
import CustomButton from '@/Components/CustomButton';
import { navigateGoBack } from '@/Services/NavigationService';

const { width, height } = Dimensions.get('window');

const TotalImageScreen = () => {
  const dispatch = useDispatch();
  const totalImageRef = useRef<any>();
  const scaleValue = useRef(1);
  const [scroll, setScroll] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const { totalImageType, totalImageList, totalSelectImageIndex, heightInfo } = useSelector(
    (state: CommonState) => state.common,
  );

  useEffect(() => {
    return () => {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'totalImage',
          data: { totalImageType: '', totalImageList: [] },
        }),
      );
    };
  }, []);

  const onViewableItemsChanged = React.useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (totalImageType === 'review') {
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'totalSelectImageIndex',
            data: parseInt(info.viewableItems[0].key),
          }),
        );
      }
    },
  );

  let attachFile: any;
  if (totalImageType === 'news') {
    return null;
  }

  if (totalImageType === 'review') {
    attachFile = totalImageList;
  }

  if (totalImageType === 'repairCheck') {
    attachFile = totalImageList;
  }

  const getItemLayout = (data: any, index: number) => {
    return { length: width, offset: width * index, index };
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Header type="back" /> */}
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? heightInfo.statusHeight : 0,
          backgroundColor: Color.White,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            height: 44,
            paddingHorizontal: 16,
            alignItems: 'center',
            // backgroundColor: 'green',
          }}
        >
          <CustomButton onPress={() => navigateGoBack()}>
            <View style={{ width: 24, height: 24 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Button/icCloseLightBlack.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </CustomButton>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              marginRight: 40,
              // backgroundColor: 'red',
            }}
          >
            <CustomText
              style={{
                fontSize: 17,
                letterSpacing: -0.3,
                color: Color.Black1000,
              }}
            >
              {`${totalSelectImageIndex + 1}`}
            </CustomText>
            <CustomText
              style={{
                fontSize: 17,
                letterSpacing: -0.3,
                color: Color.gray900,
              }}
            >
              {` / ${totalImageList?.length}`}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: Color.White, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width,
            height: scaleValue?.current > 1 ? height - heightInfo.statusHeight - 30 : height / 2,
          }}
        >
          <Animated.FlatList
            ref={totalImageRef}
            data={attachFile}
            renderItem={({ item }) => {
              // const imageUrl = item.uri || item.url;
              const imageUrl = item.uri || item.image_url;
              return (
                <ImageZoom
                  cropWidth={width}
                  cropHeight={
                    scaleValue?.current > 1
                      ? height - heightInfo.statusHeight - 30
                      : (height - heightInfo.subBottomHeight) / 2
                  }
                  imageWidth={width}
                  imageHeight={
                    scaleValue?.current > 1
                      ? height - heightInfo.statusHeight - 30
                      : (height - heightInfo.subBottomHeight) / 2
                  }
                  minScale={1}
                  onStartShouldSetPanResponder={(e) => {
                    setIsSelected(true);
                    return e.nativeEvent.touches.length === 2 || scaleValue?.current > 1;
                  }}
                  panToMove={!scroll}
                  onMove={({ scale }) => {
                    setScroll(scale === 1);
                    scaleValue.current = scale;
                  }}
                >
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onStartShouldSetResponder={(e) => {
                      setIsSelected(false);
                      return e.nativeEvent.touches.length < 2 && scaleValue.current <= 1;
                    }}
                  >
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      // source={imageUrl ? { uri: imageUrl || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
                      source={imageUrl ? { uri: imageUrl || '' } : { uri: '' }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  </View>
                </ImageZoom>
              );
            }}
            scrollEnabled={scroll}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            initialNumToRender={1}
            maxToRenderPerBatch={3}
            removeClippedSubviews
            windowSize={7}
            pagingEnabled
            initialScrollIndex={totalSelectImageIndex}
            getItemLayout={getItemLayout}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
          />
          {/* <View */}
          {/*  style={{ */}
          {/*    position: 'absolute', */}
          {/*    bottom: 12, */}
          {/*    left: 0, */}
          {/*    right: 0, */}
          {/*    justifyContent: 'center', */}
          {/*    alignItems: 'center', */}
          {/*  }} */}
          {/* > */}
          {/*  <View */}
          {/*    style={{ paddingHorizontal: 6, paddingVertical: 4, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 10 }} */}
          {/*  > */}
          {/*    <CustomText */}
          {/*      style={{ */}
          {/*        color: '#fff', */}
          {/*        fontSize: 12, */}
          {/*        fontWeight: '500', */}
          {/*        letterSpacing: -0.33, */}
          {/*      }} */}
          {/*    > */}
          {/*      {`${totalSelectImageIndex + 1} / ${totalImageList?.length}`} */}
          {/*    </CustomText> */}
          {/*  </View> */}
          {/* </View> */}
        </View>
      </View>
    </View>
  );
};
export default TotalImageScreen;
