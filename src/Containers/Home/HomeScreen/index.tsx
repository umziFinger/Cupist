import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import RNBootSplash from 'react-native-bootsplash';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { AuthState } from '@/Stores/Auth/InitialState';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import 'moment/locale/ko';
import CalendarSlider from '@/Containers/Home/HomeScreen/CalendarSlider';
import DirectReservationArea from './DirectReservationArea';
import HomeActions from '@/Stores/Home/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import SearchActions from '@/Stores/Search/Actions';
import CommonActions from '@/Stores/Common/Actions';
import LocationMyPosition from '@/Components/Permission/Location/LocationMyPosition';
import HelloArea from '@/Containers/Home/HomeScreen/HelloArea';
import QuickPriceArea from '@/Containers/Home/HomeScreen/QuickPriceArea';
import PrepaymentPriceArea from '@/Containers/Home/HomeScreen/PrepaymentPriceArea';
import HotArea from '@/Containers/Home/HomeScreen/HotArea';
import EventArea from '@/Containers/Home/HomeScreen/EventArea';
import { DATA_TIME_FILTER } from '@/Containers/Home/HomeScreen/data';
import { scrollCalendarHandler, scrollHandler } from '@/Components/Function';

interface HomeProps {
  route: RouteProp<MainStackParamList, 'HomeScreen'>;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = ({ route }: HomeProps) => {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { myLongitude, myLatitude, homeTabRefreshYN } = useSelector((state: CommonState) => state.common);
  const { homeList, calendarDate, timeFilterIdx } = useSelector((state: HomeState) => state.home);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const [isShow, setIsShow] = useState<boolean>(false);
  // const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY.MM.DD(dd)'));

  useEffect(() => {
    // 첫 홈 화면 현재 위치값 갱신
    // 홈 리스트 조회
    positionUpdate().then();

    // 바로예약 지역 필터 조회
    dispatch(SearchActions.fetchSearchAreaList());

    dispatch(HomeActions.fetchHomeReducer({ type: 'areaFilterIdx', data: 1 }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'timeFilterIdx', data: DATA_TIME_FILTER[0].idx }));
  }, []);

  useEffect(() => {
    if (route?.params?.expired) {
      console.log('navigate token expired!!!', route);
      AsyncStorage.setItem('userIdx', '');
      dispatch(AuthActions.fetchAuthReducer({ type: 'logout' }));
      dispatch(HomeActions.fetchHomeList());
      dispatch(HomeActions.fetchHomeDirectReservationList());
      console.log('userIdx expired', userIdx);
    }
  }, [route]);

  useEffect(() => {
    if (homeTabRefreshYN === 'N') {
      onRefresh();
    }
  }, [homeTabRefreshYN]);

  // 캘린더 날짜 선택 시 홈 갱신
  useEffect(() => {
    const params = {
      date: moment(calendarDate).format('YYYY/MM/DD'),
      lat: parseFloat(myLatitude?.toString()) || 37.56561,
      lng: parseFloat(myLongitude?.toString()) || 126.97804,
    };

    // 홈 리스트 호출
    dispatch(HomeActions.fetchHomeList(params));
  }, [calendarDate]);

  const onRefresh = () => {
    console.log('새로고침');
    dispatch(HomeActions.fetchHomeList());
    dispatch(HomeActions.fetchHomeDirectReservationList());
    dispatch(CommonActions.fetchCommonReducer({ type: 'homeTabRefreshYN', data: 'Y' }));
  };

  const positionUpdate = async () => {
    const myPosition = await LocationMyPosition();
    console.log('myPosition is ', myPosition);
    const params = {
      date: moment(calendarDate).format('YYYY/MM/DD'),
      lat: parseFloat(myPosition?.myLatitude?.toString()) || 37.56561,
      lng: parseFloat(myPosition?.myLongitude?.toString()) || 126.97804,
    };

    // 홈 리스트 호출
    dispatch(HomeActions.fetchHomeList(params));

    // 홈 바로 예약 호출
    const startTime = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].startTime : null;
    const endTime = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].endTime : null;
    dispatch(
      HomeActions.fetchHomeDirectReservationList({
        ...params,
        perPage: 3,
        page: 1,
        startTime,
        endTime,
      }),
    );

    dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));
  };

  const handleScroll = (event: any) => {
    const result = scrollCalendarHandler(event, 230);
    setIsShow(result.isShow);
  };

  const renderItem = ({ item }: { item: any; index: number }) => {
    switch (item) {
      case 0: {
        return (
          <View style={{ flex: 1, marginTop: 40, paddingLeft: 20 }}>
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
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <DirectReservationArea list={homeList['place'] || []} />
          </View>
        );
      }
      case 3: {
        return (
          homeList['special']?.length > 0 && (
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
              <QuickPriceArea list={homeList['special'] || []} />
            </View>
          )
        );
      }
      case 4: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <PrepaymentPriceArea list={homeList['early'] || []} />
          </View>
        );
      }
      case 5: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <HotArea list={homeList['hotPlace'] || []} />
          </View>
        );
      }
      case 6: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <EventArea list={homeList['event'] || []} />
          </View>
        );
      }
      case 7: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <CustomButton onPress={() => onPressTestLogin()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  backgroundColor: Color.Gray300,
                }}
              >
                <CustomText style={{ color: '#333', fontSize: 14 }}>{calendarDate} 테스트 로그인</CustomText>
              </View>
            </CustomButton>
          </View>
        );
      }

      case 8: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 40, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <CustomButton onPress={() => navigate('JoinStepThreeScreen')}>
              {/* <CustomButton onPress={() => RNBootSplash.show({ fade: true })}> */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  backgroundColor: Color.Gray300,
                }}
              >
                <CustomText style={{ color: '#333', fontSize: 14 }}>
                  {calendarDate} 테스트 상주 볼링장 바로가기
                </CustomText>
              </View>
            </CustomButton>
          </View>
        );
      }
      default:
        return null;
    }
  };

  const onPressTestLogin = () => {
    console.log('onPressTestLogin');
    navigate('SimpleLoginScreen');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="home" isShow={isShow} />
      <AnimatedFlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={7}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        // onRefresh={refreshHandler}
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
