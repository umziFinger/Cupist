import React, { useRef, useState } from 'react';
import { Animated, Platform, useWindowDimensions, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import FreeBowlingCard from '@/Components/Card/Home/FreeBowlingCard';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import DateFilter from '@/Components/FilterSilder/DateFilter';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';
import CustomTooltip from '@/Components/CustomTooltip';
import { DATA_HOME_TOOLTIP } from '@/Containers/Home/HomeScreen/data';

interface PropTypes {
  list: Array<any>;
}
const FreeBowlingArea = (props: PropTypes) => {
  const { width, height } = useWindowDimensions();
  const { list } = props;
  const animatedFlatRef = useRef<any>();
  const [viewableIndex, setViewableIndex] = useState<number | null>(0);
  const [tipVisible, setTipVisible] = useState<boolean>(false);

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

  const onPressViewAll = () => {
    console.log('onPressViewAll');
    navigate('PlaceListScreen', { type: TICKET_TYPE.FREE });
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ marginRight: 4 }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
                자유 볼링
              </CustomText>
            </View>
            <View style={{ width: 5, height: 5, marginBottom: 5 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icPeriod.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <CustomText style={{ color: Color.Gray800, fontSize: 15, letterSpacing: -0.2 }}>
                공유 레인 무제한 게임 예약
              </CustomText>
            </View>
            <View style={{ paddingLeft: 5, paddingBottom: 1 }}>
              <CustomTooltip isVisible={tipVisible} toggleOpen={setTipVisible} item={DATA_HOME_TOOLTIP['free']} />
            </View>
          </View>
          <CustomButton onPress={() => onPressViewAll()} hitSlop={7}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', paddingTop: Platform.select({ ios: 0, android: 1 }) }}>
                <CustomText style={{ color: Color.Gray400, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
                  모두보기
                </CustomText>
              </View>
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
        </View>
      </View>
      {/* <View style={{ paddingLeft: 20 }}> */}
      {/*  <View style={{ marginTop: 20 }}> */}
      {/*    <DateFilter /> */}
      {/*  </View> */}
      {/* </View> */}
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={list}
          ref={animatedFlatRef}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 4 }}>
                <FreeBowlingCard item={item} />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          snapToInterval={width - 52}
          snapToAlignment={'start'}
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          disableIntervalMomentum
          renderToHardwareTextureAndroid
          horizontal
          // onEndReached={() => onMore()}
          // onEndReachedThreshold={1}
          removeClippedSubviews
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          contentContainerStyle={{ marginTop: 25 }}
          ListHeaderComponent={
            <View style={{ width: list?.length - 1 === viewableIndex && list?.length !== 1 ? 0 : 16 }} />
          }
          ListFooterComponent={
            <View
              style={{
                width: list?.length - 1 === viewableIndex && list?.length !== 1 ? 12 : 0,
              }}
            />
          }
        />
        {list?.length === 0 && (
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 80,
              marginBottom: 50,
              alignItems: 'center',
            }}
          >
            <View style={{ width: 60, height: 60 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Home/emptyList.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ marginTop: 16, alignItems: 'center' }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray400, fontSize: 14, fontWeight: '500', letterSpacing: -0.25 }}>
                  해당날짜에 자유볼링 상품이 없습니다.
                </CustomText>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default FreeBowlingArea;
