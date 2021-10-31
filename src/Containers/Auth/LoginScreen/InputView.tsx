import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import AuthActions from '@/Stores/Auth/Actions';
import InputEmail from '@/Components/Input/Email';
import InputPassword from '@/Components/Input/Password';
import useInputEmail from '@/Hooks/useInputEmail';
import useInputPassword from '@/Hooks/useInputPassword';

function InputView() {
  const dispatch = useDispatch();
  const { email, onChangeEmail, emailValidText } = useInputEmail();
  const { password, onChangePassword, passwordValidText } = useInputPassword();

  const [currentFocus, setCurrentFocus] = useState<string>('email');
  const [idValid, setIdValid] = useState<boolean>(false);

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
          onChangeText={onChangePassword}
          onFocus={() => setCurrentFocus('password')}
          onBlur={() => setCurrentFocus('')}
          value={password}
          passwordValidText={passwordValidText}
        />
      </View>

      <View>
        <CustomButton onPress={() => onPressLogin()}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
              borderRadius: 3,
              backgroundColor: idValid ? Color.Primary1000 : Color.Grayyellow200,
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
