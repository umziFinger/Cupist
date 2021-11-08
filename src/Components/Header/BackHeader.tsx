import React from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigateGoBack } from '@/Services/NavigationService';
import CustomText from '@/Components/CustomText';
import { HeaderProps } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

const BackHeader = (props: HeaderProps) => {
  const { text } = props;
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);

  const bgColor = Color.White;

  return (
    <View
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
      <View style={{ width: 24 }} />
    </View>
  );
};

export default BackHeader;
