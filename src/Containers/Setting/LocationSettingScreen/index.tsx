import React, { useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { Color } from '@/Assets/Color';
import { SearchState } from '@/Stores/Search/InitialState';
import SearchActions from '@/Stores/Search/Actions';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import { navigate } from '@/Services/NavigationService';
import InputLocationSearch from '@/Components/Input/LocationSerach';

const LocationSettingScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { searchQuery, searchedAreaList } = useSelector((state: SearchState) => state.search);

  const debounceFunc = useRef(
    _.debounce((text: any) => {
      const params = {
        query: text,
      };
      if (text !== '') dispatch(SearchActions.fetchSearchAreaList(params));
    }, 500),
  );

  useEffect(() => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'init' }));
    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'init' }));
    };
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      dispatch(SearchActions.fetchSearchReducer({ type: 'init' }));
    }
  }, [searchQuery]);

  const onCancel = () => {
    navigate('HomeScreen');
  };

  // console.log(selectMenu);
  const onChangeText = (text: string) => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: text }));
    debounceFunc.current(text);
  };

  const onClearKeyword = () => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: '' }));
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.White,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 60, height: 60, marginTop: 128 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Search/emptySearch.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <CustomText
            style={{
              fontSize: 14,
              fontWeight: '500',
              letterSpacing: -0.25,
              textAlign: 'center',
              color: Color.Gray400,
            }}
          >
            {`검색 결과가 없습니다.\n지역 이름을 다시 확인해주세요.`}
          </CustomText>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <KeyboardSpacerProvider>
        <View style={{ flex: 1, backgroundColor: Color.White }}>
          <Header type={'back'} text={'위치설정'} />

          <View style={{ paddingTop: 4, paddingBottom: 8, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <InputLocationSearch onChangeText={onChangeText} onClear={onClearKeyword} />
            </View>
          </View>

          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {searchQuery !== '' && (
              <View style={{ backgroundColor: Color.White, paddingTop: 24, paddingBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow1000 }}
                >
                  {`‘${searchQuery}’`} 검색결과 {searchedAreaList?.length || 0}건
                </CustomText>
              </View>
            )}

            <FlatList
              data={searchedAreaList}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: Color.White,
                    paddingVertical: 16,
                    borderBottomColor: Color.Gray200,
                    borderBottomWidth: 1,
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 14,
                      letterSpacing: -0.25,
                      color: Color.Black1000,
                    }}
                  >
                    {item?.areaName}
                  </CustomText>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={10}
              maxToRenderPerBatch={13}
              windowSize={7}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={'interactive'}
              ListFooterComponent={() => (
                <>
                  <View style={{ paddingBottom: heightInfo.subBottomHeight }} />
                </>
              )}
              ListEmptyComponent={() => renderEmpty()}
            />

            <CustomButton onPress={() => onCancel()}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: heightInfo.fixBottomHeight + 8,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: Color.Primary1000,
                    flexDirection: 'row',
                    paddingHorizontal: 34,
                    paddingVertical: 14,
                    alignItems: 'center',
                    borderRadius: 24,
                  }}
                >
                  <View style={{ width: 16, height: 16 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Search/icLocaNow.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={{ marginLeft: 4 }}>
                    <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
                      현 위치로 설정
                    </CustomText>
                  </View>
                </View>
              </View>
            </CustomButton>
          </View>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </KeyboardSpacerProvider>
    </View>
  );
};

export default LocationSettingScreen;
