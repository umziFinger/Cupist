import React, { useEffect, useRef } from 'react';
import { View, FlatList, Platform, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';

import AuthActions from '@/Stores/Auth/Actions';
import MyActions from '@/Stores/My/Actions';
import InputPassword from '@/Components/Input/Password';
import useInputPassword from '@/Hooks/useInputPassword';

const PasswordEditScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);

  const { password, onChangePassword, passwordValidText, isPasswordValid } = useInputPassword();

  const {
    password: newPassword,
    onChangePassword: onChangeNewPassword,
    passwordValidText: newPasswordValidText,
    isPasswordValid: isNewPasswordValid,
  } = useInputPassword();

  const {
    password: confirmPassword,
    onChangePassword: onChangeConfirmPassword,
    passwordValidText: confirmPasswordValidText,
    isPasswordValid: isConfirmPasswordValid,
  } = useInputPassword();

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  const onFocusNext = (currentFocusIndex: number) => {
    if (ref_input[currentFocusIndex] && ref_input[currentFocusIndex + 1]) {
      // ref_input[currentFocusIndex].current?.blur();
      ref_input[currentFocusIndex + 1].current?.focus();
    }
  };

  const isValid = () => {
    if (isPasswordValid && isNewPasswordValid && isConfirmPasswordValid && newPassword === confirmPassword) {
      return true;
    }
    return false;
  };

  const onPressSave = () => {
    if (isValid()) {
      const params = {
        oldPassword: password,
        newPassword,
        newPasswordCheck: confirmPassword,
      };
      dispatch(MyActions.fetchMyPasswordModify(params));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header type="close" />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1, paddingTop: 40 }}>
              <View style={{ paddingBottom: 32 - 18 }}>
                <InputPassword
                  ref={ref_input[0]}
                  passwordValidText={passwordValidText}
                  onChangeText={(e) => onChangePassword(e, 'login')}
                  value={password}
                  title={'기존 비밀번호'}
                  placeHolder={'기존 비밀번호를 입력해주세요.'}
                  onSubmitEditing={() => {
                    onFocusNext(0);
                  }}
                />
              </View>
              <View style={{ paddingBottom: 32 - 18 }}>
                <InputPassword
                  ref={ref_input[1]}
                  passwordValidText={newPasswordValidText}
                  onChangeText={(e) => onChangeNewPassword(e, 'modify')}
                  value={newPassword}
                  title={'새로운 비밀번호'}
                  placeHolder={'새로운 비밀번호를 입력해주세요.'}
                  onSubmitEditing={() => {
                    onFocusNext(1);
                  }}
                />
              </View>
              <View style={{ paddingBottom: 32 - 18 }}>
                <InputPassword
                  ref={ref_input[2]}
                  passwordValidText={confirmPasswordValidText}
                  onChangeText={(e) => onChangeConfirmPassword(e, 'login')}
                  value={confirmPassword}
                  title={'새로운 비밀번호 확인'}
                  placeHolder={'새로운 비밀번호를 다시 입력해주세요.'}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={7}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
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
          <CustomButton onPress={() => onPressSave()}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                borderRadius: 5,
                backgroundColor: isValid() ? Color.Primary1000 : Color.Grayyellow200,
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
                저장하기
              </CustomText>
            </View>
          </CustomButton>
        </View>

        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    </View>
  );
};
export default PasswordEditScreen;
