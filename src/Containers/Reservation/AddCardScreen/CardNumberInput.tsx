import React, { forwardRef } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { Color } from '@/Assets/Color';

type PropTypes = {
  placeHolder?: string | '';
  maxLength: number;
  value: any;
  onChangeText: (text: string, index: number) => void;
};
const CardNumberInput = forwardRef<TextInput, PropTypes>(
  ({ placeHolder, maxLength, value, onChangeText }: PropTypes, ref) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.Gray300,
          borderRadius: 3,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 30,
          paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
        }}
      >
        <TextInput
          ref={ref}
          autoCompleteType="off"
          placeholder={placeHolder}
          placeholderTextColor={Color.Gray300}
          style={{
            color: Color.Gray400,
            fontSize: 14,
            letterSpacing: -0.22,
            padding: 0,
          }}
          autoFocus={false}
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={(text) => onChangeText(text, 1)}
          value={value['cardNum1']}
          allowFontScaling={false}
        />
        <View style={{ width: 5, height: 1, backgroundColor: Color.Gray700 }} />
        <TextInput
          ref={ref}
          autoCompleteType="off"
          placeholder="0000"
          placeholderTextColor={Color.Gray300}
          style={{
            color: Color.Gray400,
            fontSize: 14,
            letterSpacing: -0.22,
            padding: 0,
          }}
          autoFocus={false}
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={(text) => onChangeText(text, 2)}
          value={value['cardNum2']}
          allowFontScaling={false}
        />
        <View style={{ width: 5, height: 1, backgroundColor: Color.Gray700 }} />
        <TextInput
          ref={ref}
          autoCompleteType="off"
          placeholder="0000"
          placeholderTextColor={Color.Gray300}
          style={{
            color: Color.Gray400,
            fontSize: 14,
            letterSpacing: -0.22,
            padding: 0,
          }}
          autoFocus={false}
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={(text) => onChangeText(text, 3)}
          value={value['cardNum3']}
          allowFontScaling={false}
        />
        <View style={{ width: 5, height: 1, backgroundColor: Color.Gray700 }} />
        <TextInput
          ref={ref}
          autoCompleteType="off"
          placeholder="0000"
          placeholderTextColor={Color.Gray300}
          style={{
            color: Color.Gray400,
            fontSize: 14,
            letterSpacing: -0.22,
            padding: 0,
          }}
          autoFocus={false}
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={(text) => onChangeText(text, 4)}
          value={value['cardNum4']}
          allowFontScaling={false}
        />
      </View>
    );
  },
);
CardNumberInput.displayName = 'CardNumberInput';
export default CardNumberInput;
