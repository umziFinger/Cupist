import React, { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import InputEmail from '@/Components/Input/Email';
import useInputEmail from '@/Hooks/useInputEmail';

function InputView() {
  const dispatch = useDispatch();

  const { email, onChangeEmail, emailValidText, isEmailValid } = useInputEmail();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFocus, setCurrentFocus] = useState<string>('email');

  const onPressFindPassword = () => {
    console.log('비밀번호 찾기 버튼 클릭');
    const params = {
      email,
    };
    dispatch(AuthActions.fetchAuthFindPassword(params));
  };

  return (
    <View style={{ marginTop: 48 }}>
      {/* emailValidText 높이값 포함해서 계산 */}
      <View style={{ paddingBottom: 36 - 18 }}>
        <InputEmail
          emailValidText={emailValidText}
          onChangeText={onChangeEmail}
          onFocus={() => setCurrentFocus('email')}
          onBlur={() => setCurrentFocus('')}
          value={email}
        />
      </View>

      <View style={{}}>
        <CustomButton onPress={() => onPressFindPassword()}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
              borderRadius: 3,
              backgroundColor: isEmailValid ? Color.Primary1000 : Color.Grayyellow200,
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
