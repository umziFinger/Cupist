import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import { scrollCalendarHandler } from '@/Components/Function';
import { HomeState } from '@/Stores/Home/InitialState';
import { AuthState } from '@/Stores/Auth/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';
import { fetchPlaceList } from '@/Sagas/PlaceSaga';
import PlaceListCard from '@/Components/Card/PlaceList/PlaceListCard';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PlaceListScreen'>;
}
const PlaceListScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { type } = route.params;
  const { heightInfo, myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { placeListPage, placeList } = useSelector((state: PlaceState) => state.place);

  const [isShowTopCalendar, setIsShowTopCalendar] = useState<boolean>(false);
  const [screenTitle, setScreenTitle] = useState<string>('');
  const [screenContent, setScreenContent] = useState<string>('');

  console.log('type : ', type);
  useEffect(() => {
    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
    };
  }, []);

  useEffect(() => {
    console.log('didupate : ', type);
    let title = '';
    let content = '';
    if (type === 'special') {
      title = '빨리 특가';
      content = '선착순 할인 특가로 즐기는 볼링장';
    }
    if (type === 'early') {
      title = '선결제 특가';
      content = '선결제하고 할인받는 인기 볼링장';
    }
    setScreenTitle(title);
    setScreenContent(content);

    const params = {
      type,
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 5,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceList(params));
  }, [type]);

  useEffect(() => {
    console.log('날짜 변경');
    const params = {
      type,
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 5,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceList(params));
  }, [calendarDate]);

  const handleScroll = (event: any) => {
    console.log('y : ', event.nativeEvent.contentOffset.y);
    const result = scrollCalendarHandler(event, 100);
    console.log(result);
    setIsShowTopCalendar(result.isShow);
  };

  const onPressDate = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCalendarRBS', data: true }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'placeList'} text={screenTitle} isShow={isShowTopCalendar} />
      <FlatList
        data={[0]}
        renderItem={({ item, index }) => (
          <View style={{ width: '100%', height: '100%' }}>
            <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
                  {screenTitle}
                </CustomText>
              </View>
              <View style={{ justifyContent: 'center', marginTop: 6 }}>
                <CustomText style={{ color: Color.Gray400, fontSize: 13, letterSpacing: -0.2 }}>
                  {screenContent}
                </CustomText>
              </View>
              <CustomButton onPress={() => onPressDate()} style={{ marginTop: 16 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: Color.Gray200,
                    borderWidth: 1,
                    borderColor: Color.Gray300,
                    paddingVertical: 12,
                    paddingLeft: 12,
                    paddingRight: 8,
                  }}
                >
                  <View style={{ width: 16, height: 16, marginRight: 9 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Common/icCalendar.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13 }}>
                      {moment(calendarDate).format('YYYY.MM.DD(dd)')}
                    </CustomText>
                  </View>
                  <View style={{ width: 24, height: 24 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Arrow/icArrowDw.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </View>
              </CustomButton>
            </View>
            <View style={{ flex: 1, marginTop: 16 }}>
              <FlatList
                data={placeList}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
                    <PlaceListCard item={item} />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={5}
                maxToRenderPerBatch={8}
                windowSize={7}
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
        onScroll={(e) => handleScroll(e)}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: heightInfo.fixBottomHeight }}
      />
    </View>
  );
};

export default PlaceListScreen;
