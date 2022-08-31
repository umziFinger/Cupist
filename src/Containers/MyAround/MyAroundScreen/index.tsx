import React, { useEffect, useRef, useState } from 'react';
import { Animated, AppState, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import PlaceActions from '@/Stores/Place/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import Config from '@/Config';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import PlaceLargeCard from '@/Components/Card/Common/PlaceLargeCard';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import LocationMyPosition from '@/Components/Permission/Location/LocationMyPosition';
import CommonActions from '@/Stores/Common/Actions';
import { LocationCheck, LocationRequest } from '@/Components/Permission/Location';
import { HomeState } from '@/Stores/Home/InitialState';
import { scrollCalendarHandler } from '@/Components/Function';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MyAroundScreen = () => {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const [isScroll, setIsScroll] = useState(false);
  const [headerText, setHeaderText] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const [handler, setHandler] = useState<any>();
  const { myLatitude = 37, myLongitude = 126 } = useSelector((state: CommonState) => state.common);
  const {
    myAroundSort = { index: 0, key: 'distance', value: '거리순' },
    myAroundList,
    myAroundListPage = 1,
    location = { areaCode: '', lat: '', lng: '', areaName: '' },
  } = useSelector((state: PlaceState) => state.place);
  const { calendarDate } = useSelector((state: HomeState) => state.home);

  const date = moment(calendarDate).format('YYYY/MM/DD');

  const getSearchList = () => {
    const params = {
      date,
      areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
      lat: location.lat || myLatitude || 37,
      lng: location.lng || myLongitude || 126,
      sort: myAroundSort.key,
      perPage: 10,
      page: 1,
    };
    dispatch(PlaceActions.fetchPlaceSearchList(params));
  };

  const reqMyPosition = async () => {
    const LocationCheckResult = await LocationCheck();

    // 위치 권한 체크
    if (LocationCheckResult) {
      const myPosition: any = await LocationMyPosition();

      dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));

      if (location?.areaName === '') {
        if (myAroundSort?.key === 'albamon') {
          setHeaderText('알바몬 코리아 볼링왕');
        } else {
          setHeaderText('내주변');
        }
      } else if (myAroundSort?.key === 'albamon') {
        setHeaderText('알바몬 코리아 볼링왕');
      } else {
        setHeaderText(location?.areaName);
      }

      setActiveFilter(true);
    } else {
      const LocationRequestResult = await LocationRequest();
      if (LocationRequestResult) {
        const myPosition: any = await LocationMyPosition();

        dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));

        if (location?.areaName === '') {
          if (myAroundSort?.key === 'albamon') {
            setHeaderText('알바몬 코리아 볼링왕');
          } else {
            setHeaderText('내주변');
          }
        } else if (myAroundSort?.key === 'albamon') {
          setHeaderText('알바몬 코리아 볼링왕');
        } else {
          setHeaderText(location?.areaName);
        }

        setActiveFilter(true);
      } else {
        setHeaderText('위치정보 없음');
        setActiveFilter(false);
      }
    }
  };

  const handleAppStateChange = async (nextAppState: any) => {
    console.log('state', nextAppState);
    switch (nextAppState) {
      case 'active': {
        reqMyPosition().then();
        break;
      }
      case 'background': {
        break;
      }
      default: {
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    return () => {
      handler?.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('REGISTER handler');
      setHandler(AppState.addEventListener('change', handleAppStateChange));
      reqMyPosition().then();
    } else {
      console.log('DELETE handler');
      handler.remove();
    }
  }, [isFocused, myAroundSort]);

  useEffect(() => {
    console.log('내주변 볼링장 위치 변경: ', location.lat, location.areaCode, location.lng);
    getSearchList();
  }, [location.lat, location.areaCode, location.lng, myAroundSort.key, date]);

  const onMore = () => {
    const params = {
      date,
      areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
      lat: location.lat || myLatitude || 37,
      lng: location.lng || myLongitude || 126,
      sort: myAroundSort.key,
      perPage: 10,
      page: myAroundListPage,
    };
    if (myAroundListPage > 1) dispatch(PlaceActions.fetchPlaceSearchList(params));
  };

  const onRefresh = () => {
    getSearchList();
  };

  const handleScroll = (e: any) => {
    const result = scrollCalendarHandler(e, 170 + (isScroll ? 0 : 140));
    setIsScroll(result.isShow);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <Header type={'myAround'} text={headerText} activeFilter={activeFilter} isScroll={isScroll} />
        <AnimatedFlatList
          data={activeFilter ? myAroundList : []}
          renderItem={({ item }: any) => (
            <View style={{ paddingHorizontal: 20 }}>
              <PlaceLargeCard item={item} type={'myAround'} />
            </View>
          )}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          refreshing={false}
          onRefresh={() => onRefresh()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            listener: (e) => handleScroll(e),
            useNativeDriver: true,
          })}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                backgroundColor: Color.White,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <View style={{ width: 72, height: 70, marginTop: 116 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/emptyRingmiSad.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>

              {activeFilter ? (
                <>
                  <View style={{ marginTop: 28 }}>
                    <CustomText
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.25,
                        textAlign: 'center',
                        color: Color.Gray400,
                      }}
                    >
                      {`근처에 볼링장이 없습니다.\n다른 지역의 볼링장을 탐색해보세요.`}
                    </CustomText>
                  </View>
                  <CustomButton onPress={() => navigate('LocationSettingScreen')}>
                    <View style={{ marginTop: 24 }}>
                      <CustomText
                        style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}
                      >
                        지역 선택하기
                      </CustomText>
                    </View>
                  </CustomButton>
                </>
              ) : (
                <>
                  <View style={{ marginTop: 28 }}>
                    <CustomText
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.25,
                        textAlign: 'center',
                        color: Color.Gray400,
                      }}
                    >
                      {`내 주변의 볼링장검색을 위해\n위치 정보가 필요합니다.`}
                    </CustomText>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <CustomText
                      style={{
                        fontSize: 12,
                        textAlign: 'center',
                        color: Color.Gray400,
                      }}
                    >
                      {`휴대폰 설정에서 위치 접근 허용\n또는 내 위치를 직접 설정해주세요.`}
                    </CustomText>
                  </View>
                  <CustomButton onPress={() => reqMyPosition().then()}>
                    <View style={{ marginTop: 24 }}>
                      <CustomText
                        style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}
                      >
                        위치 접근 허용
                      </CustomText>
                    </View>
                  </CustomButton>
                </>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyAroundScreen;
