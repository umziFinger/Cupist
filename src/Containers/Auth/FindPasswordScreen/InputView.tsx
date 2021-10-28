import React, { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';

function InputView() {
  const dispatch = useDispatch();
  const { email } = useSelector((state: AuthState) => state.auth);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFocus, setCurrentFocus] = useState<string>('email');
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

  const onPressFindPassword = () => {
    console.log('비밀번호 찾기 버튼 클릭');
  };

  return (
    <View style={{ marginTop: 48 }}>
      {/* emailValidText 높이값 포함해서 계산 */}
      <View style={{ paddingBottom: 36 - 18 }}>
        <View>
          <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow500 }}>이메일</CustomText>
        </View>

        <View
          style={{
            paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
            paddingLeft: 12,
            borderRadius: 3,
            borderColor: emailValidText === '' ? Color.Gray300 : Color.Error,
            borderWidth: 1,
            marginTop: 8,
          }}
        >
          <TextInput
            autoCompleteType="off"
            placeholder="이메일주소를 입력해주세요."
            placeholderTextColor={Color.Gray400}
            style={{
              color: Color.Black1000,
              fontSize: 14,
              padding: 0,
              letterSpacing: -0.25,
              includeFontPadding: false,
            }}
            onFocus={() => setCurrentFocus('email')}
            onBlur={() => setCurrentFocus('')}
            autoFocus={false}
            keyboardType={'default'}
            onChangeText={onChangeEmail}
            autoCorrect={false}
            value={email}
            allowFontScaling={false}
          />
        </View>
        <View style={{ marginTop: 4 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Error }}>{emailValidText}</CustomText>
        </View>
      </View>

      <View style={{}}>
        <CustomButton onPress={() => onPressFindPassword()}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
              borderRadius: 3,
              backgroundColor: emailValid ? Color.Primary1000 : Color.Grayyellow200,
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
              비밀번호 찾기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}

export default InputView;
