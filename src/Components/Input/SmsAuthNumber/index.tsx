import React from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import CustomButton from '@/Components/CustomButton';
import { timeFormat } from '@/Components/Function';

interface PropTypes {
  onChangeText: (value: string) => void;
  value: string;
  smsAuthTime: number;
  smsValidText: string;
  // onPressAuth: () => void;
  //
  // isPhoneValid: boolean;
}

function InputSmsAuthNumber({ onChangeText, value, smsAuthTime, smsValidText }: PropTypes) {
  const { isReceived } = useSelector((state: AuthState) => state.auth);

  return (
    <>
      <View style={{}}>
        <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow500 }}>인증번호</CustomText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          borderRadius: 3,
          borderColor: Color.Gray300,
          borderWidth: 1,
          paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
          paddingLeft: 12,

          marginTop: 8,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <TextInput
            autoCompleteType="off"
            placeholder={isReceived ? '인증번호 6자리' : '인증번호를 입력해주세요.'}
            placeholderTextColor={Color.Gray300}
            style={{
              color: Color.Black1000,
              fontSize: 15,
              letterSpacing: -0.38,
              padding: 0,
            }}
            autoFocus
            keyboardType="number-pad"
            autoCorrect={false}
            maxLength={6}
            onChangeText={onChangeText}
            value={value}
            allowFontScaling={false}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingRight: 12,
          }}
        >
          <CustomText style={{ color: Color.Error, fontSize: 12, letterSpacing: -0.2 }}>
            {smsAuthTime === 0 ? '유효시간 초과' : timeFormat(smsAuthTime)}
          </CustomText>
        </View>
      </View>

      <View style={{ marginTop: 4 }}>
        <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Error }}>{smsValidText}</CustomText>
      </View>
    </>
  );
}

export default InputSmsAuthNumber;
