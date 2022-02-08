import React, { forwardRef } from 'react';
import { View, Platform, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { SearchState } from '@/Stores/Search/InitialState';

type PlaceholderType = '지역명으로 검색(ex.금천구)' | '볼링장을 검색해보세요.';
type Props = {
  onChangeText: (value: string) => void;
  onClear: () => void;
  placeHolder?: PlaceholderType;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
};

const InputLocationSearch = forwardRef<TextInput, Props>((props: Props) => {
  const {
    onChangeText,
    onClear,
    placeHolder = '지역명으로 검색(ex.금천구)',
    onSubmitEditing,
    autoFocus = true,
  } = props;
  const { searchQuery } = useSelector((state: SearchState) => state.search);

  let clearBox = null;
  if (searchQuery !== '') {
    clearBox = (
      <CustomButton onPress={() => onClear()} hitSlop={7} style={{ backgroundColor: 'red ' }}>
        <View style={{ width: 16, height: 16 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Search/icTxtDel.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
    );
  }
  return (
    <View
      style={{
        // paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: Color.White,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Color.Gray200,
          borderRadius: 3,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 12,
            paddingVertical: Platform.OS === 'android' ? 5 : 10,
            alignItems: 'center',
          }}
        >
          <View style={{ width: 20, height: 20 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Search/icSearch.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <TextInput
            style={{
              fontSize: 14,
              letterSpacing: -0.25,
              color: Color.Black1000,
              padding: 0,
              marginLeft: 4,
              flex: 1,
            }}
            allowFontScaling={false}
            placeholder={placeHolder}
            placeholderTextColor={Color.Gray400}
            numberOfLines={1}
            autoFocus={autoFocus}
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeText(text)}
            value={searchQuery}
            onSubmitEditing={onSubmitEditing}
          />
          {clearBox}
        </View>
      </View>
    </View>
  );
});
InputLocationSearch.displayName = 'InputLocationSearch';
export default InputLocationSearch;
