import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CalendarSlider from '@/Containers/Home/HomeScreen/CalendarSlider';
import TicketSlider from '@/Components/Card/Common/TicketSlider';
import ImageArea from '@/Containers/Place/PlaceDetailScreen/ImageArea';
import TitleArea from '@/Containers/Place/PlaceDetailScreen/TitleArea';
import MapArea from '@/Containers/Place/PlaceDetailScreen/MapArea';
import ReviewArea from '@/Containers/Place/PlaceDetailScreen/ReviewArea';
import { HomeState } from '@/Stores/Home/InitialState';
import PlaceActions from '@/Stores/Place/Actions';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PlaceDetailScreen'>;
}
const PlaceDetailScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { idx } = route.params;
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { placeDetail, placeTicketList } = useSelector((state: PlaceState) => state.place);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  // const { place, latestReview, starReview, together } = placeDetail;
  const place = placeDetail?.place || {};
  const latestReview = placeDetail?.latestReview || [];
  const starReview = placeDetail?.starReview || [];

  useEffect(() => {
    console.log('PlaceDetailScreen Idx : ', calendarDate);
    dispatch(PlaceActions.fetchPlaceDetail({ idx }));
    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'placeDetailInit' }));
    };
  }, []);

  useEffect(() => {
    console.log('didUpdate detail');
    dispatch(PlaceActions.fetchPlaceTicketList({ idx, date: moment(calendarDate).format('YYYY-MM-DD') }));
  }, [calendarDate]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    switch (item) {
      case 0: {
        return (
          <View style={{ flex: 1 }}>
            <ImageArea item={place} />
          </View>
        );
      }
      case 1: {
        return (
          <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
            <TitleArea item={place} />
          </View>
        );
      }
      case 2: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 30, paddingLeft: 20 }}>
              <CalendarSlider />
            </View>
          </View>
        );
      }
      case 3: {
        return (
          <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ height: 1, backgroundColor: Color.Gray300 }} />
            <View style={{ paddingLeft: 24 }}>
              <TicketSlider allowedTimeArr={[0, 1, 2]} item={placeTicketList || {}} />
            </View>
          </View>
        );
      }
      case 4: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
              <MapArea item={place} />
            </View>
          </View>
        );
      }
      case 5: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28 }}>
              <ReviewArea item={place} latestReview={latestReview} starReview={starReview} />
            </View>
          </View>
        );
      }
      case 6: {
        // 다른 유저들이 함께 본 볼링장
        return (
          <View style={{ flex: 1, marginTop: 16 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            {/* <View style={{ marginTop: 28 }}> */}
            {/*  <ReviewArea item={place} latestReview={latestReview} starReview={starReview} /> */}
            {/* </View> */}
          </View>
        );
      }
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'placeDetail'} />
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={7}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        contentContainerStyle={{ backgroundColor: Color.White, paddingBottom: heightInfo.statusHeight }}
      />
    </View>
  );
};

export default PlaceDetailScreen;
