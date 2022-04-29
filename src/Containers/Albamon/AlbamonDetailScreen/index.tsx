import React, { useEffect } from 'react';
import { View, Text, FlatList, Platform, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color, Opacity } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import AlbamonActions from '@/Stores/Albamon/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { numberFormat } from '@/Components/Function';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import CommonActions from '@/Stores/Common/Actions';

const AlbamonDetailScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo, competitionInfo } = useSelector((state: CommonState) => state.common);
  const { userInfo, userIdx } = useSelector((state: AuthState) => state.auth);
  const { competitionsRegistInfo } = useSelector((state: AlbamonState) => state.albamon);
  const currentDate = moment().format('YYYYMMDD');
  const secondQualifiersDate = '20220521';
  const thirdQualifiersDate = '20220611';
  const fourthQualifiersDate = '20220709';

  useEffect(() => {
    dispatch(CommonActions.fetchCommonCode({ parentCode: 'competition', code: 'alkorbol' }));
    if (userIdx) {
      dispatch(AuthActions.fetchUserInfo({ idx: userIdx }));
    }
  }, []);

  const onPressRegist = () => {
    if (!userIdx) {
      navigate('SimpleLoginScreen');
      return;
    }

    dispatch(
      AlbamonActions.fetchCompetitionsRegistInfo({
        currentScreen: 'AlbamonDetailScreen',
        placeIdx: -1,
        placeDetailName: '',
        competitionIdx: competitionInfo?.value,
      }),
    );
    // navigate('RegistScreen', { placeIdx: -1, placeDetailName: '' });
  };

  console.log('userInfo?.competitionsYn : ', userInfo);

  return (
    <View style={{ flex: 1, backgroundColor: Color.Point1000 }}>
      <Header type={'back'} text={'2022 알바몬 코리아 볼링왕'} />
      <FlatList
        data={[0]}
        renderItem={({ item, index }) => (
          <View>
            <View style={{ width, height: (width / 375) * 959 }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={{
                  uri:
                    currentDate > fourthQualifiersDate
                      ? 'https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/imgBannerDetail4%403x.png'
                      : currentDate > thirdQualifiersDate
                      ? 'https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/imgBannerDetail3%403x.png'
                      : currentDate > secondQualifiersDate
                      ? 'https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/imgBannerDetail2%403x.png'
                      : 'https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/imgBannerDetail1%403x.png',
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={7}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 12,
          marginBottom: heightInfo.statusHeight,
        }}
      >
        {userInfo?.competitionsYn === 'N' || !userIdx ? (
          <CustomButton
            onPress={() => onPressRegist()}
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 3,
              borderWidth: 1,
              borderColor: Color.Primary1000,
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
            }}
          >
            <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
              예선 신청하기
            </CustomText>
          </CustomButton>
        ) : (
          <CustomButton
            onPress={() => navigate('RegistCompleteScreen')}
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 3,
              borderWidth: 1,
              borderColor: Color.Primary1000,
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
            }}
          >
            <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
              예선 신청내역 보기
            </CustomText>
          </CustomButton>
        )}
      </View>
    </View>
  );
};
export default AlbamonDetailScreen;
