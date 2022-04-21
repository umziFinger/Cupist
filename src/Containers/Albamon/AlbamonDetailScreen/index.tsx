import React, { useEffect } from 'react';
import { View, Text, FlatList, Platform, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect, useDispatch, useSelector } from 'react-redux';
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

const AlbamonDetailScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { userInfo, userIdx } = useSelector((state: AuthState) => state.auth);
  const { competitionsRegistInfo } = useSelector((state: AlbamonState) => state.albamon);

  useEffect(() => {
    if (userIdx) {
      dispatch(AuthActions.fetchUserInfo({ idx: userIdx }));
    }
  }, []);

  const onPressRegist = () => {
    if (!userIdx) {
      navigate('SimpleLoginScreen');
      return;
    }
    navigate('RegistScreen', { placeDetailName: '' });
  };

  console.log('userInfo?.competitionsYn : ', userInfo);

  return (
    <View style={{ flex: 1, backgroundColor: Color.Point1000 }}>
      <Header type={'back'} text={'2022 알바몬 코리아 볼링왕'} />
      <FlatList
        data={[0]}
        renderItem={({ item, index }) => (
          <View>
            <View style={{ width, height: (width / 375) * 724 }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={{
                  uri: 'https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/bannerDetail%403x.png',
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
