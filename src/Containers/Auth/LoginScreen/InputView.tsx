import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';
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

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  const { email, onChangeEmail, emailValidText, isEmailValid } = useInputEmail();
  const { password, passwordValidText } = useInputPassword();

  const onFocusNext = (index: number) => {
    if (ref_input[index] && index < ref_input.length) {
      ref_input[index].current?.focus();
    }
  };

  const onChangePassword = (value: string) => {
    if (value) {
      dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: value } }));
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: null } }));
    }
  };

  const onPressLogin = () => {
    if (isEmailValid) {
      const params = {
        email,
        password,
      };
      dispatch(AuthActions.fetchUserLogin(params));
    }
  };

  return (
    <View style={{}}>
      <View style={{ marginTop: 48, paddingBottom: 32 - 18 }}>
        <InputEmail
          ref={ref_input[0]}
          emailValidText={emailValidText}
          onChangeText={onChangeEmail}
          value={email}
          onSubmitEditing={() => {
            onFocusNext(1);
          }}
        />
      </View>

      <View style={{ paddingBottom: 36 - 18 }}>
        <InputPassword
          ref={ref_input[1]}
          onChangeText={onChangePassword}
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
              시작하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}

export default InputView;
