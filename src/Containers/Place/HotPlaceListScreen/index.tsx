import React, { useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import PlaceActions from '@/Stores/Place/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import HotPlaceCard from './HotPlaceCard';

const HotPlaceListScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { myLatitude, myLongitude, heightInfo } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { hotPlaceList, hotPlaceListPage } = useSelector((state: PlaceState) => state.place);

  useEffect(() => {
    const params = {
      type: 'hot',
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 10,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceHotList(params));
  }, []);

  const onRefresh = () => {
    console.log('onRefresh');
    const params = {
      type: 'hot',
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 10,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceHotList(params));
  };

  const onMore = () => {
    console.log('onMore');
    if (hotPlaceListPage > 1) {
      const params = {
        type: 'hot',
        lat: myLatitude,
        lng: myLongitude,
        page: hotPlaceListPage || 1,
        perPage: 10,
        date: calendarDate,
      };
      dispatch(PlaceActions.fetchPlaceHotList(params));
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
              <View style={{ flex: 1, marginTop: 24 }}>
                <FlatList
                  data={hotPlaceList || []}
                  renderItem={({ item: place }) => {
                    return (
                      <View style={{ width: width - 32 }}>
                        <HotPlaceCard item={place} type={'hot'} />
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  windowSize={7}
                  onEndReached={() => onMore()}
                  onEndReachedThreshold={0.8}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={4}
          maxToRenderPerBatch={7}
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
