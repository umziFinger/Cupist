import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { Layout } from '@react-navigation/stack/lib/typescript/src/types';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import CustomText from '@/Components/CustomText';
import { HeaderProps } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { AuthState } from '@/Stores/Auth/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import TopDateSelector from '@/Components/Calendar/TopDateSelector';
import { HomeState } from '@/Stores/Home/InitialState';

const PlaceDetailHeader = (props: HeaderProps) => {
  const { text, isShow } = props;
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { placeDetailIdx } = useSelector((state: PlaceState) => state.place);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  console.log('isShow : ', isShow);

  const bgColor = Color.White;

  const onPressShare = () => {
    console.log('onPressShare');
  };

  const onPressDibs = () => {
    if (!userIdx) {
      return navigate('SimpleLoginScreen');
    }
    return console.log('onPressDibs');
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
        <CustomButton onPress={() => onPressDibs()}>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Button/icHeartBorder.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
      </View>

      {isShow && <TopDateSelector calendarDate={calendarDate} headerHeight={headerHeight} />}
    </>
  );
};

export default PlaceDetailHeader;
