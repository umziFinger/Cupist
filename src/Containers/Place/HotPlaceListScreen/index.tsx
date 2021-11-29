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
import HotPlaceCard from './HotPlaceCard';

const HotPlaceListScreen = () => {
  const dispatch = useDispatch();
  const { myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { hotPlaceList } = useSelector((state: PlaceState) => state.place);

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

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} />
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', marginRight: 2 }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
                    Hot 볼리
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
                  요즘 가장 핫한 BEST 볼링장
                </CustomText>
              </View>
              <View style={{ flex: 1, marginTop: 24 }}>
                <FlatList
                  data={hotPlaceList || []}
                  // data={list || []}
                  renderItem={({ item: place, index }) => {
                    return <HotPlaceCard item={place} type={'hot'} />;
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={2}
                  maxToRenderPerBatch={5}
                  windowSize={7}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
        />
      </View>
    </View>
  );
};

export default HotPlaceListScreen;
