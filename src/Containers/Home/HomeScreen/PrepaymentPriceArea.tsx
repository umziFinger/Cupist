import React from 'react';
import { FlatList, Platform, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import PlaceSmallCard from '@/Components/Card/Common/PlaceSmallCard';

interface PropTypes {
  list: Array<any>;
}
const PrepaymentPriceArea = (props: PropTypes) => {
  const { width, height } = useWindowDimensions();
  const { list } = props;
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              선결제 특가
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
              선결제하고 할인받는 인기 볼링장
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
        <View style={{ flex: 1, marginTop: 20 }}>
          <FlatList
            data={list}
            renderItem={({ item, index }) => (
              <View style={{ marginRight: 11, marginBottom: index < 2 ? 13 : 0 }}>
                <PlaceSmallCard item={item} width={(width - 42 - 11) / 2} showRate />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={4}
            maxToRenderPerBatch={7}
            windowSize={7}
            numColumns={2}
          />
        </View>
      </View>
    </View>
  );
};

export default PrepaymentPriceArea;
