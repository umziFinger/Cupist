import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import CustomText from '@/Components/CustomText';
import { HeaderProps } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { AuthState } from '@/Stores/Auth/InitialState';
import MyActions from '@/Stores/My/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

const PlaceReviewHeader = (props: HeaderProps) => {
  const { text } = props;
  const dispatch = useDispatch();

  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { placeReview, placeDetail } = useSelector((state: PlaceState) => state.place);

  const bgColor = Color.White;

  const onReviewWrite = () => {
    dispatch(
      MyActions.fetchMyReducer({
        type: 'writeReviewInfo',
        data: {
          paymentIdx: placeReview.user.paymentIdx,
          placeIdx: placeDetail?.place?.idx,
          placeName: placeDetail?.place?.name,
          ticketName: placeReview.user.ticketName,
          star: 0,
          content: '',
          files: '',
        },
      }),
    );
    navigate('WriteReviewDetailScreen', { type: 'placeReview' });
  };

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

      {placeReview?.user?.isWriteable && (
        <CustomButton onPress={() => onReviewWrite()}>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Button/icModify.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
      )}
    </View>
  );
};

export default PlaceReviewHeader;
