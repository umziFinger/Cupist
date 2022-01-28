import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { Layout } from '@react-navigation/stack/lib/typescript/src/types';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigateGoBack } from '@/Services/NavigationService';
import CustomText from '@/Components/CustomText';
import { HeaderProps } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { PlaceState } from '@/Stores/Place/InitialState';
import TopDateSelector from '@/Components/Calendar/TopDateSelector';
import { HomeState } from '@/Stores/Home/InitialState';
import DateFilter from '@/Components/FilterSilder/DateFilter';

const PlaceDetailHeader = (props: HeaderProps) => {
  const { text, isShow } = props;
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { placeListType } = useSelector((state: PlaceState) => state.place);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const bgColor = Color.White;

  useEffect(() => {}, [headerHeight]);

  const onLayout = (e: Layout) => {
    setHeaderHeight(e.height);
  };

  return (
    <>
      <View
        onLayout={(event) => onLayout(event.nativeEvent.layout)}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: Platform.OS === 'android' ? 44 : 44 + statusHeight,
          paddingTop: Platform.OS === 'android' ? 0 : statusHeight,
          paddingHorizontal: 16,
          backgroundColor: bgColor,
        }}
      >
        <CustomButton onPress={() => navigateGoBack()} hitSlop={20}>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icBack.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: '500',
              letterSpacing: -0.2,
              color: Color.Black1000,
            }}
          >
            {isShow && text}
          </CustomText>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {isShow && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: headerHeight,
            bottom: 0,
            left: 0,
            right: 0,
            height: 24 + 24 + 2 + 9,
            backgroundColor: Color.White,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(240,240,240)',
          }}
        >
          <TopDateSelector calendarDate={calendarDate} />
        </View>
      )}

      {/* {placeListType === 'early' && isShow && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: headerHeight,
            bottom: 0,
            left: 0,
            right: 0,
            height: 33 + 8 + 12,
            backgroundColor: Color.White,
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(240,240,240)',
          }}
        >
          <View style={{ position: 'absolute', zIndex: 999, top: 8, paddingLeft: 16 }}>
            <DateFilter />
          </View>
        </View>
      )} */}
    </>
  );
};

export default PlaceDetailHeader;
