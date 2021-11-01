import React, { ChangeEvent } from 'react';
import { Platform, TextInput, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

type InputNicknameProps = {
  nicknameValidText: string;
  onChangeText: (e: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  value: string;
};

function InputNickname({ nicknameValidText, onChangeText, onFocus, onBlur, value }: InputNicknameProps) {
  return (
    <>
      <View>
        <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow500 }}>닉네임</CustomText>
      </View>

      <View
        style={{
          paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
          paddingLeft: 12,
          borderRadius: 3,
          borderColor: nicknameValidText === '' ? Color.Gray300 : Color.Error,
          borderWidth: 1,
          marginTop: 8,
        }}
      >
        <TextInput
          autoCompleteType="off"
          placeholder="닉네임을 입력해주세요."
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
          autoFocus
          keyboardType={'default'}
          onChangeText={onChangeText}
          autoCorrect={false}
          value={value}
          allowFontScaling={false}
        />
      </View>
      <View style={{ marginTop: 4 }}>
        <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Error }}>{nicknameValidText}</CustomText>
      </View>
    </>
  );
}

export default InputNickname;
