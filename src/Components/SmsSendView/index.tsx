import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { timeFormat } from '@/Components/Function';
import { AuthState } from '@/Stores/Auth/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import CommonActions from '@/Stores/Common/Actions';
import MyActions from '@/Stores/My/Actions';

interface SmsSendViewProps {
  onPressNextAction: Function;
  bottomComponent?: Function;
  type: string | '';
}

const SmsSendView = (props: SmsSendViewProps) => {
  const debounceFunc = useRef(
    _.debounce((value: any) => {
      const tempValue1 = value.replace(/-/gi, '');

      if (tempValue1 && tempValue1.length > 10) {
        const tempValue2 = tempValue1.substr(0, 11);
        const regExResult = renderMobileRegEx(tempValue2);
        dispatch(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: regExResult } }));
        setPhoneNumberValid(true);
      }
    }, 200),
  );
  const dispatch = useDispatch();
  const { onPressNextAction, bottomComponent, type } = props;
  const { currentRBS } = useSelector((state: CommonState) => state.common);
  const { phoneNumber, isReceived, smsValueValid, smsValidText } = useSelector((state: AuthState) => state.auth);

  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [smsValue, setSmsValue] = useState('');
  const [smsAuthTime, setSmsAuthTime] = useState(180);

  useEffect(() => {
    onChangePhoneNumber(phoneNumber);
    return () => {
      console.log('unmount!!!');
      dispatch(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: null } }));
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    console.log('isReceived : ', isReceived, phoneNumberValid);
    if (!phoneNumber) {
      setPhoneNumberValid(false);
    }
  }, [phoneNumber]);

  let timer: NodeJS.Timeout | null = null;
  useEffect(() => {
    if (isReceived) {
      timer = setTimeout(() => {
        if (smsAuthTime === 0) {
          setSmsAuthTime(0);
        } else {
          setSmsAuthTime(smsAuthTime - 1);
        }
      }, 1000);

      if (smsAuthTime === 0) {
        setSmsValue('');
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: '유효시간이 초과되었습니다. 인증번호를 다시 요청해주세요.',
            },
          }),
        );
        dispatch(AuthActions.fetchAuthReducer({ type: 'log_cert', data: { log_cert: null } }));
      }
    }
  }, [smsAuthTime, isReceived]);

  const renderMobileRegEx = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(
        /(^0[0-9]{2}|^1[0-9]{2}|^2[0-9]{2}|^3[0-9]{2}|^4[0-9]{2}|^5[0-9]{2}|^6[0-9]{2}|^7[0-9]{2}|^8[0-9]{2}|^9[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
  };

  const onChangePhoneNumber = (value: string | '') => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'isReceived', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    if (value) {
      debounceFunc.current(value);
      dispatch(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: value } }));
      setPhoneNumberValid(false);
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: null } }));
    }
  };

  const onChangeSmsValue = (value: string) => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    if (value) {
      if (value.length === 4) {
        console.log('currentRBS : ', currentRBS);
        dispatch(AuthActions.fetchAuthReducer({ type: 'inputAuthNum', data: { inputAuthNum: value.toString() } }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: true }));
      } else {
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
      }
      setSmsValue(value);
    } else if (smsAuthTime === 0) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '유효시간이 초과되었습니다. 인증번호를 다시 요청해주세요.',
          },
        }),
      );
    } else {
      setSmsValue('');
    }
  };

  /* 인증번호받기 */
  const onAuthSend = () => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    setSmsValue('');
    setSmsAuthTime(180);

    if (timer) clearTimeout(timer);

    if (type === 'join') {
      dispatch(
        AuthActions.fetchAuthSmsSend({
          mobile: phoneNumber.replace(/-/g, ''),
          type,
        }),
      );
    } else if (type === 'address') {
      dispatch(
        MyActions.fetchMySmsSend({
          mobile: phoneNumber.replace(/-/g, ''),
          type,
        }),
      );
    } else {
      dispatch(
        AuthActions.fetchAuthSmsSend({
          mobile: phoneNumber.replace(/-/g, ''),
          type,
        }),
      );
    }
  };

  const onPressNext = () => {
    if (smsValueValid) {
      setSmsValue('');
      onPressNextAction();
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 21 }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: Color.grayLine,
            height: 40.5,
            paddingBottom: 4.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <View>
              <TextInput
                autoCompleteType="off"
                placeholder="휴대폰 번호를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType="number-pad"
                autoCorrect={false}
                maxLength={13}
                onChangeText={(e) => onChangePhoneNumber(e)}
                value={phoneNumber}
              />
            </View>
          </View>
          {phoneNumberValid && (
            <CustomButton
              style={{
                backgroundColor: Color.Primary1000,
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 5,
                justifyContent: 'center',
              }}
              onPress={() => onAuthSend()}
            >
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <CustomText
                  style={{
                    color: Color.White,
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -0.2,
                  }}
                >
                  {isReceived ? '다시 받기' : '인증번호 받기'}
                </CustomText>
              </View>
            </CustomButton>
          )}
        </View>
        {isReceived && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 29,
              borderBottomWidth: 1,
              borderBottomColor: Color.grayLine,
              height: 33,
              paddingBottom: 13.2,
              // backgroundColor: 'red',
            }}
          >
            <View style={{ flexDirection: 'column', flexGrow: 1 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="인증번호를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType="number-pad"
                autoCorrect={false}
                maxLength={4}
                onChangeText={onChangeSmsValue}
                value={smsValue}
                allowFontScaling={false}
              />
            </View>
            <View
              style={{
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CustomButton onPress={() => onAuthSend()}>
                <CustomText style={{ color: Color.error, fontSize: 15, letterSpacing: -0.38, fontWeight: '500' }}>
                  {smsAuthTime === 0 ? '유효시간 초과' : timeFormat(smsAuthTime)}{' '}
                </CustomText>
              </CustomButton>
            </View>
          </View>
        )}
        <View style={{ justifyContent: 'center', marginTop: 4 }}>
          <CustomText style={{ fontSize: 12, color: Color.error }}>{smsValidText}</CustomText>
        </View>
      </View>
      <CustomButton style={{ alignItems: 'center' }} onPress={() => onPressNext()}>
        {bottomComponent(smsValueValid)}
      </CustomButton>
      {/* <CustomButton style={{ alignItems: 'center' }} onPress={() => onPressNext()}> */}
      {/*  <View */}
      {/*    style={{ */}
      {/*      width: '100%', */}
      {/*      paddingTop: 22, */}
      {/*      paddingBottom: Platform.OS === 'android' ? 22 : 53, */}
      {/*      alignItems: 'center', */}
      {/*      justifyContent: 'flex-start', */}
      {/*      backgroundColor: smsValueValid ? Color.Primary1000 : Color.greyBtn, */}
      {/*    }} */}
      {/*  > */}
      {/*    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> */}
      {/*      <View style={{ marginRight: 10 }}> */}
      {/*        <CustomText style={{ color: Color.White, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}> */}
      {/*          다음 */}
      {/*        </CustomText> */}
      {/*      </View> */}
      {/*      <View style={{ width: 6.5, height: 11.2 }}> */}
      {/*        <FastImage */}
      {/*          style={{ width: '100%', height: '100%' }} */}
      {/*          source={require('@/Assets/Images/Arrow/icSmallRightArrowWhite.png')} */}
      {/*          resizeMode={FastImage.resizeMode.cover} */}
      {/*        /> */}
      {/*      </View> */}
      {/*    </View> */}
      {/*  </View> */}
      {/* </CustomButton> */}
    </View>
  );
};

export default SmsSendView;
