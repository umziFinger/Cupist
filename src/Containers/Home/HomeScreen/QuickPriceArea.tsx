import React, { useRef, useState } from 'react';
import { Animated, Platform, useWindowDimensions, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import QuickPriceCard from '@/Components/Card/Home/QuickPriceCard';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  list: Array<any>;
}
const QuickPriceArea = (props: PropTypes) => {
  const { width, height } = useWindowDimensions();
  const { list } = props;
  const animatedFlatRef = useRef<any>();
  const [viewableIndex, setViewableIndex] = useState<number | null>(0);

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
    navigate('PlaceListScreen', { type: 'special' });
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              빨리 특가
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
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          <View style={{ flex: 1 }}>
            <CustomText style={{ color: Color.Gray800, fontSize: 15, letterSpacing: -0.2 }}>
              선착순 할인 특가로 즐기는 볼링장
            </CustomText>
          </View>
          <CustomButton onPress={() => onPressViewAll()}>
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
      <Animated.FlatList
        data={list}
        ref={animatedFlatRef}
        renderItem={({ item, index }) => {
          return (
            <View style={{ marginHorizontal: 4 }}>
              <QuickPriceCard item={item} />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        scrollEventThrottle={16}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        windowSize={7}
        snapToInterval={width - 32}
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
        contentContainerStyle={{ marginTop: 24 }}
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
    </View>
  );
};

export default QuickPriceArea;
