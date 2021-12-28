import React, { useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { RouteProp } from '@react-navigation/native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Color } from '@/Assets/Color';
import { SearchState } from '@/Stores/Search/InitialState';
import SearchActions from '@/Stores/Search/Actions';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import PlaceXSmallCard, { SCREEN_TYPE } from '@/Components/Card/Common/PlaceXSmallCard';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import InputLocationSearch from '@/Components/Input/LocationSerach';
import { MainStackParamList } from '@/Navigators/MainNavigator';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'ResidentSearchScreen'>;
}

const ResidentSearchScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const type: SCREEN_TYPE = route?.params?.type;
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { searchQuery, bowlingList, bowlingListPage } = useSelector((state: SearchState) => state.search);
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
    dispatch(SearchActions.fetchSearchReducer({ type: 'residentInit' }));
    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'residentInit' }));
    };
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      dispatch(SearchActions.fetchSearchReducer({ type: 'residentInit' }));
    }
  }, [searchQuery]);

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

  const onCancel = () => {
    navigate('HomeScreen');
  };

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
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <Header type={'close'} text={'상주볼링장'} />

        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <InputLocationSearch onChangeText={onChangeText} onClear={onClearKeyword} />
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
                <PlaceXSmallCard item={item} type={type} />
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
          {type === SCREEN_TYPE.JOIN && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: heightInfo.fixBottomHeight + 8,
                alignItems: 'center',
              }}
            >
              <CustomButton onPress={() => onCancel()}>
                <View
                  style={{
                    backgroundColor: Color.Primary1000,
                    flexDirection: 'row',
                    paddingRight: 46,
                    paddingLeft: 45,
                    paddingVertical: 13,
                    alignItems: 'center',
                    borderRadius: 24,
                  }}
                >
                  <View>
                    <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
                      다음에 할게요
                    </CustomText>
                  </View>
                </View>
              </CustomButton>
            </View>
          )}
        </View>
      </View>
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  );
};

export default ResidentSearchScreen;
