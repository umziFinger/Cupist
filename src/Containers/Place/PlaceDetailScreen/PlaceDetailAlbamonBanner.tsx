import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { CommonState } from '@/Stores/Common/InitialState';

const PlaceDetailAlbamonBanner = () => {
  const { width } = useWindowDimensions();
  const { userInfo, userIdx } = useSelector((state: AuthState) => state.auth);
  const { placeDetail } = useSelector((state: PlaceState) => state.place);
  const { competitionInfo } = useSelector((state: CommonState) => state.common);
  const dispatch = useDispatch();
  const place = placeDetail?.place;
  const onPressBanner = () => {
    console.log('@@@@@@@@@@@@@@@@@ USERINFO : ', userInfo);
    if (!userIdx) {
      navigate('AlbamonDetailScreen');
      return;
    }
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
      console.log('#### place : ', place.idx);
      // dispatch(AlbamonActions.fetchCompetitionsRegistInfo({ isMoveScreen: true, placeIdx: -1, placeDetailName: '' }))
      dispatch(
        AlbamonActions.fetchCompetitionsRegistInfo({
          currentScreen: 'SupportAlbamonBanner',
          placeIdx: place?.idx,
          placeDetailName: place?.name,
          competitionIdx: competitionInfo?.value,
        }),
      );
    } else if (place?.albamonYn === 'N') {
      dispatch(
        AlbamonActions.fetchCompetitionsRegistInfo({
          currentScreen: 'UnSupportAlbamonBanner',
          placeIdx: place?.idx,
          placeDetailName: place?.name,
          competitionIdx: competitionInfo?.value,
        }),
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <CustomButton style={{ width: width - 48, height: ((width - 48) / 327) * 103 }} onPress={() => onPressBanner()}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: 'https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/albamonBanner%403x.png',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </CustomButton>
    </View>
  );
};

export default PlaceDetailAlbamonBanner;
