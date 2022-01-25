import React from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigateGoBack } from '@/Services/NavigationService';
import { HeaderProps } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';

const InviteFriendHeader = ({ text }: HeaderProps) => {
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'android' ? 44 : 44 + statusHeight,
        paddingTop: Platform.OS === 'android' ? 0 : statusHeight,
        paddingHorizontal: 16,
        backgroundColor: Color.Point1000,
      }}
    >
      <CustomButton onPress={() => navigateGoBack()} hitSlop={20}>
        <View style={{ width: 24, height: 24 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Button/icCloseWt.png')}
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
            color: Color.Black1000,
            letterSpacing: -0.2,
          }}
        >
          {text}
        </CustomText>
      </View>
      <View style={{ width: 24 }} />
    </View>
  );
};

export default InviteFriendHeader;
