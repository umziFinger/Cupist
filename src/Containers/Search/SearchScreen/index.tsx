import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';
import { Color } from '@/Assets/Color';
import { SearchState } from '@/Stores/Search/InitialState';
import SearchActions from '@/Stores/Search/Actions';
import CustomText from '@/Components/CustomText';

const SearchScreen = () => {
  const dispatch = useDispatch();

  const { selectMenu, searchQuery } = useSelector((state: SearchState) => state.search);

  useEffect(() => {
    // console.log(all);
    const uniqueId = getUniqueId();
    const params = {
      uniqueId,
      per_page: 30,
      page: 1,
    };
    dispatch(SearchActions.fetchRecentSearchList(params));
    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'searchQueryInit' }));
    };
  }, []);

  useEffect(() => {
    const params = {
      type: selectMenu,
      query: searchQuery,
      per_page: 10,
      page: 1,
    };

    dispatch(SearchActions.fetchSearchList(params));
  }, [selectMenu]);

  const isValidKeyword = () => {
    // 검색어가 있을때
    return !(searchQuery !== '' && searchQuery !== null);
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White, justifyContent: 'center', alignItems: 'center' }}>
      <CustomText>검색 스크린</CustomText>
    </View>
  );
};

export default SearchScreen;
