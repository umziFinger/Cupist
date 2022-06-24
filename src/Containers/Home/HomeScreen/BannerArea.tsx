import React, { createRef, useEffect, useRef, useState } from 'react';
import { FlatList, Linking, Platform, useWindowDimensions, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import MyActions from '@/Stores/My/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { useIsFocused } from '@react-navigation/native';

interface PropTypes {
  list: Array<any>;
}
const BannerArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const flatRef = createRef<any>();
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();
  const { list } = props;

  const [transList, setTransList] = useState<Array<any>>(list);
  const [bannerPage, setBannerPage] = useState<number>(1);
  const [isBannerScroll, setIsBannerScroll] = useState(true);

  const perPage = transList?.length || 0;
  const interval = useRef<any>();

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, [isBannerScroll]);

  useEffect(() => {
    if (!isFocused) {
      clearInterval(interval.current);
    } else {
      interval.current = setInterval(() => {
        if (isBannerScroll) {
          // console.log('인터벌::', isBannerScroll);
          setBannerPage((state) => {
            return state + 1;
          });
        }
      }, 5000);
    }
  }, [isFocused, isBannerScroll]);

  useEffect(() => {
    if (flatRef) {
      if (bannerPage === transList.length - 1) {
        const arr = [...transList, ...list];
        setTransList(arr);
      }
      if (bannerPage >= perPage) {
        setBannerPage(0);
      } else if (Platform.OS === 'android') {
        flatRef?.current?.scrollToIndex({ index: bannerPage, animated: true });
      } else {
        flatRef?.current?.scrollToIndex({ index: bannerPage, animated: true });
      }
    }
  }, [bannerPage]);

  const getItemLayout = (data: any, index: any) => {
    return { length: width - 32, offset: (width - 32) * index, index };
  };

  const onMoveEventDetail = (item: any) => {
    console.log('onMoveEventDetail: ', item);

    if (item?.linkType === 'screen') {
      switch (item.linkScreen) {
        case 'EventDetailScreen': {
          const params = {
            eventIdx: item.idx,
          };
          dispatch(MyActions.fetchMyEventDetailInfo(params));
          break;
        }

        default:
          break;
      }
    } else if (item?.linkType === 'kakao') {
      onOpenKaKaoChat(item?.linkUrl || 'http://pf.kakao.com/_nbhwb/chat');
    } else if (item?.linkType === 'link') {
      if (item?.linkUrl) {
        Linking.openURL('url')
          .then((r) => console.log('이벤트 링크 열기 성공', r))
          .catch((e) => {
            console.log('이벤트 링크 열기 에러', e);
            Linking.openURL(item?.linkUrl).then(() => console.log('이벤트 링크 열기 실패, 웹뷰 던지기'));
          });
      } else {
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: '링크가 존재하지 않습니다.',
            },
          }),
        );
      }
    }
  };

  const onOpenKaKaoChat = (url: string) => {
    if (url) {
      Linking.openURL('url')
        .then((r) => console.log('문의하기 성공', r))
        .catch((e) => {
          console.log('문의하기 에러', e);
          Linking.openURL(url).then(() => console.log('문의하기 링크 실패, 웹뷰 던지기'));
        });
    }
  };

  const onViewableItemsChanged = React.useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      // console.log('info : ', info);
      // if (info.viewableItems) {
      //   const tempViewableIndex = info.viewableItems[0]?.key;
      //   let changeViewableIndex = 0;
      //   if (tempViewableIndex !== undefined) {
      //     changeViewableIndex = parseInt(page);
      //   }
      //   setViewableIndex(changeViewableIndex);
      // }
      if (info.changed) {
        const tempIdx: number = info.changed[0]?.index || bannerPage;
        // console.log('change:', tempIdx);
        setBannerPage(tempIdx);
      }
    },
  );

  const tickHandler = (key: 'on' | 'off') => {
    if (key === 'on') {
      // console.log('##############on#########');
      setIsBannerScroll(true);
    } else {
      // console.log('@@@@@@@@@@@@@off@@@@@@@@@@');
      setIsBannerScroll(false);
    }
  };
  return (
    <View style={{ flex: 1, marginTop: 60, paddingHorizontal: 16 }}>
      <FlatList
        ref={flatRef}
        data={transList}
        renderItem={({ item }) => (
          <CustomButton onPress={() => onMoveEventDetail(item)}>
            <View
              style={{
                width: width - 32,
                height: (width - 32) * 0.75,
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
        onScrollBeginDrag={() => {
          tickHandler('off');
        }}
        onScrollEndDrag={() => {
          tickHandler('on');
        }}
        disableIntervalMomentum
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged?.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        snapToOffsets={[...Array(transList.length)].map((x, i) => i * (width - 32))}
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
          renderItem={({ index }) => {
            return (
              <View>
                {bannerPage % list?.length === index ? (
                  <View style={{ width: 6, height: 6, marginRight: 4, borderRadius: 50, backgroundColor: 'white' }} />
                ) : (
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      marginRight: 4,
                      borderRadius: 50,
                      backgroundColor: 'rgba(255,255,255,0.4)',
                    }}
                  />
                )}
              </View>
            );
          }}
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

export default BannerArea;
