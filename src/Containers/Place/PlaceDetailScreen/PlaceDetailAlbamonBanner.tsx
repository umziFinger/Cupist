import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';

const PlaceDetailAlbamonBanner = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const alreadyRegist = false;

  const onPressBanner = () => {
    if (alreadyRegist) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogDataType: '',
            alertDialogTitle: '이미 신청서를 작성한 회원입니다.',
          },
        }),
      );
      return;
    }
    navigate('RegistScreen');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <CustomButton style={{ width: width - 48, height: ((width - 48) / 327) * 92 }} onPress={() => onPressBanner()}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={require('@/Assets/Images/Albamon/albamonBanner.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </CustomButton>
    </View>
  );
};

export default PlaceDetailAlbamonBanner;
