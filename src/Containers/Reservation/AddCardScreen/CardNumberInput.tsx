import React from 'react';
import { Platform, TextInput, View } from 'react-native';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';

const CardNumberInput = () => {
  const onChangeText = (text: string, position: number) => {
    console.log('onChangeText : ', text, position);
  };
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
        maxLength={3}
        onChangeText={(text) => onChangeText(text, 1)}
        value={''}
        allowFontScaling={false}
      />
      <View style={{ width: 5, height: 1, backgroundColor: Color.Gray700 }} />
      <TextInput
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
        maxLength={3}
        onChangeText={(text) => onChangeText(text, 2)}
        value={''}
        allowFontScaling={false}
      />
      <View style={{ width: 5, height: 1, backgroundColor: Color.Gray700 }} />
      <TextInput
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
        maxLength={3}
        onChangeText={(text) => onChangeText(text, 3)}
        value={''}
        allowFontScaling={false}
      />
      <View style={{ width: 5, height: 1, backgroundColor: Color.Gray700 }} />
      <TextInput
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
        maxLength={3}
        onChangeText={(text) => onChangeText(text, 4)}
        value={''}
        allowFontScaling={false}
      />
    </View>
  );
};

export default CardNumberInput;
