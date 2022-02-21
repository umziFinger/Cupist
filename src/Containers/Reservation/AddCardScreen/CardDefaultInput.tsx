import React, { forwardRef } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { Color } from '@/Assets/Color';

type PropTypes = {
  placeHolder?: string | '';
  maxLength: number;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean | true;
  refObject: any;
};
const CardDefaultInput = forwardRef<TextInput, PropTypes>(
  ({ placeHolder, maxLength, value, onChangeText, editable = true, refObject }: PropTypes) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.Gray300,
          borderRadius: 3,
          paddingLeft: 11,
          paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
        }}
      >
        <TextInput
          ref={refObject}
          autoCompleteType="off"
          placeholder={placeHolder}
          placeholderTextColor={Color.Gray300}
          style={{
            color: Color.Black1000,
            fontSize: 14,
            letterSpacing: -0.22,
            padding: 0,
          }}
          autoFocus={false}
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          allowFontScaling={false}
          editable={editable}
        />
      </View>
    );
  },
);

CardDefaultInput.displayName = 'CardDefaultInput';
export default CardDefaultInput;
