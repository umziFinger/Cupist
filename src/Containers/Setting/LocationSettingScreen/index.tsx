import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { Color } from '@/Assets/Color';
import { SearchState } from '@/Stores/Search/InitialState';
import SearchActions from '@/Stores/Search/Actions';
import PlaceActions from '@/Stores/Place/Actions';

import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import InputLocationSearch from '@/Components/Input/LocationSerach';

const LocationSettingScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo, myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { searchQuery, searchedAreaList, areaList } = useSelector((state: SearchState) => state.search);
  const [selectedCity, setSelectedCity] = useState({ code: '10', idx: 1 }); // 서울 code:"10" ,idx:1
  // const [selectedDistrict, setSelectedDistrict] = useState({ code: '1018', idx: 35 }); // 금천구 code:"1018" ,idx:35

  // console.log(areaList);
  const debounceFunc = useRef(
    _.debounce((text: any) => {
      const params = {
        query: text,
      };
      if (text !== '') dispatch(SearchActions.fetchSearchAreaList(params));
    }, 500),
  );

  useEffect(() => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'locationInit' }));
    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'locationInit' }));
    };
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      dispatch(SearchActions.fetchSearchReducer({ type: 'locationInit' }));
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
    dispatch(SearchActions.fetchSearchReducer({ type: 'locationInit', data: '' }));
  };

  const onSelectedCity = (item: any) => {
    // console.log(item.area);
    setSelectedCity({ code: item.code, idx: item.idx });
  };
  const onSelectedDistrict = (item: any) => {
    // console.log('시선택: ', areaList[selectedCity.idx - 1]);
    // console.log('구선택: ', item);
    const areaName = `${areaList[selectedCity.idx - 1].areaDisplay} ${item.area}`;
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'location',
        data: { areaCode: item.code, lat: item.lat, lng: item.lng, areaName },
      }),
    );
    navigateGoBack();
  };
  const onCurrentLocation = () => {
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'location',
        data: { areaCode: undefined, lat: myLatitude || '37', lng: myLongitude || '126' },
      }),
    );
    navigateGoBack();
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
        <Header type={'back'} text={'위치설정'} />

        <View style={{ paddingTop: 4, paddingBottom: 8, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <InputLocationSearch onChangeText={onChangeText} onClear={onClearKeyword} />
          </View>
        </View>

        {searchedAreaList?.length === 0 && searchQuery === '' ? (
          <View style={{ flex: 1, backgroundColor: Color.White }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderRightColor: Color.Gray200, borderRightWidth: 1 }}>
                <FlatList
                  data={areaList}
                  renderItem={({ item }) => (
                    <CustomButton onPress={() => onSelectedCity(item)}>
                      <View
                        style={{
                          paddingVertical: 14,
                          paddingHorizontal: 59,
                          borderBottomColor: Color.Gray200,
                          borderBottomWidth: 1,
                          backgroundColor: selectedCity.code === item.code ? Color.White : Color.Gray100,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 14,
                            fontWeight: selectedCity.code === item.code ? '500' : undefined,
                            letterSpacing: -0.25,
                            color: selectedCity.code === item.code ? Color.Black1000 : Color.Gray600,
                          }}
                        >
                          {item?.area || ''}
                        </CustomText>
                      </View>
                    </CustomButton>
                  )}
                  showsVerticalScrollIndicator={false}
                  windowSize={7}
                  initialNumToRender={16}
                  maxToRenderPerBatch={19}
                  ListFooterComponent={() => <View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
                  keyboardDismissMode={'interactive'}
                />
              </View>

              <View style={{ paddingLeft: 12, flex: 1 }}>
                <FlatList
                  data={areaList[selectedCity.idx - 1]?.ChildrenCode}
                  renderItem={({ item }) => (
                    <CustomButton onPress={() => onSelectedDistrict(item)}>
                      <View
                        style={{
                          paddingVertical: 14,
                          paddingLeft: 12,
                          borderBottomColor: Color.Gray200,
                          borderBottomWidth: 1,
                          backgroundColor: Color.White,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 14,
                            letterSpacing: -0.25,
                            color: Color.Black1000,
                          }}
                        >
                          {item?.area || ''}
                        </CustomText>
                      </View>
                    </CustomButton>
                  )}
                  showsVerticalScrollIndicator={false}
                  windowSize={7}
                  initialNumToRender={16}
                  maxToRenderPerBatch={19}
                  keyboardShouldPersistTaps={'handled'}
                  ListFooterComponent={() => <View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
                  keyboardDismissMode={'interactive'}
                />
              </View>
            </View>
          </View>
        ) : (
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
                <CustomButton onPress={() => onSelectedDistrict(item)}>
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
                </CustomButton>
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
          </View>
        )}

        {Platform.OS === 'ios' && <KeyboardSpacer />}

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: heightInfo.fixBottomHeight + 8,
            alignItems: 'center',
          }}
        >
          <CustomButton onPress={() => onCurrentLocation()} style={{ zIndex: 99 }}>
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
          </CustomButton>
        </View>
      </KeyboardSpacerProvider>
    </View>
  );
};

export default LocationSettingScreen;
