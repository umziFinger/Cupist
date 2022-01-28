import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { AuthState } from '@/Stores/Auth/InitialState';
import 'moment/locale/ko';
import CalendarSlider from '@/Components/Calendar/CalendarSlider';
import DirectReservationArea from './DirectReservationArea';
import HomeActions from '@/Stores/Home/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import SearchActions from '@/Stores/Search/Actions';
import CommonActions from '@/Stores/Common/Actions';
import LocationMyPosition from '@/Components/Permission/Location/LocationMyPosition';
import HelloArea from '@/Containers/Home/HomeScreen/HelloArea';
import FreeBowlingArea from '@/Containers/Home/HomeScreen/FreeBowlingArea';
import PartTimeBowlingArea from '@/Containers/Home/HomeScreen/PartTimeBowlingArea';
import EventHotArea from '@/Containers/Home/HomeScreen/EventHotArea';
import BannerArea from '@/Containers/Home/HomeScreen/BannerArea';
import { DATA_TIME_FILTER } from '@/Containers/Home/HomeScreen/data';
import { scrollHomeHandler } from '@/Components/Function';
import { SearchState } from '@/Stores/Search/InitialState';
import CopyRightArea from '@/Containers/Home/HomeScreen/CopyRightArea';

import { LocationCheck } from '@/Components/Permission/Location';

