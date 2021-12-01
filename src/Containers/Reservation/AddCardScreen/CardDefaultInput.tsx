import React from 'react';
import { Platform, TextInput, View } from 'react-native';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';

type PropTypes = {
  placeHolder?: string | '';
  maxLength: number;
};
const CardDefaultInput = ({ placeHolder }: PropTypes) => {
  const onChangeText = (text: string, position: number) => {
    console.log('onChangeText : ', text, position);
  };
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
        maxLength={3}
        onChangeText={(text) => onChangeText(text, 1)}
        value={''}
        allowFontScaling={false}
      />
    </View>
  );
};

export default CardDefaultInput;
