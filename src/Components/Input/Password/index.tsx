import React from 'react';
import { Platform, TextInput, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

interface InputPasswordProps {
  passwordValidText: string;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  value: string;
}

function InputPassword({ passwordValidText, onChangeText, onFocus, onBlur, value }: InputPasswordProps) {
  return (
    <>
      <View style={{}}>
        <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow500 }}>비밀번호</CustomText>
      </View>

      <View
        style={{
          paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
          paddingLeft: 12,
          borderRadius: 3,
          borderColor: passwordValidText === '' ? Color.Gray300 : Color.Error,
          borderWidth: 1,
          marginTop: 8,
        }}
      >
        <TextInput
          autoCompleteType="off"
          placeholder="비밀번호 영어, 숫자, 특수문자 8-12자"
          placeholderTextColor={Color.Gray400}
          style={{
            color: Color.Black1000,
            fontSize: 14,
            padding: 0,
            letterSpacing: -0.25,
            includeFontPadding: false,
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={false}
          keyboardType={'default'}
          onChangeText={onChangeText}
          autoCorrect={false}
          secureTextEntry
          textContentType={'newPassword'}
          autoCapitalize={'none'}
          value={value}
          maxLength={12}
        />
      </View>
      <View style={{ marginTop: 4 }}>
        <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Error }}>{passwordValidText}</CustomText>
      </View>
    </>
  );
}

export default InputPassword;
