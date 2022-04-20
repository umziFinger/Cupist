import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';

const PlaceDetailAlbamonBanner = () => {
  const { width } = useWindowDimensions();
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const { placeDetail } = useSelector((state: PlaceState) => state.place);
  const dispatch = useDispatch();
  const place = placeDetail?.place;
  const onPressBanner = () => {
    if (userInfo?.competitionsYn === 'Y') {
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
    if (place?.albamonYn === 'Y') {
      navigate('RegistScreen', { placeDetailName: place?.name });
    } else if (place?.albamonYn === 'N') {
      navigate('AlbamonDetailScreen');
    }
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
