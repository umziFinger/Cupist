import React, { useState } from 'react';
import { FlatList, Platform, useWindowDimensions, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import PlaceSmallCard from '@/Components/Card/Common/PlaceSmallCard';
import HotPlaceCard from '@/Components/Card/Home/HotPlaceCard';

interface PropTypes {
  list: Array<any>;
}
const HotArea = (props: PropTypes) => {
  const { width, height } = useWindowDimensions();
  const { list } = props;
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
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              볼리미 HOT
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
              요즘 가장 핫한 BEST 볼링장
            </CustomText>
          </View>
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
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 25 }}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <View style={{ marginRight: index === list.length - 1 ? 20 : 9 }}>
              <HotPlaceCard item={item} width={(width - 40) * 0.7} />
            </View>
          )}
          pagingEnabled
          horizontal
          disableIntervalMomentum
          decelerationRate="fast"
          snapToInterval={(width - 40 + 18) * 0.7}
          snapToAlignment={'start'}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged?.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 18,
          }}
          // ListFooterComponent={item.length === 0 ? <RepairUploadCard /> : renderFooterCard()}
          // ListFooterComponentStyle={{ paddingRight: 24 }}
        />
      </View>
    </View>
  );
};

export default HotArea;
