import React from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigateGoBack } from '@/Services/NavigationService';
import CustomText from '@/Components/CustomText';
import { HeaderProps, MODE } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

const BackHeader = (props: HeaderProps) => {
  const { text, mode } = props;
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);

  let bgColor = Color.White;
  if (mode === MODE.DARK) {
    bgColor = Color.Black1000;
  } else if (mode === MODE.LIGHT) {
    bgColor = Color.White;
  } else if (mode === MODE.GRAY) {
    bgColor = Color.Gray800;
  } else if (mode === MODE.DARK2) {
    bgColor = Color.Black1000;
  }
  return (
    <View
      style={{
        height: Platform.OS === 'android' ? 68 : 68 + statusHeight,
        flexDirection: 'row',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        paddingTop: Platform.OS === 'android' ? 0 : statusHeight,
      }}
    >
      <CustomButton onPress={() => navigateGoBack()} hitSlop={20}>
        <View style={{ width: 24, height: 24 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Arrow/icArrowLeftGray.png')}
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
            fontSize: 17,
            fontWeight: 'bold',
            color: mode === MODE.DARK || mode === MODE.DARK2 ? Color.White : Color.Black1000,
            letterSpacing: -0.43,
          }}
        >
          {text}
        </CustomText>
      </View>
      <View style={{ width: 24 }} />
    </View>
  );
};

export default BackHeader;
