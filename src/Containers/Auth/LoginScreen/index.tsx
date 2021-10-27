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

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo, isOpenLoginRBS } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  // useEffect(() => {
  //   console.log('didmount input focus : ', isFocusInput);
  //   console.log(RBSheetRef.current?.state.animatedHeight);
  //   if (isFocusInput) {
  //     setHeightRBS(0.5);
  //   } else {
  //     setHeightRBS(0.7);
  //   }
  // }, [isFocusInput]);

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
                  <CustomButton onPress={() => onPressJoinMobile()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
                    <View>
                      <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.33 }}>
                        휴대폰 번호로 회원가입
                      </CustomText>
                    </View>
                  </CustomButton>
                  <View
                    style={{
                      width: 1,
                      height: 14,
                      backgroundColor: Color.Gray400,
                      marginHorizontal: 20,
                    }}
                  />
                  <CustomButton onPress={() => onPressFind()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.33 }}>
                      아이디 / 비밀번호 찾기
                    </CustomText>
                  </CustomButton>
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
      <View style={{ position: 'absolute', top: 0, height: 500, backgroundColor: 'red', zIndex: 9999 }} />
    </>
  );
};
export default LoginScreen;
