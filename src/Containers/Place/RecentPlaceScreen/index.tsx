import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import PlaceActions from '@/Stores/Place/Actions';
import PlaceLargeCard from '@/Components/Card/Common/PlaceLargeCard';

const RecentPlaceScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { recentListPage, recentList } = useSelector((state: PlaceState) => state.place);
  console.log('아아아:', recentList);
  useEffect(() => {
    const params = {
      perPage: 10,
      page: 1,
    };

    dispatch(PlaceActions.fetchPlaceRecentList(params));
  }, []);

  const onMore = () => {
    const params = {
      perPage: 10,
      page: recentListPage,
    };
    if (recentListPage > 1) dispatch(PlaceActions.fetchPlaceRecentList(params));
  };

  const onRefresh = () => {
    const params = {
      perPage: 10,
      page: 1,
    };
    dispatch(PlaceActions.fetchPlaceRecentList(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} text={'최근 본 볼링장'} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={recentList}
          renderItem={({ item }) => (
            <>
              <PlaceLargeCard item={item} />
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={4}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          contentContainerStyle={{ backgroundColor: Color.White, paddingBottom: heightInfo.statusHeight }}
          scrollEnabled
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          onRefresh={() => onRefresh()}
        />
      </View>
    </View>
  );
};

export default RecentPlaceScreen;
