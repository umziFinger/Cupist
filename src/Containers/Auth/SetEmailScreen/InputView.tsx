import React, { useEffect, useRef, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import { navigate } from '@/Services/NavigationService';

function InputView() {
  const dispatch = useDispatch();
  const { email, emailValid } = useSelector((state: AuthState) => state.auth);

  // const [emailValid, setEmailValid] = useState<boolean>(false);
  const [emailValidText, setEmailValidText] = useState<string>('');
  // const [textHeightStatus, setTextHeightStatus] = useState(false);

  const onChangeEmail = (value: string) => {
    if (value) {
      const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
      if (value.match(emailRegExp)) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
        setEmailValidText('');
        dispatch(AuthActions.fetchAuthReducer({ type: 'emailValid', data: true }));
        // setEmailValid(true);
      } else {
        setEmailValidText('올바른 메일형식이 아닙니다.');
        dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'emailValid', data: false }));
        // setEmailValid(false);
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: null } }));
      setEmailValidText('');
      dispatch(AuthActions.fetchAuthReducer({ type: 'emailValid', data: false }));

      // setEmailValid(false);
    }
  };

  const onPressNext = () => {
    if (emailValid) {
      navigate('SetSmsScreen');
    }
    // if (emailValid) {
    //   const params = {
    //     mobile: phoneNumber.replace(/-/g, ''),
    //     email,
    //     password,
    //     deviceId: DeviceInfo.getUniqueId(),
    //     authIdx,
    //   };
    //   dispatch(AuthActions.fetchUserJoin(params));
    // }
  };

  const onPressDeleteBtn = () => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: null } }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'emailValid', data: false }));
    setEmailValidText('');
  };

  return (
    <View style={{ flex: 1, marginTop: 29 }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View
          style={{
            borderBottomColor: Color.grayLine,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flexDirection: 'row', marginBottom: 13 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="이메일 주소를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType={'email-address'}
                onChangeText={onChangeEmail}
                autoCorrect={false}
                value={email}
              />
            </View>
            {/* {email && ( */}
            {/*  <View style={{ width: 16, height: 16 }}> */}
            {/*    <CustomButton onPress={() => onPressDeleteBtn()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}> */}
            {/*      <FastImage */}
            {/*        style={{ width: '100%', height: '100%' }} */}
            {/*        source={require('@/Assets/Images/Common/icTxtDel.png')} */}
            {/*        resizeMode={FastImage.resizeMode.cover} */}
            {/*      /> */}
            {/*    </CustomButton> */}
            {/*  </View> */}
            {/* )} */}
          </View>
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
            backgroundColor: emailValid ? Color.Primary1000 : Color.greyBtn,
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
