import React, { createRef, useEffect, useState } from 'react';
import { FlatList, NativeSyntheticEvent, Platform, useWindowDimensions, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import MyActions from '@/Stores/My/Actions';

interface PropTypes {
  list: Array<any>;
}
const EventArea = (props: PropTypes) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const flatRef = createRef<any>();
  const { list } = props;
  let intervalId: any;

  const [viewableIndex, setViewableIndex] = useState<number | null>(0);
  const [intervalToggle, setIntervalToggle] = useState(true);
  const [page, setPage] = useState<number>(0);
  const perPage = list?.length || 0;

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
      setPage((state) => 1 + state);
    }
  };

  const getItemLayout = (data: any, index: any) => {
    return { length: width - 48, offset: (width - 48) * index, index };
  };

  const onMoveEventDetail = (item: any) => {
    console.log('onPressPop: ', item.idx);
    const params = {
      eventIdx: item.idx,
    };
    dispatch(MyActions.fetchMyEventDetailInfo(params));
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
    <View style={{ flex: 1, marginTop: 40, paddingHorizontal: 20 }}>
      <FlatList
        ref={flatRef}
        data={list}
        renderItem={({ item, index }) => (
          <CustomButton onPress={() => onMoveEventDetail(item)}>
            <View
              style={{
                width: width - 40,
                height: (width - 40) * 0.75,
                backgroundColor: Color.White,
              }}
            >
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                source={{ uri: item?.mainFile || '' }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
        )}
        keyExtractor={(xItem, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={4}
        windowSize={7}
        pagingEnabled
        horizontal
        onScrollBeginDrag={() => console.log('start')}
        onScrollEndDrag={(event: NativeSyntheticEvent<any>) => {
          if (viewableIndex === list?.length - 1) {
            console.log('마지막이다');
            if (Platform.OS === 'android') {
              if (event?.nativeEvent?.velocity.x < 0) {
                flatRef?.current?.scrollToIndex({ index: 0, animated: true });
              }
            } else if (event?.nativeEvent.velocity.x > 0) {
              flatRef?.current?.scrollToIndex({ index: 0, animated: true });
            }
          }
        }}
        onTouchMove={() => [
          setIntervalToggle(false),
          setTimeout(() => {
            setIntervalToggle(true);
          }, 5000),
        ]}
        disableIntervalMomentum
        decelerationRate="fast"
        snapToInterval={width - 40}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged?.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 12,
          left: (width - list?.length * 6) / 2,
          height: 6,
        }}
      >
        <FlatList
          data={list}
          renderItem={({ index }) =>
            viewableIndex === index ? (
              <View style={{ width: 6, height: 6, marginRight: 4, borderRadius: 50, backgroundColor: Color.White }} />
            ) : (
              <View
                style={{
                  width: 6,
                  height: 6,
                  marginRight: 4,
                  borderRadius: 50,
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  // backgroundColor: 'red',
                }}
              />
            )
          }
          showsHorizontalScrollIndicator={false}
          keyExtractor={(zItem, index) => index.toString()}
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

export default EventArea;
