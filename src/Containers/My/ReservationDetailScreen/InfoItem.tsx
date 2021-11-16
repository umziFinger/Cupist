import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';

import { MyState } from '@/Stores/My/InitialState';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { INFO_ITEM } from '@/Containers/My/ReservationDetailScreen/data';

const InfoItemScreen = () => {
  const {width}=
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomColor: Color.Gray300,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
            이용전
          </CustomText>
        </View>
        <CustomButton>
          <View style={{ paddingVertical: 5, paddingHorizontal: 8, borderRadius: 3, backgroundColor: Color.Gray300 }}>
            <CustomText
              style={{
                fontSize: 13,
                fontWeight: '500',
                letterSpacing: -0.2,
                color: Color.Gray600,
              }}
            >
              취소하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <View>
            <CustomText
              style={{
                fontSize: 17,
                fontWeight: '500',
                letterSpacing: -0.3,
                color: Color.Black1000,
              }}
            >
              롤리볼리볼링장
            </CustomText>
          </View>
          <View style={{ marginTop: 6 }}>
            <CustomText
              style={{
                fontSize: 12,
                letterSpacing: -0.22,
                color: Color.Gray600,
              }}
            >
              서울시 금천구 가산디지털1로 165
            </CustomText>
          </View>
        </View>
        <View style={{ width: 24, height: 24 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Arrow/icArrowRightHeavy.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>

      <FlatList
        data={INFO_ITEM}
        renderItem={({ item }) => (
          <CustomButton>
            <View
              style={{
                borderRadius: 5,
                backgroundColor: Color.White,
                borderWidth: 1,
                borderColor: Color.Grayyellow200,
                alignItems: 'center',
                paddingTop: 27,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 14,
                width:
              }}
            >
              <View style={{ width: 20, height: 20 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={item.icon}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <CustomText>{item.name}</CustomText>
            </View>
          </CustomButton>
        )}
        horizontal
        initialNumToRender={4}
      />
    </>
  );
};

export default InfoItemScreen;
