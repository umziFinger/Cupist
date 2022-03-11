import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
}

const EventHotCard = ({ item }: PropTypes) => {
  return (
    <CustomButton onPress={() => navigate('EventHotDetailScreen', { eventIdx: item?.idx })}>
      <View style={{ backgroundColor: Color.White, flexDirection: 'row' }}>
        <View style={{ width: 80, height: 80, borderRadius: 5 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={item?.placePhoto ? { uri: item?.placePhoto } : require('@/Assets/Images/Common/icNoImage.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={{ marginLeft: 12, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CustomText
              style={{ color: Color.Black1000, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 }}
              numberOfLines={2}
            >
              {item?.title || ''}
            </CustomText>
          </View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow1000 }} numberOfLines={1}>
                {item?.area || '지역정보없음'}
                <CustomText style={{ color: Color.Gray300, fontSize: 12 }}>{'  |  '}</CustomText>
                {item?.placeName || ''}
              </CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomText style={{ color: Color.Gray700, fontSize: 12 }} numberOfLines={1}>
                일시: {item?.dateView || ''}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </CustomButton>
  );
};

export default EventHotCard;
