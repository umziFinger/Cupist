import React, { useEffect } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

import InputAuthPhone, { AuthPhoneEnum } from '@/Components/Input/AuthPhone';
import InputSmsAuthNumber from '@/Components/Input/SmsAuthNumber';
import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import useInputAuthNumber from '@/Hooks/useInputAuthNumber';

const PhoneNumberEditScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);
  const { isReceived, log_cert } = useSelector((state: AuthState) => state.auth);

  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();
  const {
    smsAuthNumber,
    onChangeAuthNumber,
    smsValueValid,
    smsValidText,
    setSmsAuthNumber,
    setSmsAuthTime,
    smsAuthTime,
  } = useInputAuthNumber();

  // useEffect(() => {
  //   if (setNickName) {
  //     setNickName(userInfo?.nickname || '');
  //   }
  // }, [setNickName]);

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

    dispatch(
      AuthActions.fetchAuthSmsSend({
        mobile: phoneNumber.replace(/-/g, ''),
        type: AuthPhoneEnum.JOIN,
      }),
    );
  };
  // console.log(log_cert?.authIdx);
  const onPressSave = () => {
    if (isPhoneValid && smsValueValid) {
      const params = {
        type: 'updateMobile',
        mobile: phoneNumber.replace(/-/g, ''),
        screen: 'PhoneNumberEditScreen',
        authNum: smsAuthNumber.toString(),
        authIdx: log_cert.authIdx,
      };

      dispatch(AuthActions.fetchSmsAuth(params));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header type="close" />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1, paddingTop: 44 }}>
              {/* 이름 & 닉네임 & 휴대폰 번호 입력 */}

              <View style={{ paddingBottom: 32 }}>
                <InputAuthPhone
                  onChangeText={onChangePhoneNumber}
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
          keyboardShouldPersistTaps={'handled'}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
        />

        <View
          style={[
            { paddingBottom: heightInfo.statusHeight },
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
                backgroundColor: isPhoneValid && smsValueValid ? Color.Primary1000 : Color.Grayyellow200,
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
export default PhoneNumberEditScreen;
