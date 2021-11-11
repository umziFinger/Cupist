import React, { useEffect } from 'react';
import { View, FlatList, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import HomeActions from '@/Stores/Home/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import Config from '@/Config';
import { Color } from '@/Assets/Color';
import Naver from '@/Components/Login/SocialLogin/Naver';
import Kakao from '@/Components/Login/SocialLogin/Kakao';
import Apple from '@/Components/Login/SocialLogin/Apple';
import { navigate } from '@/Services/NavigationService';
import Header from '@/Components/Header';

const SimpleLoginScreen = () => {
  const dispatch = useDispatch();

  let osCheck: any;
  if (Platform.OS === 'android') {
    osCheck = [
      {
        idx: 0,
        key: 'kakao',
        img: require('@/Assets/Images/Button/icSignKakao.png'),
        backgroundColor: 'rgb(249, 224, 0)',
        color: Color.Black1000,
        content: '카카오톡으로 로그인',
      },
      {
        idx: 1,
        key: 'naver',
        img: require('@/Assets/Images/Button/icSignNaver.png'),
        backgroundColor: 'rgb(45, 189, 19)',
        color: Color.White,
        content: '네이버로 로그인',
      },
      {
        idx: 2,
        key: 'google',
        img: require('@/Assets/Images/Button/icSignGg.png'),
        backgroundColor: Color.White,
        color: Color.Black1000,
        borderWidth: 1,
        borderColor: Color.Gray300,
        content: '구글로 로그인',
      },
      {
        idx: 3,
        key: 'email',
        img: require('@/Assets/Images/Button/icSignEmail.png'),
        backgroundColor: Color.White,
        color: Color.Primary1000,
        borderWidth: 1,
        borderColor: Color.Gray300,
        content: '이메일로 로그인',
      },
    ];
  } else {
    osCheck = [
      {
        idx: 0,
        key: 'apple',
        img: require('@/Assets/Images/Button/icSignApple.png'),
        backgroundColor: Color.Black1000,
        color: Color.White,
        content: 'Apple로 로그인',
      },
      {
        idx: 1,
        key: 'kakao',
        img: require('@/Assets/Images/Button/icSignKakao.png'),
        backgroundColor: 'rgb(249, 224, 0)',
        color: Color.Black1000,
        content: '카카오톡으로 로그인',
      },
      {
        idx: 2,
        key: 'naver',
        img: require('@/Assets/Images/Button/icSignNaver.png'),
        backgroundColor: 'rgb(45, 189, 19)',
        color: Color.White,
        content: '네이버로 로그인',
      },
      {
        idx: 3,
        key: 'google',
        img: require('@/Assets/Images/Button/icSignGg.png'),
        backgroundColor: Color.White,
        color: Color.Black1000,
        borderWidth: 1,
        borderColor: Color.Gray300,
        content: '구글로 로그인',
      },
      {
        idx: 4,
        key: 'email',
        img: require('@/Assets/Images/Button/icSignEmail.png'),
        backgroundColor: Color.White,
        color: Color.Primary1000,
        borderWidth: 1,
        borderColor: Color.Primary1000,
        content: '이메일로 로그인',
      },
    ];
  }

  useEffect(() => {
    return () => {
      dispatch(HomeActions.fetchHomeReducer({ type: 'loginCheckYN', data: { loginCheckYN: 'Y' } }));
    };
  }, []);

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
          // if (naverToken) dispatch(AuthActions.fetchUserLogin(params));
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
      case 'apple':
        try {
          const appleTokenInfo: any = await Apple();
          const username = appleTokenInfo.fullName.familyName + appleTokenInfo.fullName.givenName;
          params = { ...params, token: appleTokenInfo.identityToken, username };

          console.log('accessToken : ', appleTokenInfo.identityToken);
          console.log('params', params);
          // if (appleTokenInfo.identityToken) dispatch(AuthActions.fetchUserLogin(params));
        } catch (e) {
          console.log('apple e', e);
        }
        break;
      case 'email':
        navigate('LoginScreen');
        break;
      default:
        break;
    }
  };

  const onPressJoin = () => {
    navigate('AgreeScreen');
  };

  // Todo: 테스트 코드이므로 삭제 해야됩니다.
  const onPressTestLogin = () => {
    // dispatch(AuthActions.fetchAuthReducer({ type: 'userInfo', data: { me: { idx: 1 } } }));
    // const params = {
    //   id: '01012341234',
    //   pw: 'ghost323#',
    // };
    const params = {
      email: 'koi@gmail.com',
      password: 'seoha123!',
    };
    // const params = {
    //   email: 'a8@a.aa',
    //   password: 'qwer1234@',
    // };
    dispatch(AuthActions.fetchUserLogin(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <FlatList
        data={[0]}
        renderItem={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: 28,
            }}
          >
            <View style={{ flex: 1, alignItems: 'center', marginTop: 76 }}>
              <View style={{ width: 190, height: 87 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/logoSign.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
            {/* Todo: 테스트 코드이므로 삭제 해야됩니다. */}
            <CustomButton onPress={() => onPressTestLogin()} hitSlop={20}>
              <View style={{ alignItems: 'center' }}>
                <CustomText
                  style={{
                    color: Color.Gray700,
                    fontSize: 15,
                    letterSpacing: -0.2,
                  }}
                >
                  테스트 로그인
                </CustomText>
              </View>
            </CustomButton>
            <FlatList
              data={osCheck}
              renderItem={({ item, index }) => (
                <CustomButton
                  onPress={() => onPressSocialLogin(item.key)}
                  style={{
                    alignItems: 'center',
                    backgroundColor: item.backgroundColor,
                    borderRadius: 5,
                    borderWidth: item.borderWidth || 0,
                    borderColor: item.borderColor || 'transparent',
                    paddingVertical: 12,
                    marginTop: index === 0 ? 50 : 16,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 24, height: 24, marginRight: 2 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={item.img}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CustomText style={{ color: item.color, fontSize: 14, fontWeight: 'bold' }}>
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
              <View>
                <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>아직 볼리미 회원이 아니신가요?</CustomText>
              </View>
              <CustomButton onPress={() => onPressJoin()}>
                <View style={{ marginTop: 8 }}>
                  <CustomText
                    style={{
                      color: Color.Black1000,
                      fontSize: 15,
                      letterSpacing: -0.2,
                    }}
                  >
                    이메일로 가입
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
  );
};
export default SimpleLoginScreen;
