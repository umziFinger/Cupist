import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import InputEmail from '@/Components/Input/Email';
import InputPassword from '@/Components/Input/Password';

function InputView() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state: AuthState) => state.auth);

  const [currentFocus, setCurrentFocus] = useState<string>('email');
  const [idValid, setIdValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordValidText, setPasswordValidText] = useState<string>('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [emailValidText, setEmailValidText] = useState<string>('');

  const onChangeEmail = (value: string) => {
    if (value) {
      const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
      if (value.match(emailRegExp)) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
        setEmailValid(true);
      } else {
        setEmailValidText('이메일 형식이 올바르지 않습니다.');
        dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
        setEmailValid(false);
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: null } }));
      setEmailValidText('');
      setEmailValid(false);
    }
  };

  const onChangePassword = (value: string) => {
    if (value) {
      dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: value } }));
      const regExp4 = /^[0-9]*$/gi;
      const regExp3 = /^[a-zA-Z]*$/gi;
      const regExp2 = /^[a-zA-Z0-9]*$/gi;
      const regExp1 = /^[a-zA-Z0-9?~!@#$]*$/;

      if (value.match(regExp1)) {
        setPasswordValid(false);
        if (value.match(regExp2)) {
          setPasswordValidText('특수문자가 포함되어야 합니다.');
        }
        if (value.match(regExp3)) {
          setPasswordValidText('숫자가 포함되어야 합니다.');
        }
        if (value.match(regExp4)) {
          setPasswordValidText('영문이 포함되어야 합니다.');
        }
        if (!value.match(regExp2) && !value.match(regExp3) && !value.match(regExp4)) {
          if (value.length < 8) {
            setPasswordValidText('길이가 8~12자여야 합니다.');
          } else {
            setPasswordValidText('');
            setPasswordValid(true);
          }
        }
      } else {
        setPasswordValidText('특수문자는 ?, ~, !, @, #, $ 만 가능합니다.');
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: null } }));
      setPasswordValidText('');
      setPasswordValid(false);
    }
  };

  const onPressLogin = () => {
    if (email && password) {
      const params = {
        email,
        pw: password,
      };
      dispatch(AuthActions.fetchUserLogin(params));
    }
  };

  return (
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

      <View style={{ paddingBottom: 36 - 18 }}>
        <InputPassword
          passwordValidText={passwordValidText}
          onChangeText={onChangePassword}
          onFocus={() => setCurrentFocus('password')}
          onBlur={() => setCurrentFocus('')}
          value={password}
        />
      </View>

      <View>
        <CustomButton onPress={() => onPressLogin()}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
              borderRadius: 3,
              backgroundColor: idValid && passwordValid ? Color.Primary1000 : Color.Grayyellow200,
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: -0.25,
                color: Color.White,
              }}
            >
              시작하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}

export default InputView;
