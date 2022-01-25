import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import PlaceActions from '@/Stores/Place/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import EventHotCard from '@/Components/Card/Home/EventHotCard';
import TabMenu from '@/Components/TabMenu';
import { EVENT_HOT_TAB_MENU } from '@/Containers/Place/HotPlaceListScreen/data';

const HotPlaceListScreen = () => {
  const dispatch = useDispatch();
  const { myLatitude, myLongitude, heightInfo } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const {
    hotPlaceList,
    hotPlaceListPage,
    selectedEventHotTab = { name: '최신순', category: 'latest' },
  } = useSelector((state: PlaceState) => state.place);

  useEffect(() => {
    const params = {
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 10,
      date: calendarDate,
      sort: selectedEventHotTab?.category,
    };
    dispatch(PlaceActions.fetchPlaceEventHotList(params));

    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'hotPlaceListPage', data: 1 }));
      // dispatch(PlaceActions.fetchPlaceReducer({ type: 'hotPlaceListInit' }));
    };
  }, []);

  const onRefresh = () => {
    const params = {
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 10,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceEventHotList(params));
  };

  const onMore = () => {
    if (hotPlaceListPage > 1) {
      const params = {
        lat: myLatitude,
        lng: myLongitude,
        page: hotPlaceListPage || 1,
        perPage: 10,
        date: calendarDate,
      };
      dispatch(PlaceActions.fetchPlaceEventHotList(params));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} />
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', marginRight: 2 }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
                    이벤트 HOT
                  </CustomText>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <CustomText
                    style={{ color: Color.Primary1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}
                  >
                    {hotPlaceList?.length || 0}
                  </CustomText>
                </View>
              </View>
              <View style={{ justifyContent: 'center', marginTop: 6 }}>
                <CustomText style={{ color: Color.Gray400, fontSize: 13, letterSpacing: -0.2 }}>
                  캡슐, 솔로 각종 이벤트 볼링장
                </CustomText>
              </View>

              <View style={{ marginTop: 16 }}>
                <TabMenu type={'eventHot'} data={EVENT_HOT_TAB_MENU} />
              </View>

              <View style={{ flex: 1, marginTop: 8 }}>
                <FlatList
                  data={hotPlaceList || []}
                  renderItem={({ item: place }) => {
                    return (
                      <View style={{ marginTop: 20 }}>
                        <EventHotCard item={place} />
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={7}
                  maxToRenderPerBatch={10}
                  windowSize={7}
                  onEndReached={() => onMore()}
                  onEndReachedThreshold={0.8}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={7}
          maxToRenderPerBatch={10}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => onRefresh()}
          contentContainerStyle={{ paddingBottom: heightInfo.fixBottomHeight }}
        />
      </View>
    </View>
  );
};

export default HotPlaceListScreen;