interface HomeProps {
  route: RouteProp<MainStackParamList, 'HomeScreen'>;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = ({ route }: HomeProps) => {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { homeTabRefreshYN, myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { homeList, calendarDate, timeFilterIdx, areaFilterIdx, prepaymentDate } = useSelector(
    (state: HomeState) => state.home,
  );
  const { areaList } = useSelector((state: SearchState) => state.search);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    console.log('============홈 초기화');
    // 첫 홈 화면 현재 위치값 갱신
    // 홈 리스트 조회
    positionUpdate().then();

    // 바로예약 지역 필터 조회
    dispatch(SearchActions.fetchSearchAreaList());

    dispatch(HomeActions.fetchHomeReducer({ type: 'areaFilterIdx', data: 1 }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'timeFilterIdx', data: DATA_TIME_FILTER[0].idx }));
  }, [userIdx]);

  useEffect(() => {
    if (route?.params?.expired) {
      console.log('navigate token expired!!!', route);
      AsyncStorage.setItem('userIdx', '');
      dispatch(AuthActions.fetchAuthReducer({ type: 'logout' }));
    }
  }, [route]);

  useEffect(() => {
    if (homeTabRefreshYN === 'N') {
      onRefresh();
    }
  }, [homeTabRefreshYN]);

  // 캘린더 날짜 선택 시 홈 갱신
  useEffect(() => {
    console.log('캘린더 날짜 변경 : ', calendarDate);
    positionUpdate().then();
  }, [calendarDate]);

  // 선결제 특가 필터 날짜 변경
  useEffect(() => {
    // 홈 자유 볼링 호출
    dispatch(
      HomeActions.fetchHomeFreeBowlingPlaceList({
        date: prepaymentDate,
        lat: parseFloat(myLatitude?.toString()) || 37.56561,
        lng: parseFloat(myLongitude?.toString()) || 126.97804,
      }),
    );
  }, [prepaymentDate]);

  const positionUpdate = async () => {
    const LocationCheckResult = await LocationCheck();
    if (LocationCheckResult) {
      console.log('위치 권한 인증');
      const myPosition = await LocationMyPosition();
      dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));
    }
    /* const myPosition: any = await LocationMyPosition();
    console.log('myPosition is ', myPosition);
    const params = {
      date: moment(calendarDate).format('YYYY/MM/DD'),
      lat: parseFloat(myPosition?.myLatitude?.toString()) || 37.56561,
      lng: parseFloat(myPosition?.myLongitude?.toString()) || 126.97804,
    }; */

    const params = {
      date: moment(calendarDate).format('YYYY/MM/DD'),
      lat: parseFloat(myLatitude?.toString()) || 37.56561,
      lng: parseFloat(myLongitude?.toString()) || 126.97804,
    };

    // 홈 리스트 호출
    dispatch(HomeActions.fetchHomeList(params));

    // const startTime = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].startTime : null;
    // const endTime = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].endTime : null;
    const type = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].key : 'all';
    let areaCode;

    if (areaFilterIdx > 1) {
      areaCode = areaList[areaFilterIdx - 2]?.code;
      console.log('지역명 : ', areaList[areaFilterIdx - 2]?.area);
    }

    // 홈 바로 예약 호출
    dispatch(
      HomeActions.fetchHomeDirectReservationList({
        ...params,
        // startTime,
        // endTime,
        areaCode,
        type,
      }),
    );

    // 홈 자유 볼링 호출
    dispatch(
      HomeActions.fetchHomeFreeBowlingPlaceList({
        date: prepaymentDate,
        lat: parseFloat(myLatitude?.toString()) || 37.56561,
        lng: parseFloat(myLongitude?.toString()) || 126.97804,
      }),
    );
  };

  const onRefresh = () => {
    console.log('새로고침');
    positionUpdate().then();

    // 선결제 필터 선택시 데이터가 없는경우 선결제 특가 영역 자체가 사라지며, 날짜 필터를 선택할 수 없는 경우 발생하여 추가
    dispatch(
      HomeActions.fetchHomeReducer({
        type: 'prepaymentDate',
        data: moment().add('days', 1).format('YYYY-MM-D').toString(),
      }),
    );

    dispatch(CommonActions.fetchCommonReducer({ type: 'homeTabRefreshYN', data: 'Y' }));
  };

  const handleScroll = (event: any) => {
    const result = scrollHomeHandler(event, 230, 1800);
    setIsShow(result.isShow);
  };

  const renderItem = (item: any) => {
    switch (item) {
      case 0: {
        return (
          <View style={{ flex: 1, marginTop: 40, paddingLeft: 20 }}>
            {/* <CustomButton */}
            {/*  onPress={() => { */}
            {/*    console.log('제거'); */}

            {/*    AsyncStorage.setItem('userIdx', ''); */}
            {/*    AsyncStorage.setItem('accessToken', ''); */}
            {/*    AsyncStorage.setItem('refreshToken', ''); */}

            {/*    // navigate('HomeScreen', { expired: true }); */}
            {/*  }} */}
            {/* > */}
            {/*  <View style={{ paddingVertical: 20 }}> */}
            {/*    <CustomText>리프레시 토큰 제거</CustomText> */}
            {/*  </View> */}
            {/* </CustomButton> */}

            <HelloArea />
          </View>
        );
      }
      case 1: {
        return (
          <View style={{ flex: 1, paddingLeft: 20, marginTop: 30 }}>
            <CalendarSlider />
          </View>
        );
      }
      case 2: {
        return (
          // 바로예약
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <DirectReservationArea list={homeList['place'] || []} />
          </View>
        );
      }

      case 3: {
        return (
          // 배너
          homeList['banner']?.length > 0 && (
            <View style={{ flex: 1 }}>
              <BannerArea list={homeList['banner'] || []} />
            </View>
          )
        );
      }

      case 4: {
        return (
          // 시간제 볼링
          <View style={{ flex: 1 }}>
            <PartTimeBowlingArea list={homeList['normal'] || []} />
          </View>
        );
      }

      case 5: {
        return (
          // 자유 볼링 (없으면 영역 숨김)
          homeList['free']?.length > 0 && (
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
              <FreeBowlingArea list={homeList['free'] || []} />
            </View>
          )
        );
      }
      case 6: {
        return (
          // 이벤트 HOT
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <EventHotArea list={homeList['event'] || []} />
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
          </View>
        );
      }
      case 7: {
        return (
          <View style={{ flex: 1, marginTop: 50, paddingHorizontal: 20, paddingBottom: 20 }}>
            <CopyRightArea />
          </View>
        );
      }
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="home" isShow={isShow} />
      <AnimatedFlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }): any => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={7}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => onRefresh()}
        // ListFooterComponent={<CopyRightView />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          listener: (event) => handleScroll(event),
          useNativeDriver: true,
        })}
      />
    </View>
  );
};

export default HomeScreen;
