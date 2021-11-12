import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Platform, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import InputAuthPhone, { AuthPhoneEnum } from '@/Components/Input/AuthPhone';

import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import InputSmsAuthNumber from '@/Components/Input/SmsAuthNumber';
import useInputAuthNumber from '@/Hooks/useInputAuthNumber';

import InputName from '@/Components/Input/Name';
import InputNickname from '@/Components/Input/Nickname';
import useInputName from '@/Hooks/useInputName';
import useInputNickname from '@/Hooks/useInputNickname';

const JoinStepTwoScreen = () => {
  const dispatch = useDispatch();
  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  const { isReceived, log_cert } = useSelector((state: AuthState) => state.auth);
  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);

  const { userName, onChangeName, nameValidText, isNameValid, onClearName } = useInputName();
  const { nickName, onChangeNickname, nicknameValidText, isNicknameValid, onClearNickName } = useInputNickname();
  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();
  const {
    smsAuthNumber,
    onChangeAuthNumber,
    smsValueValid,
    smsValidText,
    setSmsAuthNumber,
    setSmsAuthTime,
    timer,
    smsAuthTime,
  } = useInputAuthNumber();

  const [currentFocus, setCurrentFocus] = useState<string>('name');

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  /* 인증번호받기 */
  const onGetSmsAuth = () => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    setSmsAuthNumber('');
    setSmsAuthTime(300);

    if (timer) clearTimeout(timer);

    dispatch(
      AuthActions.fetchAuthSmsSend({
        mobile: phoneNumber.replace(/-/g, ''),
        type: AuthPhoneEnum.JOIN,
      }),
    );
  };

  const onPressJoin = () => {
    if (isNameValid && isNicknameValid && isPhoneValid && smsValueValid) {
      const params = {
        type: 'join',
        mobile: phoneNumber.replace(/-/g, ''),
        authNum: smsAuthNumber.toString(),
        authIdx: log_cert.authIdx,
        screen: 'JoinStepTwoScreen',
        userName,
        nickName,
      };

      dispatch(AuthActions.fetchSmsAuth(params));
    }
  };

  const onFocusNext = (currentFocusIndex: number) => {
    if (ref_input[currentFocusIndex] && ref_input[currentFocusIndex + 1]) {
      ref_input[currentFocusIndex].current?.blur();
      ref_input[currentFocusIndex + 1].current?.focus();
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
                        borderColor: Color.Gray400,
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
                          color: Color.Gray400,
                        }}
                      >
                        1
                      </CustomText>
                    </View>
                    <View
                      style={{
                        backgroundColor: Color.White,
                        borderWidth: 1,
                        borderColor: Color.Primary1000,
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
                          color: Color.Primary1000,
                        }}
                      >
                        2
                      </CustomText>
                    </View>
                  </View>
                </View>

                {/* 이름 & 닉네임 & 휴대폰 번호 입력 */}

                <View style={{ marginTop: 48, paddingBottom: 32 - 18 }}>
                  <InputName
                    ref={ref_input[0]}
                    nameValidText={nameValidText}
                    onChangeText={onChangeName}
                    onFocus={() => setCurrentFocus('userName')}
                    onBlur={() => setCurrentFocus('')}
                    value={userName}
                    onSubmitEditing={() => {
                      onFocusNext(0);
                    }}
                    onTextClear={onClearName}
                  />
                </View>

                <View style={{ paddingBottom: 32 - 18 }}>
                  <InputNickname
                    ref={ref_input[1]}
                    nicknameValidText={nicknameValidText}
                    onChangeText={onChangeNickname}
                    onFocus={() => setCurrentFocus('nickName')}
                    onBlur={() => setCurrentFocus('')}
                    value={nickName}
                    onTextClear={onClearNickName}
                    onSubmitEditing={() => {
                      onFocusNext(1);
                    }}
                  />
                </View>

                <View style={{ paddingBottom: 32 }}>
                  <InputAuthPhone
                    ref={ref_input[2]}
                    onChangeText={onChangePhoneNumber}
                    onFocus={() => setCurrentFocus('phone')}
                    onBlur={() => setCurrentFocus('')}
                    value={phoneNumber}
                    onPressAuth={onGetSmsAuth}
                    isPhoneValid={isPhoneValid}
                  />
                </View>

                {isReceived && (
                  <View style={{ paddingBottom: 32 - 18 }}>
                    <InputSmsAuthNumber
                      onChangeText={onChangeAuthNumber}
                      value={smsAuthNumber}
                      smsAuthTime={smsAuthTime}
                      smsValidText={smsValidText}
                    />
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={7}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
          />

          <View
            style={[
              { paddingBottom: heightInfo.fixBottomHeight },
              {
                transform: [{ translateY: isOpenKeyboard ? -8 : 0 }],
              },
            ]}
          >
            <CustomButton onPress={() => onPressJoin()}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderRadius: 5,
                  backgroundColor:
                    isNameValid && isNicknameValid && isPhoneValid && smsValueValid
                      ? Color.Primary1000
                      : Color.Grayyellow200,
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
          </View>

          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </View>
      </View>
    </KeyboardSpacerProvider>
  );
};
export default JoinStepTwoScreen;
