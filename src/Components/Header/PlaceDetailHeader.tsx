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
import usePlaceDibs from '@/Hooks/usePlaceDibs';
import CreateDynamicLink from '@/Components/Share/CreateDynamicLink';
import CommonShare from '@/Components/Share/CommonShare';
import { AlbamonState } from '@/Stores/Albamon/InitialState';

const PlaceDetailHeader = (props: HeaderProps) => {
  const { text, isShow } = props;
  const { handlerPlaceDibs } = usePlaceDibs();
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { placeDetail } = useSelector((state: PlaceState) => state.place);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const { placeDetailSelectedTab, albamonDate } = useSelector((state: AlbamonState) => state.albamon);

  const bgColor = Color.White;

  const onPressShare = async () => {
    console.log('onPressShare');
    const placeIdx = placeDetail?.place?.idx || -1;
    const link = await CreateDynamicLink({ type: 'placeDetail', idx: placeIdx });
    console.log('link : ', link);
    const params = {
      type: 'placeDetail',
      data: placeDetail?.place || '',
    };
    await CommonShare(params);
  };

  useEffect(() => {
    // console.log('headerHeight : ', headerHeight);
  }, [headerHeight]);

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
            {text}
          </CustomText>
        </View>
        <CustomButton onPress={() => onPressShare()}>
          <View style={{ width: 24, height: 24, marginRight: 12 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Button/icShare.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
        <CustomButton onPress={() => handlerPlaceDibs(placeDetail.place)}>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                placeDetail?.place?.isPlaceDibs
                  ? require('@/Assets/Images/Button/icHeartOn.png')
                  : require('@/Assets/Images/Button/icHeartBorder.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
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
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(240,240,240)',
          }}
        >
          <TopDateSelector calendarDate={placeDetailSelectedTab.key === 'default' ? calendarDate : albamonDate} />
        </View>
      )}
    </>
  );
};

export default PlaceDetailHeader;
