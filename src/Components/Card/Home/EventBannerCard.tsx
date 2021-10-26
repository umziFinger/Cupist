import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, FlatList, Linking, Platform, StyleSheet, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Svg, Path } from 'react-native-svg';
import { transform } from '@babel/core';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { renderEdge } from '@/Components/Function';

interface EventBannerCardProps {
  type: string;
  pop: Array<any>;
}

const { width } = Dimensions.get('window');

const EventBannerCard = (props: EventBannerCardProps) => {
  let intervalId: any;

  const { type, pop } = props;
  const imgWidth = width - 48;
  const imgHeight = type === 'large' ? width - 48 : (width - 48) / 2;
  const [viewableIndex, setViewableIndex] = useState<number | null>(0);
  const [intervalToggle, setIntervalToggle] = useState(true);
  const [page, setPage] = useState<number>(0);
  const flatRef = createRef<any>();
  const perPage = pop?.length || 0;

  useEffect(() => {
    updatePage();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (intervalToggle && flatRef) {
      if (page >= perPage) {
        setPage(0);
      } else if (Platform.OS === 'android') {
        flatRef?.current?.scrollToIndex({ index: page, animated: true });
      } else {
        flatRef?.current?.scrollToIndex({ index: page, animated: true });
      }
    }
  }, [page]);

  useEffect(() => {
    if (intervalToggle && intervalId) {
      updatePage();
    } else {
      clearInterval(intervalId);
    }
  }, [intervalToggle]);

  const updatePage = () => {
    if (!intervalId) {
      intervalId = setInterval(tick, 5000);
    }
  };
  const tick = () => {
    if (intervalToggle && flatRef) {
      setPage((prevState) => prevState + 1);
    }
  };

  const getItemLayout = (data: any, index: any) => {
    return { length: width - 48, offset: (width - 48) * index, index };
  };

  const onPressPop = (value: string) => {
    console.log('onPressPop');
    const url = value;
    if (url) {
      Linking.openURL(url)
        .then((result) => {
          console.log('result', result);
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
  };

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

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: pop?.length > 0 ? 24 : 0,
      }}
    >
      {renderEdge('-90deg', { bottom: 0, right: 24 })}
      {renderEdge('-180deg', { top: 0, right: 24 })}
      {renderEdge('-270deg', { top: 0, left: 24 })}
      {renderEdge('0deg', { bottom: 0, left: 24 })}

      <FlatList
        ref={flatRef}
        data={pop}
        renderItem={({ item, index }) => (
          <CustomButton onPress={() => onPressPop(item?.banner_link)}>
            <View
              style={{
                width: imgWidth,
                height: imgHeight,
              }}
            >
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={{ uri: type === 'large' ? item.banner_image : item.banner_image_s || '' }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>
          </CustomButton>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={4}
        windowSize={7}
        pagingEnabled
        horizontal
        disableIntervalMomentum
        decelerationRate="fast"
        snapToInterval={width - 48}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        getItemLayout={getItemLayout}
        onScrollBeginDrag={() => console.log('start')}
        onScrollEndDrag={(event) => {
          if (viewableIndex === pop?.length - 1) {
            if (Platform.OS === 'android') {
              if (event.nativeEvent.velocity.x < 0) {
                flatRef?.current?.scrollToIndex({ index: 0, animated: true });
              }
            } else if (event.nativeEvent.velocity.x > 0) {
              flatRef?.current?.scrollToIndex({ index: 0, animated: true });
            }
          }
        }}
        onViewableItemsChanged={onViewableItemsChanged?.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          left: width - 72,
        }}
      >
        <FlatList
          data={pop}
          renderItem={({ item, index }) => (
            <View style={{ width: 6, height: 6, marginRight: 7 }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 24 }}
                source={
                  viewableIndex === index
                    ? require('@/Assets/Images/Common/icBulletOn.png')
                    : require('@/Assets/Images/Common/icBulletOff.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
          initialScrollIndex={0}
        />
      </View>
    </View>
  );
};

export default EventBannerCard;
