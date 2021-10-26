import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, FlatList, Platform, ViewToken, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import HomeActions from '@/Stores/Home/Actions';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import Config from '@/Config';
import { Color } from '@/Assets/Color';
import Naver from '@/Components/Login/SocialLogin/Naver';
import Kakao from '@/Components/Login/SocialLogin/Kakao';
import Apple from '@/Components/Login/SocialLogin/Apple';
import { fetchAuthSocialLogin } from '@/Sagas/AuthSaga';

const { width, height } = Dimensions.get('window');

const SimpleLoginScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo, isOpenSimpleLoginRBS } = useSelector((state: CommonState) => state.common);
  const RBSheetRef = useRef<any>();

  let osCheck: any;
  if (Platform.OS === 'android') {
    osCheck = [
      {
        idx: 0,
        key: 'kakao',
        img: require('@/Assets/Images/Button/icKakao.png'),
        backgroundColor: Color.kakaoYellow,
        color: Color.Black1000,
        content: '카카오톡으로 계속하기',
      },
      {
        idx: 1,
        key: 'naver',
        img: require('@/Assets/Images/Button/icNaver.png'),
        backgroundColor: Color.naverGreen,
        color: Color.White,
        content: '네이버로 계속하기',
      },
    ];
  } else {
    osCheck = [
      {
        idx: 0,
        key: 'apple',
        img: require('@/Assets/Images/Button/icApple.png'),
        backgroundColor: Color.Black1000,
        color: Color.White,
        content: 'Apple로 계속하기',
      },
      {
        idx: 1,
        key: 'kakao',
        img: require('@/Assets/Images/Button/icKakao.png'),
        backgroundColor: Color.kakaoYellow,
        color: Color.Black1000,
        content: '카카오톡으로 계속하기',
      },
      {
        idx: 2,
        key: 'naver',
        img: require('@/Assets/Images/Button/icNaver.png'),
        backgroundColor: Color.naverGreen,
        color: Color.White,
        content: '네이버로 계속하기',
      },
    ];
  }

  useEffect(() => {
    return () => {
      dispatch(HomeActions.fetchHomeReducer({ type: 'loginCheckYN', data: { loginCheckYN: 'Y' } }));
    };
  }, []);

  useEffect(() => {
    if (isOpenSimpleLoginRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenSimpleLoginRBS]);

  const onPressSocialLogin = async (key: string) => {
    let params: any = {
      type: key,
    };
    switch (key) {
      case 'naver':
        try {
          const initials =
            Platform.OS === 'ios'
              ? {
                  kConsumerKey: Config.NAVER_KEY,
                  kConsumerSecret: Config.NAVER_SECRET,
                  kServiceAppName: Config.NAVER_APP_NAME,
                  kServiceAppUrlScheme: Config.NAVER_APP_URL_SCHEME, // only for iOS
                }
              : {
                  kConsumerKey: Config.NAVER_KEY,
                  kConsumerSecret: Config.NAVER_SECRET,
                  kServiceAppName: Config.NAVER_APP_NAME,
                };

          const naverToken = await Naver({ initials });
          params = { ...params, token: naverToken };
          console.log('accessToken : ', naverToken);
          // if (naverToken) dispatch(AuthActions.fetchAuthSocialLogin(params));
          if (naverToken) dispatch(AuthActions.fetchUserLogin(params));
        } catch (err) {
          console.log('naver e', err);
        }
        break;
      case 'kakao':
        try {
          const kakaoToken = await Kakao();
          params = { ...params, token: kakaoToken };
          console.log('accessToken : ', kakaoToken);
          // if (kakaoToken) dispatch(AuthActions.fetchAuthSocialLogin(params));
          if (kakaoToken) dispatch(AuthActions.fetchUserLogin(params));
        } catch (e) {
          console.log('kakao e', e);
        }
        break;
      case 'apple':
        try {
          const appleTokenInfo = await Apple();
          const username = appleTokenInfo.fullName.familyName + appleTokenInfo.fullName.givenName;
          params = { ...params, token: appleTokenInfo.identityToken, username };

          console.log('accessToken : ', appleTokenInfo.identityToken);
          console.log('params', params);
          // if (appleToken) dispatch(AuthActions.fetchAuthSocialLogin(params));
          if (appleTokenInfo.identityToken) dispatch(AuthActions.fetchUserLogin(params));
        } catch (e) {
          console.log('apple e', e);
        }
        break;
      default:
        break;
    }
  };

  const onPressAnotherLogin = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: false }));
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenLoginRBS', data: true }));
    // navigate('SetSmsScreen');
  };

  // Todo: 테스트 코드이므로 삭제 해야됩니다.
  const onPressTestLogin = () => {
    // dispatch(AuthActions.fetchAuthReducer({ type: 'userInfo', data: { me: { idx: 1 } } }));
    // const params = {
    //   id: '01012341234',
    //   pw: 'ghost323#',
    // };
    const params = {
      id: '01089121110',
      pw: 'dldlstjd79!!',
    };

    dispatch(AuthActions.fetchUserLogin(params));
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: false }));
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.5}
      openDuration={500}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: false }))}
    >
      <View style={{ width: '100%', height: height * 0.5 }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ width: '100%', height: '100%', paddingHorizontal: 35 }}>
              <View style={{ paddingTop: 36 }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 23, fontWeight: 'bold', letterSpacing: -0.58 }}>
                  회원가입/로그인
                </CustomText>
              </View>
              <FlatList
                data={osCheck}
                renderItem={({ item, index }) => (
                  <CustomButton
                    onPress={() => onPressSocialLogin(item.key)}
                    style={{
                      alignItems: 'center',
                      backgroundColor: item.backgroundColor,
                      borderRadius: 24,
                      paddingVertical: 12,
                      marginTop: index === 0 ? 36 : 16,
                    }}
                  >
                    <View style={{ flexDirection: 'row', paddingLeft: 32 }}>
                      <View style={{ width: 24, height: 24 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={item.img}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <CustomText
                          style={{ color: item.color, fontSize: 17, letterSpacing: -0.42, fontWeight: 'bold' }}
                        >
                          {item.content}
                        </CustomText>
                      </View>
                    </View>
                  </CustomButton>
                )}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={5}
                maxToRenderPerBatch={8}
                windowSize={2}
                showsVerticalScrollIndicator={false}
              />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton
                  onPress={() => onPressAnotherLogin()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.grayDefault,
                    }}
                  >
                    <CustomText
                      style={{
                        color: Color.black70,
                        fontSize: 15,
                        letterSpacing: -0.38,
                        paddingBottom: 2.5,
                      }}
                    >
                      다른 방법으로 계속하기
                    </CustomText>
                  </View>
                </CustomButton>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          renderToHardwareTextureAndroid
        />
      </View>
    </RBSheet>
  );
};
export default SimpleLoginScreen;
