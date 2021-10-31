import React, { useEffect, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';

import { Color } from '@/Assets/Color';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import InputEmail from '@/Components/Input/Email';
import InputPassword from '@/Components/Input/Password';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import InputAuthPhone, { AuthPhoneEnum } from '@/Components/Input/AuthPhone';
import CommonActions from '@/Stores/Common/Actions';
import useInputEmail from '@/Hooks/useInputEmail';
import useInputPassword from '@/Hooks/useInputPassword';
import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import { navigateGoBack } from '@/Services/NavigationService';

const JoinScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isReceived } = useSelector((state: AuthState) => state.auth);
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  const { email, onChangeEmail, emailValidText, isEmailValid } = useInputEmail();
  const { password, onChangePassword, passwordValidText, isPasswordValid } = useInputPassword();
  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();

  const [currentFocus, setCurrentFocus] = useState<string>('email');

  // const [isCertificationNumber, setIsCertificationNumber] = useState(false);
  const [step, setStep] = useState(1);

  const [smsValue, setSmsValue] = useState('');
  const [smsAuthTime, setSmsAuthTime] = useState(180);
  const hasUnsavedChanges = Boolean(email || password || phoneNumber);
  let timer: NodeJS.Timeout | null = null;
  useEffect(() => {
    if (isReceived) {
      timer = setTimeout(() => {
        if (smsAuthTime === 0) {
          setSmsAuthTime(0);
        } else {
          setSmsAuthTime(smsAuthTime - 1);
        }
      }, 1000);

      if (smsAuthTime === 0) {
        setSmsValue('');
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: '유효시간이 초과되었습니다. 인증번호를 다시 요청해주세요.',
            },
          }),
        );
        dispatch(AuthActions.fetchAuthReducer({ type: 'log_cert', data: { log_cert: null } }));
      }
    }
  }, [smsAuthTime, isReceived]);

  // useEffect(() => {
  //   const beforeRemove = (event: any) => {
  //     // console.log(event.data.action);
  //     if (!hasUnsavedChanges) {
  //       return;
  //     }
  //     event.preventDefault();
  //     dispatch(
  //       CommonActions.fetchCommonReducer({
  //         type: 'alertDialog',
  //         data: {
  //           alertDialog: true,
  //           alertDialogType: 'choice',
  //           alertDialogDataType: 'cancelJoin',
  //           alertDialogMessage: '회원가입을 취소하시겠어요?\n작성된 내용은 삭제됩니다.',
  //         },
  //       }),
  //     );
  //   };
  //   navigation.addListener('beforeRemove', beforeRemove);
  //   return () => {
  //     navigation.removeListener('beforeRemove', beforeRemove);
  //   };
  // }, [navigation, hasUnsavedChanges]);

  /* 인증번호받기 */
  const onGetSmsAuth = () => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    setSmsValue('');
    setSmsAuthTime(180);

    if (timer) clearTimeout(timer);

    dispatch(
      AuthActions.fetchAuthSmsSend({
        mobile: phoneNumber.replace(/-/g, ''),
        type: AuthPhoneEnum.JOIN,
      }),
    );
  };

  const onPressNext = () => {
    if (isEmailValid && isPasswordValid) {
      console.log('스텝 2 핸드폰 번호 인증 ');
      setStep(2);
    }
  };

  return (
    <KeyboardSpacerProvider>
      <View style={{ flex: 1 }}>
        <Header type="back" />
        <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
          <FlatList
            data={[0]}
            renderItem={() => (
              <View style={{ flex: 1, paddingTop: 44 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <CustomText
                      style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}
                    >
                      회원가입
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        backgroundColor: Color.White,
                        borderWidth: 1,
                        borderColor: step === 1 ? Color.Primary1000 : Color.Gray400,
                        paddingVertical: 3,
                        paddingRight: 6,
                        paddingLeft: 7,
                        borderRadius: 24,
                        marginRight: 8,
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 11,
                          fontWeight: 'bold',
                          letterSpacing: 0,
                          color: step === 1 ? Color.Primary1000 : Color.Gray400,
                        }}
                      >
                        1
                      </CustomText>
                    </View>
                    <View
                      style={{
                        backgroundColor: Color.White,
                        borderWidth: 1,
                        borderColor: step === 2 ? Color.Primary1000 : Color.Gray400,
                        paddingVertical: 3,
                        paddingRight: 6,
                        paddingLeft: 7,
                        borderRadius: 24,
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 11,
                          fontWeight: 'bold',
                          letterSpacing: 0,
                          color: step === 2 ? Color.Primary1000 : Color.Gray400,
                        }}
                      >
                        2
                      </CustomText>
                    </View>
                  </View>
                </View>

                {/* 이메일 & 비밀번호 입력 */}
                <View style={{}}>
                  <View style={{ marginTop: 48, paddingBottom: 32 - 18 }}>
                    <InputEmail
                      emailValidText={emailValidText}
                      onChangeText={onChangeEmail}
                      onFocus={() => setCurrentFocus('email')}
                      onBlur={() => setCurrentFocus('')}
                      value={email}
                    />
                  </View>

                  <View style={{ paddingBottom: 32 - 18 }}>
                    <InputPassword
                      passwordValidText={passwordValidText}
                      onChangeText={onChangePassword}
                      onFocus={() => setCurrentFocus('password')}
                      onBlur={() => setCurrentFocus('')}
                      value={password}
                    />
                  </View>

                  {step === 2 && (
                    <View style={{ paddingBottom: 32 }}>
                      <InputAuthPhone
                        onChangeText={onChangePhoneNumber}
                        onFocus={() => setCurrentFocus('phone')}
                        onBlur={() => setCurrentFocus('')}
                        value={phoneNumber}
                        onPressAuth={onGetSmsAuth}
                        isPhoneValid={isPhoneValid}
                      />
                    </View>
                  )}

                  {/* <View style={{ flex: 1 }}> */}
                  {/*  <View style={{ paddingLeft: 24 }}> */}
                  {/*    <CustomText */}
                  {/*      style={{ */}
                  {/*        color: Color.Black1000, */}
                  {/*        fontSize: 21, */}
                  {/*        fontWeight: 'bold', */}
                  {/*        letterSpacing: -0.52, */}
                  {/*      }} */}
                  {/*    > */}
                  {/*      휴대폰 번호를 입력해주세요 */}
                  {/*    </CustomText> */}
                  {/*  </View> */}
                  {/*  <SmsSendView */}
                  {/*    onPressNextAction={() => { */}
                  {/*      dispatch( */}
                  {/*        AuthActions.fetchSmsAuth({ */}
                  {/*          mobile: phoneNumber.replace(/-/g, ''), */}
                  {/*          cert: inputAuthNum.toString(), */}
                  {/*          providerScreen: 'SetSmsScreen', */}
                  {/*        }), */}
                  {/*      ); */}
                  {/*    }} */}
                  {/*    // bottomComponent={renderBottomComponent} */}
                  {/*    type={profileState === 'N' ? '' : 'join'} */}
                  {/*  /> */}
                  {/*  {Platform.OS === 'ios' && <KeyboardSpacer />} */}
                  {/* </View> */}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={7}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />

          <View style={{ paddingBottom: heightInfo.fixBottomHeight + 16 }}>
            {step === 1 ? (
              <CustomButton onPress={() => onPressNext()}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderRadius: 5,
                    backgroundColor: isEmailValid && isPasswordValid ? Color.Primary1000 : Color.Grayyellow200,
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      letterSpacing: -0.25,
                      textAlign: 'center',
                      color: Color.White,
                    }}
                  >
                    다음
                  </CustomText>
                </View>
              </CustomButton>
            ) : (
              <CustomButton onPress={() => onPressNext()}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderRadius: 5,
                    backgroundColor: isEmailValid && isPasswordValid ? Color.Primary1000 : Color.Grayyellow200,
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      letterSpacing: -0.25,
                      textAlign: 'center',
                      color: Color.White,
                    }}
                  >
                    가입하기
                  </CustomText>
                </View>
              </CustomButton>
            )}
          </View>

          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </View>
      </View>
    </KeyboardSpacerProvider>
  );
};
export default JoinScreen;
