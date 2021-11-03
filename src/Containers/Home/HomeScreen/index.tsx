import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import HomeSkeleton from '@/Containers/Home/HomeScreen/HomeSkeleton';
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

// import CopyRightView from '@/Containers/Home/HomeScreen/CopyRightView';

interface HomeProps {
  route: RouteProp<MainStackParamList, 'HomeScreen'>;
}

const HomeScreen = ({ route }: HomeProps) => {
  const dispatch = useDispatch();
  const { myLongitude, myLatitude } = useSelector((state: CommonState) => state.common);
  const { homeList } = useSelector((state: HomeState) => state.home);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY.MM.DD(dd)'));

  useEffect(() => {
    // 첫 홈 화면 현재 위치값 갱신
    // 홈 리스트 조회
    positionUpdate().then();

    // 바로예약 지역 필터 조회
    dispatch(SearchActions.fetchSearchAreaList());
  }, []);

  useEffect(() => {
    if (route?.params?.expired) {
      console.log('navigate token expired!!!', route);
      AsyncStorage.setItem('userIdx', '');
      dispatch(AuthActions.fetchAuthReducer({ type: 'logout' }));
      dispatch(HomeActions.fetchHomeList());
      console.log('userIdx expired', userIdx);
    }
  }, [route]);

  // 스케쥴 날짜 선택 시 홈 갱신
  useEffect(() => {
    console.log('DIDUPDATE : ', moment(selectedDate).format('YYYY/MM/DD'));
    const params = {
      date: moment(selectedDate).format('YYYY/MM/DD'),
      lat: parseFloat(myLatitude?.toString()) || 37.56561,
      lng: parseFloat(myLongitude?.toString()) || 126.97804,
    };
    dispatch(HomeActions.fetchHomeList(params));
  }, [selectedDate]);

  const positionUpdate = async () => {
    const myPosition = await LocationMyPosition();
    console.log('myPosition is ', myPosition);
    const params = {
      date: moment(selectedDate).format('YYYY/MM/DD'),
      lat: parseFloat(myPosition?.myLatitude?.toString()) || 37.56561,
      lng: parseFloat(myPosition?.myLongitude?.toString()) || 126.97804,
    };
    dispatch(HomeActions.fetchHomeList(params));
    dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
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
            <CalendarSlider setSelectedDate={setSelectedDate} />
          </View>
        );
      }
      case 2: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 30, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <DirectReservationArea list={homeList['place'] || []} />
          </View>
        );
      }
      case 3: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 30, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <QuickPriceArea list={homeList['special'] || []} selectedDate={selectedDate} />
          </View>
        );
      }
      case 4: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 30, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <PrepaymentPriceArea list={homeList['early'] || []} />
          </View>
        );
      }
      case 5: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 30, borderTopWidth: 10, borderColor: Color.Gray200 }} />
            <HotArea list={homeList['hotPlace'] || []} />
          </View>
        );
      }
      case 6: {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 30, borderTopWidth: 10, borderColor: Color.Gray200 }} />
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
                <CustomText style={{ color: '#333', fontSize: 14 }}>{selectedDate} 테스트 로그인</CustomText>
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  backgroundColor: Color.Gray300,
                }}
              >
                <CustomText style={{ color: '#333', fontSize: 14 }}>
                  {selectedDate} 테스트 상주 볼링장 바로가기
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
      <Header type="home" />
      <FlatList
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
      />
    </View>
  );
};

export default HomeScreen;
