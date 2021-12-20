import React, { useState } from 'react';
import { FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigateAndSimpleReset } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import { DATA_WALK_THROUGH_IMAGE } from './data';

const WalkThroughScreen = () => {
  const { width, height } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
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

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingTop: heightInfo.statusHeight }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA_WALK_THROUGH_IMAGE}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {index === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: 125, height: 40 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/WalkThrough/logoWalk.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 16 }}>
                    <CustomText style={{ color: Color.Gray600, fontSize: 20, letterSpacing: -0.35 }}>
                      쉽고 편한 볼링장 예약 어플
                    </CustomText>
                  </View>
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <CustomText
                    style={{
                      color: Color.Black1000,
                      fontSize: 22,
                      fontWeight: 'bold',
                      letterSpacing: -0.38,
                      textAlign: 'center',
                    }}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.Gray600,
                      fontSize: 14,
                      letterSpacing: -0.25,
                      textAlign: 'center',
                      marginTop: 15,
                    }}
                  >
                    {item.content}
                  </CustomText>
                </View>
              )}
              <View style={{ flex: 0.6, width, height: width * 1.1, marginTop: index === 0 ? 47 : 35 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={item.img}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          snapToInterval={width}
          snapToAlignment={'start'}
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          disableIntervalMomentum
          renderToHardwareTextureAndroid
          horizontal
          removeClippedSubviews
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          // contentContainerStyle={{ paddingTop: height * 0.1 }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: heightInfo.fixBottomHeight + 24 + 48 + 28,
            alignItems: 'center',
            left: 3,
            right: 0,
            height: 6,
          }}
        >
          <FlatList
            data={DATA_WALK_THROUGH_IMAGE}
            renderItem={({ index }) =>
              viewableIndex === index ? (
                <View
                  style={{ width: 19, height: 6, marginRight: 4, borderRadius: 50, backgroundColor: Color.Gray800 }}
                />
              ) : (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    marginRight: 4,
                    borderRadius: 50,
                    backgroundColor: Color.Gray300,
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

      <CustomButton
        onPress={() => navigateAndSimpleReset('Main')}
        style={{ position: 'absolute', bottom: heightInfo.fixBottomHeight + 24, left: 24, right: 24 }}
      >
        <View
          style={{
            backgroundColor: Color.Primary1000,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            paddingVertical: 15,
          }}
        >
          <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
            시작하기
          </CustomText>
        </View>
      </CustomButton>
    </View>
  );
};

export default WalkThroughScreen;
