import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Platform, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';

import { Color } from '@/Assets/Color';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import InputEmail from '@/Components/Input/Email';
import InputPassword from '@/Components/Input/Password';
import AuthActions from '@/Stores/Auth/Actions';
import useInputEmail from '@/Hooks/useInputEmail';
import useInputPassword from '@/Hooks/useInputPassword';

import { navigate } from '@/Services/NavigationService';

const JoinStepOneScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);

  const { email, onChangeEmail, emailValidText, isEmailValid } = useInputEmail();
  const { password, onChangePassword, passwordValidText, isPasswordValid } = useInputPassword();

  const [currentFocus, setCurrentFocus] = useState<string>('email');

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  const onPressNext = () => {
    if (isEmailValid && isPasswordValid) {
      navigate('JoinStepTwoScreen');
    }
  };

  const onFocusNext = (index: number) => {
    if (ref_input[index] && index < ref_input.length) {
      ref_input[0].current?.blur();
      ref_input[index].current?.focus();
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
                        borderColor: Color.Primary1000,
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
                          color: Color.Primary1000,
                        }}
                      >
                        1
                      </CustomText>
                    </View>
                    <View
                      style={{
                        backgroundColor: Color.White,
                        borderWidth: 1,
                        borderColor: Color.Gray400,
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
                          color: Color.Gray400,
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
                      ref={ref_input[0]}
                      emailValidText={emailValidText}
                      onChangeText={onChangeEmail}
                      onFocus={() => setCurrentFocus('email')}
                      onBlur={() => setCurrentFocus('')}
                      value={email}
                      autoFocus
                      onSubmitEditing={() => {
                        onFocusNext(1);
                      }}
                    />
                  </View>

                  <View style={{ paddingBottom: 32 - 18 }}>
                    <InputPassword
                      ref={ref_input[1]}
                      passwordValidText={passwordValidText}
                      onChangeText={onChangePassword}
                      onFocus={() => setCurrentFocus('password')}
                      onBlur={() => setCurrentFocus('')}
                      value={password}
                    />
                  </View>
                </View>
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
          </View>

          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </View>
      </View>
    </KeyboardSpacerProvider>
  );
};
export default JoinStepOneScreen;
