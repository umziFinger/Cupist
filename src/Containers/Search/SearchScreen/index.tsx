import React, { useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { Color } from '@/Assets/Color';
import { SearchState } from '@/Stores/Search/InitialState';
import SearchActions from '@/Stores/Search/Actions';
import CustomText from '@/Components/CustomText';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import Header from '@/Components/Header';
import InputLocationSearch from '@/Components/Input/LocationSerach';
import PlaceXSmallCard, { SCREEN_TYPE } from '@/Components/Card/Common/PlaceXSmallCard';
import CustomButton from '@/Components/CustomButton';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import { fetchSearchRecentList, fetchSearchRecentListPost } from '@/Sagas/SearchSaga';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  const { searchQuery, bowlingList, bowlingListPage, recentSearch } = useSelector((state: SearchState) => state.search);

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

  useEffect(() => {
    const uniqueId = getUniqueId();
    console.log(uniqueId);
    const params = {
      uniqueId,
      perPage: 30,
      page: 1,
    };
    dispatch(SearchActions.fetchSearchRecentList(params));
    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'searchQueryInit' }));
    };
  }, []);

  // console.log('=========', recentSearch);

  useEffect(() => {
    const params = {
      query: searchQuery,
      perPage: 10,
      page: 1,
    };
    dispatch(SearchActions.fetchSearchBowlingClubList(params));
  }, []);

  const onMore = () => {
    const params = {
      query: searchQuery,
      perPage: 10,
      page: bowlingListPage,
    };
    if (bowlingListPage > 1) dispatch(SearchActions.fetchSearchBowlingClubList(params));
  };

  const onRefresh = () => {
    const params = {
      query: searchQuery,
      perPage: 10,
      page: 1,
    };
    dispatch(SearchActions.fetchSearchBowlingClubList(params));
  };

  const onSubmit = (): void => {
    const uniqueId = getUniqueId();

    const params = {
      uniqueId,
      query: searchQuery,
    };
    dispatch(SearchActions.fetchSearchRecentListPost(params));
  };

  const onChangeText = (text: string) => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: text }));
    debounceFunc.current(text);
  };

  const onClearKeyword = () => {
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: '' }));
  };

  const isValidKeyword = () => {
    // 검색어가 있을때
    return !(searchQuery !== '' && searchQuery !== null);
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
        <View style={{ width: 60, height: 60, marginTop: 141 }}>
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
            {`검색 결과가 없습니다.\n검색어를 변경해서 다시 검색해보세요.`}
          </CustomText>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <KeyboardSpacerProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.White,
            paddingTop: Platform.OS === 'android' ? 0 : heightInfo.statusHeight,
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {/* <InputResidentSearch /> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <InputLocationSearch
                  onChangeText={onChangeText}
                  onClear={onClearKeyword}
                  placeHolder={'볼링장을 검색해보세요.'}
                  onSubmitEditing={() => onSubmit()}
                />
              </View>
              <CustomButton onPress={() => navigateGoBack()}>
                <View style={{ alignItems: 'center', marginLeft: 16 }}>
                  <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.Gray700 }}>
                    취소
                  </CustomText>
                </View>
              </CustomButton>
            </View>

            {searchQuery !== '' && (
              <View style={{ backgroundColor: Color.White, paddingVertical: 20 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow1000 }}
                >
                  {searchQuery} 검색결과 {bowlingList?.placeCount || 0}건
                </CustomText>
              </View>
            )}

            <FlatList
              data={bowlingList?.place}
              renderItem={({ item }) => (
                <View style={{ backgroundColor: Color.White }}>
                  <PlaceXSmallCard item={item} type={SCREEN_TYPE.JOIN} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={10}
              maxToRenderPerBatch={13}
              windowSize={7}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              onEndReached={() => onMore()}
              onEndReachedThreshold={0.8}
              refreshing={false}
              onRefresh={() => onRefresh()}
              keyboardDismissMode={'interactive'}
              ListFooterComponent={() => (
                <>
                  <View style={{ paddingBottom: heightInfo.subBottomHeight }} />
                </>
              )}
              ListEmptyComponent={() => renderEmpty()}
            />
          </View>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </KeyboardSpacerProvider>
    </View>
  );
};

export default SearchScreen;
