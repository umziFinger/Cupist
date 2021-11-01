import React, { useCallback, useEffect, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { AuthState } from '@/Stores/Auth/InitialState';

export enum AuthPhoneEnum {
  JOIN = 'join',
  ADDRESS = 'address',
}
type InputAuthPhoneProps = {
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onPressAuth: () => void;
  value: string;
  isPhoneValid: boolean;
};

function InputAuthPhone({ onChangeText, value, onPressAuth, isPhoneValid }: InputAuthPhoneProps) {
  const { isReceived } = useSelector((state: AuthState) => state.auth);

  const getValidColor = () => {
    let backgroundColor = Color.Grayyellow200;
    let textColor = Color.White;
    let borderColor;

    if (isPhoneValid && !isReceived) {
      // 핸드폰 번호 정규식 통과
      backgroundColor = Color.Primary1000;
      textColor = Color.White;
      borderColor = undefined;
    } else if (isPhoneValid && isReceived) {
      // 인증번호 호출
      backgroundColor = Color.White;
      textColor = Color.Primary1000;
      borderColor = Color.Primary1000;
    } else {
      // 초기값
      backgroundColor = Color.Grayyellow200;
      textColor = Color.White;
      borderColor = undefined;
    }

    return {
      backgroundColor,
      textColor,
      borderColor,
    };
  };

  return (
    <>
      <View style={{}}>
        <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow500 }}>휴대폰번호</CustomText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'red' }}>
        <View
          style={{
            paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
            paddingLeft: 12,
            borderRadius: 3,
            // borderColor: passwordValidText === '' ? Color.Gray300 : Color.Error,
            borderColor: Color.Gray300,
            borderWidth: 1,
            marginTop: 8,
            marginRight: 8,
            flex: 1,
          }}
        >
          <TextInput
            autoCompleteType="off"
            placeholder="휴대폰 번호를 입력해주세요."
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
            maxLength={13}
            onChangeText={onChangeText}
            value={value}
          />
        </View>

        <CustomButton onPress={() => onPressAuth()}>
          <View
            style={{
              backgroundColor: getValidColor().backgroundColor,
              borderColor: getValidColor().borderColor,
              borderWidth: getValidColor().borderColor ? 1 : undefined,
              paddingVertical: 16,
              borderRadius: 5,
              paddingLeft: 25,
              paddingRight: 24,
              marginTop: 8,
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: -0.25,
                color: getValidColor().textColor,
              }}
            >
              {isReceived ? '다시 받기' : '인증하기'}
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </>
  );
}

export default InputAuthPhone;
