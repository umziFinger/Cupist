import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, FlatList, Platform } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import Config from '@/Config';
import { Color } from '@/Assets/Color';
import Naver from '@/Components/Login/SocialLogin/Naver';
import Kakao from '@/Components/Login/SocialLogin/Kakao';
import InputView from './InputView';
import Google from '@/Components/Login/SocialLogin/Google';
import Apple from '@/Components/Login/SocialLogin/Apple';
import { navigate } from '@/Services/NavigationService';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';

const { width, height } = Dimensions.get('window');

const SimpleLoginScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo, isOpenLoginRBS } = useSelector((state: CommonState) => state.common);
  const RBSheetRef = useRef<any>();

  let osCheck: any;
  if (Platform.OS === 'android') {
    osCheck = [
      { idx: 0, key: 'kakao', img: require('@/Assets/Images/Button/kakaoBtn.png') },
      { idx: 1, key: 'naver', img: require('@/Assets/Images/Button/naverBtn.png') },
      { idx: 2, key: 'google', img: require('@/Assets/Images/Button/googleBtn.png') },
    ];
  } else {
    osCheck = [
      { idx: 0, key: 'apple', img: require('@/Assets/Images/Button/btnCircleLoginApple.png') },
      { idx: 1, key: 'kakao', img: require('@/Assets/Images/Button/kakaoBtn.png') },
      { idx: 2, key: 'naver', img: require('@/Assets/Images/Button/naverBtn.png') },
      { idx: 3, key: 'google', img: require('@/Assets/Images/Button/googleBtn.png') },
    ];
  }

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  useEffect(() => {
    if (isOpenLoginRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenLoginRBS]);

  // useEffect(() => {
  //   console.log('didmount input focus : ', isFocusInput);
  //   console.log(RBSheetRef.current?.state.animatedHeight);
  //   if (isFocusInput) {
  //     setHeightRBS(0.5);
  //   } else {
  //     setHeightRBS(0.7);
  //   }
  // }, [isFocusInput]);

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
          if (kakaoToken) dispatch(AuthActions.fetchUserLogin(params));
        } catch (e) {
          console.log('kakao e', e);
        }
        break;
      case 'google':
        try {
          const googleToken = await Google();
          console.log('accessToken : ', googleToken);
          params = { ...params, token: googleToken };
          if (googleToken) dispatch(AuthActions.fetchUserLogin(params));
        } catch (e) {
          console.log('google e', e);
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

  const onPressJoinMobile = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenLoginRBS', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'profileState', data: null }));
    navigate('SetSmsScreen');
  };

  const onPressFind = () => {
    console.log('onPressFind');
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenLoginRBS', data: false }));
    navigate('FindLoginInfoScreen');
  };

  return (
    <>
      <RBSheet
        ref={RBSheetRef}
        height={height * 0.7}
        openDuration={500}
        customStyles={{
          container: {
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            // height: height * heightRBS,
          },
        }}
        onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenLoginRBS', data: false }))}
        keyboardAvoidingViewEnabled={false}
      >
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 35 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={[0]}
              renderItem={() => (
                <View style={{ width: '100%', height: '100%' }}>
                  <View style={{ marginLeft: 11 }}>
                    <CustomText
                      style={{ color: Color.Black1000, fontSize: 23, fontWeight: 'bold', letterSpacing: -0.58 }}
                    >
                      회원가입/로그인
                    </CustomText>
                  </View>
                  <InputView />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 26,
                    }}
                  >
                    <CustomButton
                      onPress={() => onPressJoinMobile()}
                      hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
                    >
                      <View>
                        <CustomText style={{ color: Color.black70, fontSize: 13, letterSpacing: -0.33 }}>
                          휴대폰 번호로 회원가입
                        </CustomText>
                      </View>
                    </CustomButton>
                    <View
                      style={{
                        width: 1,
                        height: 14,
                        backgroundColor: Color.grayLine,
                        marginHorizontal: 20,
                      }}
                    />
                    <CustomButton onPress={() => onPressFind()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
                      <CustomText style={{ color: Color.black70, fontSize: 13, letterSpacing: -0.33 }}>
                        아이디 / 비밀번호 찾기
                      </CustomText>
                    </CustomButton>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: 31,
                    }}
                  >
                    {osCheck.map((item: { key: string; img: number | Source }) => {
                      return (
                        <View key={item.key}>
                          <CustomButton onPress={() => onPressSocialLogin(item.key)}>
                            <View style={{ width: 70, height: 70 }}>
                              <FastImage
                                style={{ width: '100%', height: '100%' }}
                                source={item.img}
                                resizeMode={FastImage.resizeMode.contain}
                              />
                            </View>
                          </CustomButton>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={3}
              maxToRenderPerBatch={6}
              windowSize={2}
              showsVerticalScrollIndicator={false}
              renderToHardwareTextureAndroid
              ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
            />
          </View>
        </View>
      </RBSheet>
      <View style={{ position: 'absolute', top: 0, height: 500, backgroundColor: 'red', zIndex: 9999 }} />
    </>
  );
};
export default SimpleLoginScreen;
