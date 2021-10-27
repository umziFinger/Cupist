import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';

function InputView() {
  const dispatch = useDispatch();
  const { id, password } = useSelector((state: AuthState) => state.auth);

  const [currentFocus, setCurrentFocus] = useState<string>('email');
  const [idValid, setIdValid] = useState<boolean>(false);
  const [idValidText, setIdValidText] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordValidText, setPasswordValidText] = useState<string>('');

  // const onChangeEmail = (value: string) => {
  //   if (value) {
  //     const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
  //     if (value.match(emailRegExp)) {
  //       dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
  //       setIdValidText('');
  //       setIdValid(true);
  //     } else {
  //       setIdValidText('올바른 메일형식이 아닙니다.');
  //       dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
  //       setIdValid(false);
  //     }
  //   } else {
  //     dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: null } }));
  //     setIdValidText('');
  //     setIdValid(false);
  //   }
  // };

  const renderMobileRegEx = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(
        /(^0[0-9]{2}|^1[0-9]{2}|^2[0-9]{2}|^3[0-9]{2}|^4[0-9]{2}|^5[0-9]{2}|^6[0-9]{2}|^7[0-9]{2}|^8[0-9]{2}|^9[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
  };

  const onChangeId = (value: string) => {
    const regExValue = renderMobileRegEx(value);
    if (value) {
      dispatch(AuthActions.fetchAuthReducer({ type: 'id', data: { id: value } }));
      setIdValidText('');
      setIdValid(true);
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'id', data: { id: null } }));
      setIdValidText('');
      setIdValid(false);
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
    if (id && password) {
      const params = {
        id,
        pw: password,
      };
      dispatch(AuthActions.fetchUserLogin(params));
    }
  };

  return (
    <View style={{}}>
      <View
        style={{
          // borderBottomColor: getValidColor('email').borderColor,
          borderBottomColor: Color.Gray400,
          borderBottomWidth: 1,
          marginTop: 44,
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: 13 }}>
          <View style={{ flex: 1 }}>
            <TextInput
              autoCompleteType="off"
              placeholder="휴대폰 번호 또는 이메일 주소를 입력해주세요"
              placeholderTextColor={Color.Gray800}
              style={{
                color: Color.Black1000,
                fontSize: 15,
                padding: 0,
                letterSpacing: -0.38,
              }}
              onFocus={() => setCurrentFocus('id')}
              onBlur={() => setCurrentFocus('')}
              autoFocus={false}
              keyboardType={'default'}
              onChangeText={onChangeId}
              autoCorrect={false}
              value={id}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          // borderBottomColor: getValidColor('password').borderColor,
          borderBottomColor: Color.Gray300,
          borderBottomWidth: 1,
          marginTop: 22,
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: 13 }}>
          <View style={{ flex: 1 }}>
            <TextInput
              autoCompleteType="off"
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor={Color.Gray800}
              style={{
                color: Color.Black1000,
                fontSize: 15,
                padding: 0,
                letterSpacing: -0.38,
              }}
              onFocus={() => setCurrentFocus('password')}
              onBlur={() => setCurrentFocus('')}
              autoFocus={false}
              keyboardType={'default'}
              secureTextEntry
              onChangeText={onChangePassword}
              textContentType={'newPassword'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={password}
              maxLength={12}
            />
          </View>
        </View>
      </View>
      <View style={{ width: '100%', marginTop: 26 }}>
        <CustomButton onPress={() => onPressLogin()}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 21,
              borderRadius: 5,
              backgroundColor: idValid && passwordValid ? Color.Primary1000 : Color.Gray300,
            }}
          >
            <CustomText
              style={{
                color: Color.White,
                fontSize: 17,
                fontWeight: 'bold',
                letterSpacing: -0.42,
              }}
            >
              로그인
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}

export default InputView;
