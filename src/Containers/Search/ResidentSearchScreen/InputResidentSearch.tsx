import React, { useRef } from 'react';
import { View, Platform, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import SearchActions from '@/Stores/Search/Actions';
import { SearchState } from '@/Stores/Search/InitialState';

const InputResidentSearch = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: SearchState) => state.search);

  const debounceFunc = useRef(
    _.debounce((text: any) => {
      const params = {
        query: text,
        perPage: 10,
        page: 1,
      };
      if (text !== '') dispatch(SearchActions.fetchSearchBowlingClubList(params));
    }, 500),
  );

  // console.log(selectMenu);
  const onChangeText = (text: string) => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: text }));
    debounceFunc.current(text);
  };

  const onClearKeyword = () => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: '' }));
  };

  let clearBox = null;
  if (searchQuery !== '') {
    clearBox = (
      <CustomButton onPress={() => onClearKeyword()} hitSlop={7} style={{ backgroundColor: 'red ' }}>
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
            placeholder={'구명으로 검색(ex.금천구)'}
            placeholderTextColor={Color.Gray400}
            numberOfLines={1}
            autoFocus
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeText(text)}
            value={searchQuery}
          />
          {clearBox}
        </View>
      </View>
    </View>
  );
};

export default InputResidentSearch;
