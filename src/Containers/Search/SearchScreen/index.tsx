import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Platform, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Color } from '@/Assets/Color';
import { SearchState } from '@/Stores/Search/InitialState';
import SearchActions from '@/Stores/Search/Actions';
import CustomText from '@/Components/CustomText';
import InputLocationSearch from '@/Components/Input/LocationSerach';
import CustomButton from '@/Components/CustomButton';
import { navigateGoBack } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import PlaceSmallCard from '@/Components/Card/Common/PlaceSmallCard';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo, isSkeleton } = useSelector((state: CommonState) => state.common);

  const { searchQuery, bowlingList, bowlingListPage, recentSearch, popularList } = useSelector(
    (state: SearchState) => state.search,
  );

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
    dispatch(SearchActions.fetchSearchPopularList());

    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'searchQueryInit' }));
    };
  }, []);

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
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQueryInit' }));
  };

  const onDelete = (item: any) => {
    const uniqueId = getUniqueId();
    const data = {
      idx: item.idx,
      uniqueId,
    };
    dispatch(SearchActions.fetchSearchRecentListDelete(data));
  };

  const onDeleteAll = () => {
    const uniqueId = getUniqueId();
    const data = {
      uniqueId,
    };
    dispatch(SearchActions.fetchSearchRecentListDeleteAll(data));
  };
  const onPressQuery = (text: string) => {
    const params = {
      query: text,
      perPage: 10,
      page: 1,
    };
    dispatch(SearchActions.fetchSearchReducer({ type: 'bowlingListPage', data: 1 }));

    dispatch(SearchActions.fetchSearchBowlingClubList(params));
    dispatch(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: text }));
  };

  const isValidKeyword = useCallback(() => {
    // 검색어가 있을때
    return !(searchQuery !== '' && searchQuery !== null);
  }, [searchQuery]);

  const renderItem = ({ index }: { index: number }) => {
    switch (index) {
      case 0: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 36, paddingHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 16,
                  borderBottomColor: Color.Gray200,
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ flex: 1 }}>
                  <CustomText
                    style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow1000 }}
                  >
                    최근 검색어
                  </CustomText>
                </View>
                <CustomButton onPress={() => onDeleteAll()}>
                  <View>
                    <CustomText
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: Color.Grayyellow500,
                      }}
                    >
                      모두 지우기
                    </CustomText>
                  </View>
                </CustomButton>
              </View>
              <View style={{ marginTop: 16 }}>
                <FlatList
                  data={recentSearch}
                  renderItem={({ item, index: recentIndex }) => (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center', paddingTop: recentIndex === 0 ? 0 : 16 }}
                    >
                      <View style={{ flex: 1 }}>
                        <CustomButton onPress={() => onPressQuery(item.query)}>
                          <CustomText>{item?.query || ''}</CustomText>
                        </CustomButton>
                      </View>
                      <CustomButton onPress={() => onDelete(item)}>
                        <View style={{ width: 18, height: 18 }}>
                          <FastImage
                            style={{ width: '100%', height: '100%' }}
                            source={require('@/Assets/Images/Search/icSearchDel.png')}
                            resizeMode={FastImage.resizeMode.stretch}
                          />
                        </View>
                      </CustomButton>
                    </View>
                  )}
                  initialNumToRender={30}
                  maxToRenderPerBatch={33}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled
                />
              </View>
            </View>
            <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 30 }} />
          </View>
        );
      }
      case 1: {
        return (
          <View style={{ flex: 1, paddingLeft: 20, marginTop: 30 }}>
            <View>
              <CustomText
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  letterSpacing: -0.2,
                  color: Color.Black1000,
                }}
              >
                인기 검색 볼링장
              </CustomText>
            </View>
            <View style={{ marginTop: 21 }}>
              <FlatList
                data={popularList}
                renderItem={({ item }) => (
                  <View style={{ marginRight: 11 }}>
                    <PlaceSmallCard
                      item={item}
                      width={(width - 48 - 12) / 2}
                      showRate={false}
                      showTicketName
                      ticketType={TICKET_TYPE.ALL}
                    />
                  </View>
                )}
                keyExtractor={(item, popularIndex) => popularIndex.toString()}
                initialNumToRender={3}
                maxToRenderPerBatch={6}
                windowSize={7}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        );
      }

      default:
        return null;
    }
  };

  const renderEmpty = () => {
    if (!isSkeleton) {
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
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.White,
          paddingTop: Platform.OS === 'android' ? 0 : heightInfo.statusHeight,
        }}
      >
        <View style={{ flex: 1, backgroundColor: Color.White }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
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

          {isValidKeyword() && (
            <View style={{ flex: 1, zIndex: 99, backgroundColor: Color.White }}>
              <FlatList
                data={[0, 1, 2]}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={7}
                maxToRenderPerBatch={10}
                windowSize={7}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (
                  <>
                    <View style={{ paddingBottom: heightInfo.subBottomHeight }} />
                  </>
                )}
              />
            </View>
          )}

          {!isValidKeyword() && (
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <View style={{ backgroundColor: Color.White, paddingTop: 20, marginBottom: 16 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow1000 }}
                >
                  {`‘${searchQuery}’`} 검색결과 {bowlingList?.placeCount || 0}건
                </CustomText>
              </View>
              {searchQuery !== '' && (
                <FlatList
                  data={bowlingList?.place}
                  renderItem={({ item }) => (
                    <View style={{ marginRight: 10, marginBottom: 13 }}>
                      <PlaceSmallCard
                        item={item}
                        width={(width - 40 - 10) / 2}
                        showRate
                        showTicketName={false}
                        ticketType={TICKET_TYPE.ALL}
                      />
                    </View>
                  )}
                  numColumns={2}
                  keyExtractor={(keyItem, keyIndex) => keyIndex.toString()}
                  initialNumToRender={8}
                  maxToRenderPerBatch={11}
                  windowSize={7}
                  ListEmptyComponent={() => renderEmpty()}
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={1}
                  onEndReached={() => onMore()}
                  onRefresh={() => onRefresh()}
                  refreshing={false}
                  ListFooterComponent={
                    <>
                      <View style={{ height: heightInfo.subBottomHeight }} />
                    </>
                  }
                />
              )}
            </View>
          )}
        </View>
      </View>
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  );
};

export default SearchScreen;
