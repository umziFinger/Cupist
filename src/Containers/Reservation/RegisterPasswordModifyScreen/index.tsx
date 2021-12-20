import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import ReservationActions from '@/Stores/Reservation/Actions';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

const RegisterPasswordModifyScreen = () => {
  const InputRef = useRef<any>();
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const [paymentPwd, setPaymentPwd] = useState<string>('');
  const [confirmPaymentPwd, setConfirmPaymentPwd] = useState<string>('');
  const [showArr, setShowArr] = useState<Array<boolean>>([false, false, false, false, false, false]);
  const [passwordType, setPasswordType] = useState<string>('first');
  const [validation, setValidation] = useState<boolean>(false);

  useEffect(() => {
    if (paymentPwd.length === 6) {
      console.log('1차 비밀번호 입력완료!');
      // setValidation(true);
      setPasswordType('second');
      setShowArr([false, false, false, false, false, false]);
    }
  }, [paymentPwd]);

  useEffect(() => {
    console.log('selectedTicket : ', selectedTicket?.idx);
    if (paymentPwd.length === 6 && confirmPaymentPwd.length === 6) {
      if (paymentPwd === confirmPaymentPwd) {
        console.log('2차 비밀번호 입력완료!');
        setValidation(true);
      } else {
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'confirm',
              alertDialogMessage: '비밀번호가 일치하지 않습니다.',
            },
          }),
        );
        setValidation(false);
        setConfirmPaymentPwd('');
        setShowArr([false, false, false, false, false, false]);
      }
    }
  }, [confirmPaymentPwd]);

  useEffect(() => {
    if (validation) {
      const params = {
        paymentPwd,
      };
      dispatch(ReservationActions.fetchReservationPaymentSign(params));
    }
  }, [validation]);

  const onChangeText = async (text: string) => {
    console.log('passwordType : ', passwordType);
    if (passwordType === 'first') {
      setPaymentPwd(text);
    } else {
      setConfirmPaymentPwd(text);
    }
    produce(showArr, (draft) => {
      if (text.length > 0) {
        if (!draft[text.length - 1]) {
          draft[text.length - 1] = true;
        } else {
          draft[text.length] = false;
        }
      } else {
        draft[text.length] = false;
      }
      setShowArr([...draft]);
    });
  };

  const onFocus = () => {
    InputRef.current.focus();
  };

  return (
    <CustomButton
      onPress={() => Keyboard.dismiss()}
      effect={false}
      style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.statusHeight + 44 }}
    >
      <Header type={'close'} />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#ffffff' }}
        behavior={'padding'}
        enabled={Platform.OS !== 'android'}
      >
        <View style={{ flex: 0.7 }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{}}>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, letterSpacing: -0.25 }}>
              {passwordType === 'first' ? '비밀번호 재설정' : '비밀번호 재설정 확인'}
            </CustomText>
          </View>
          <CustomButton onPress={() => onFocus()} style={{ paddingTop: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              {showArr.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      flexDirection: 'row',
                      width: 12,
                      height: 12,
                      backgroundColor: showArr[index] ? Color.Primary1000 : Color.Gray400,
                      borderRadius: 50,
                      marginHorizontal: 4,
                    }}
                  />
                );
              })}
            </View>
          </CustomButton>
        </View>
      </KeyboardAvoidingView>
      <TextInput
        ref={InputRef}
        autoCompleteType="off"
        placeholderTextColor={Color.Gray300}
        style={{
          color: 'transparent',
          fontSize: 0,
          padding: 0,
        }}
        autoFocus
        keyboardType="number-pad"
        autoCorrect={false}
        maxLength={6}
        onChangeText={(text) => onChangeText(text)}
        value={passwordType === 'first' ? paymentPwd : confirmPaymentPwd}
        allowFontScaling={false}
      />
    </CustomButton>
  );
};

export default RegisterPasswordModifyScreen;
