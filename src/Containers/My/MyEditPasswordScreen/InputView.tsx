import { Platform, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import MyActions from '@/Stores/My/Actions';

function InputView() {
  const dispatch = useDispatch();
  const { password, passwordValid } = useSelector((state: AuthState) => state.auth);
  const [password2, setPassword2] = useState<string>('');
  const [password2Valid, setPassword2Valid] = useState<boolean>(false);

  const [passwordValidText, setPasswordValidText] = useState<string>('');

  const onChangePassword = (value: string) => {
    setPassword2('');
    setPassword2Valid(false);
    if (value) {
      dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: value } }));
      const regExp4 = /^[0-9]*$/gi;
      const regExp3 = /^[a-zA-Z]*$/gi;
      const regExp2 = /^[a-zA-Z0-9]*$/gi;
      const regExp1 = /^[a-zA-Z0-9?~!@#$]*$/;

      if (value.match(regExp1)) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'passwordValid', data: false }));
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
            dispatch(AuthActions.fetchAuthReducer({ type: 'passwordValid', data: true }));
          }
        }
      } else {
        setPasswordValidText('특수문자는 ?, ~, !, @, #, $ 만 가능합니다.');
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: null } }));
      setPasswordValidText('');
      dispatch(AuthActions.fetchAuthReducer({ type: 'passwordValid', data: false }));
    }
  };

  const onChangePassword2 = (value: string) => {
    setPassword2(value);
    if (value) {
      if (passwordValid && value === password) {
        setPassword2Valid(true);
        dispatch(AuthActions.fetchAuthReducer({ type: 'passwordValid', data: true }));
      } else {
        setPassword2Valid(false);
      }
    }
  };

  const onPressNext = () => {
    if (passwordValid && password2Valid) {
      const params = {
        user_pw: password,
      };
      console.log('번호변경 : ', params);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 29.3 }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: Color.grayLine, paddingBottom: 13.2 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="비밀번호를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
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
        <View style={{ borderBottomWidth: 1, borderBottomColor: Color.grayLine, paddingBottom: 13.2, marginTop: 29 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="한번 더 비밀번호를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType={'default'}
                secureTextEntry
                onChangeText={onChangePassword2}
                textContentType={'newPassword'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={password2}
                maxLength={12}
              />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center', marginTop: 15.5 }}>
          <CustomText style={{ color: Color.black70, fontSize: 15, letterSpacing: -0.38 }}>
            8자 이상,숫자,특수문자를 조합하여 설정해주세요.
          </CustomText>
        </View>
      </View>
      <CustomButton style={{ alignItems: 'center' }} onPress={() => onPressNext()}>
        <View
          style={{
            width: '100%',
            paddingTop: 22,
            paddingBottom: Platform.OS === 'android' ? 22 : 53,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: passwordValid && password2Valid ? Color.Primary1000 : Color.greyBtn,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <CustomText style={{ color: Color.White, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}>
                다음
              </CustomText>
            </View>
            <View style={{ width: 6.5, height: 11.2 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Arrow/icSmallRightArrowWhite.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </View>
      </CustomButton>
    </View>
  );
}

export default InputView;
