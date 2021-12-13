import React, { forwardRef, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

type InputNicknameProps = {
  nicknameValidText: string;
  onChangeText: (e: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  onSubmitEditing?: () => void;
  onTextClear: () => void;
  autoFocus?: boolean;
};

const InputNickname = forwardRef<TextInput, InputNicknameProps>(
  ({ nicknameValidText, onChangeText, value, onSubmitEditing, onTextClear, autoFocus }: InputNicknameProps, ref) => {
    const [isFocused, setIsFocused] = useState(false);

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
            flexDirection: 'row',
            paddingHorizontal: 12,
            alignItems: 'center',
          }}
        >
          <TextInput
            ref={ref}
            autoCompleteType="off"
            placeholder="닉네임을 입력해주세요."
            placeholderTextColor={Color.Gray400}
            style={{
              color: Color.Black1000,
              fontSize: 14,
              padding: 0,
              letterSpacing: -0.25,
              includeFontPadding: false,
              flex: 1,
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus={autoFocus || false}
            keyboardType={'default'}
            onChangeText={onChangeText}
            autoCorrect={false}
            value={value}
            allowFontScaling={false}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
          />
          {value?.length > 0 && isFocused && (
            <CustomButton onPress={onTextClear}>
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Search/icTxtDel.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </CustomButton>
          )}
        </View>
        <View style={{ marginTop: 4 }}>
          <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Error }}>{nicknameValidText}</CustomText>
        </View>
      </>
    );
  },
);
InputNickname.displayName = 'InputNickname';

export default InputNickname;
