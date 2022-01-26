import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import EventHotCard from '@/Components/Card/Home/EventHotCard';

interface PropTypes {
  list: Array<any>;
}
const EventHotArea = (props: PropTypes) => {
  const { list } = props;

  const onPressViewAll = () => {
    console.log('onPressViewAll');
    navigate('HotPlaceListScreen');
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              이벤트 HOT
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
              캡슐, 솔로 각종 이벤트 볼링장
            </CustomText>
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
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 5 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20 }}>
              <EventHotCard item={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          maxToRenderPerBatch={8}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default EventHotArea;
