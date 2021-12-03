import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import { RouteProp } from '@react-navigation/native';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import ReservationActions from '@/Stores/Reservation/Actions';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'CheckPasswordScreen'>;
}

const CheckPasswordScreen = ({ route }: PropTypes) => {
  const InputRef = useRef<any>();
  const dispatch = useDispatch();
  const { paymentIdx, billingIdx } = route.params;
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { paymentPwd } = useSelector((state: ReservationState) => state.reservation);
  // const [paymentPwd, setPaymentPwd] = useState<string>('');
  const [showArr, setShowArr] = useState<Array<boolean>>([false, false, false, false, false, false]);
  const [validation, setValidation] = useState<boolean>(false);

  useEffect(() => {
    InputRef.current.focus();
    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'paymentPwd', data: '' }));
    };
  }, []);

  useEffect(() => {
    if (paymentPwd) {
      if (paymentPwd.length === 6) {
        console.log('간편결제 비밀번호 입력완료!');
        setValidation(true);
      }
    } else {
      setShowArr([false, false, false, false, false, false]);
      setValidation(false);
    }
  }, [paymentPwd]);

  useEffect(() => {
    if (validation) {
      const params = {
        paymentIdx,
        billingIdx,
        paymentPwd,
      };
      dispatch(ReservationActions.fetchReservationSimplePayment({ paymentIdx, billingIdx, paymentPwd }));
    }
  }, [validation]);

  const onChangeText = async (text: string) => {
    dispatch(ReservationActions.fetchReservationReducer({ type: 'paymentPwd', data: text }));
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

  const onPressReset = () => {
    dispatch(ReservationActions.fetchReservationReducer({ type: 'paymentPwd', data: '' }));
  };

  return (
    <KeyboardSpacerProvider>
      {/* <KeyboardAvoidingView */}
      {/*  style={{ flex: 1, backgroundColor: 'transparent' }} */}
      {/*  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */}
      {/*  keyboardVerticalOffset={Platform.OS === 'android' ? 1 : undefined} */}
      {/* > */}
      <CustomButton
        onPress={() => Keyboard.dismiss()}
        effect={false}
        style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.statusHeight + 44 }}
      >
        <Header type={'close'} />

        <View style={{ flex: 0.7 }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{}}>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold', letterSpacing: -0.25 }}>
              {'비밀번호 확인'}
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
          <CustomButton onPress={() => onPressReset()} style={{ marginTop: 60 }}>
            <View>
              <CustomText
                style={{
                  color: Color.Gray600,
                  fontSize: 13,
                  fontWeight: 'bold',
                  letterSpacing: -0.2,
                  textDecorationLine: 'underline',
                }}
              >
                비밀번호 재설정
              </CustomText>
            </View>
          </CustomButton>
        </View>
        {<KeyboardSpacer />}
      </CustomButton>
      <TextInput
        ref={InputRef}
        autoCompleteType="off"
        placeholderTextColor={Color.Gray300}
        style={{
          color: 'transparent',
          fontSize: 0,
          padding: 0,
          position: 'absolute',
          bottom: -100,
        }}
        // autoFocus
        keyboardType="number-pad"
        autoCorrect={false}
        maxLength={6}
        onChangeText={(text) => onChangeText(text)}
        value={paymentPwd}
        allowFontScaling={false}
      />
      {/* </KeyboardAvoidingView> */}
    </KeyboardSpacerProvider>
  );
};

export default CheckPasswordScreen;
