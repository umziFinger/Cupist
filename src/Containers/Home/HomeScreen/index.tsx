import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Header from '@/Components/Header';
import HomeActions from '@/Stores/Home/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import HomeSkeleton from '@/Containers/Home/HomeScreen/HomeSkeleton';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import Config from '@/Config';
import { AuthState } from '@/Stores/Auth/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import 'moment/locale/ko';

// import CopyRightView from '@/Containers/Home/HomeScreen/CopyRightView';

interface HomeProps {
  route: RouteProp<MainStackParamList, 'HomeScreen'>;
}

const HomeScreen = ({ route }: HomeProps) => {
  const dispatch = useDispatch();
  // const { homeList } = useSelector((state: HomeState) => state.home);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { isOpenRepairNotificationRBS } = useSelector((state: CommonState) => state.common);
  const [headerDate, setHeaderDate] = useState<string>(moment().format('MM월 YYYY').toString());
  const [selectedDate, setSelectedDate] = useState<string>(moment().toString());

  // useEffect(() => {
  //   dispatch(HomeActions.fetchHomeList());
  // }, []);
  //
  // useEffect(() => {
  //   if (route?.params?.expired) {
  //     console.log('navigate token expired!!!', route);
  //     AsyncStorage.setItem('userIdx', '');
  //     dispatch(AuthActions.fetchAuthReducer({ type: 'logout' }));
  //     dispatch(HomeActions.fetchHomeList());
  //     console.log('userIdx expired', userIdx);
  //   }
  // }, [route]);

  // const renderItem = ({ item, index }: { item: any; index: number }) => {
  //   switch (item) {
  //     case 0: {
  //       // 핑크 알림 도착 상태
  //       if (notiCount > 0 && notiMessage) {
  //         return (
  //           <View style={{ marginBottom: 24 }}>
  //             <NoticeCard type={'start'} cnt={notiCount} message={notiMessage} />
  //           </View>
  //         );
  //       }
  //       return null;
  //     }
  //     case 1: {
  //       return <EventBannerCard type={restorationYN === 'N' ? 'large' : 'small'} pop={homeList?.pop || []} />;
  //     }
  //     case 2: {
  //       if (restorationYN === 'Y') {
  //         return (
  //           <View style={{ marginBottom: 24 }}>
  //             <RepairShippingCard item={restorationInfo} />
  //             z`
  //           </View>
  //         );
  //       }
  //       return null;
  //     }
  //     case 3: {
  //       return <BannerList item={homeList} />;
  //     }
  //     case 4: {
  //       if (restorationYN === 'N' && !homeList?.pop) {
  //         return <RepairBridge type={'large'} />;
  //       }
  //       return <RepairBridge type={'small'} />;
  //     }
  //     case 5: {
  //       return (
  //         <>
  //           <View style={{ height: 8, backgroundColor: Color.grayBg, width: '100%', marginTop: 24 }} />
  //           <ReviewList item={homeList} />
  //         </>
  //       );
  //     }
  //
  //     default:
  //       return null;
  //   }
  // };

  const onPressTestLogin = () => {
    console.log('onPressTestLogin');
    navigate('SimpleLoginScreen');
  };

  const datesBlacklistFunc = (date: any) => {
    return date.isoWeekday() === 6; // disable Saturdays
  };

  // 선택 가능 날짜 범위
  const datesWhitelist = [
    moment(),
    {
      start: moment(),
      end: moment().add(2, 'month'),
    },
  ];

  const onPressDate = (date: any) => {
    setHeaderDate(date.format('MM월 YYYY'));
  };

  const renderDayComponent = (value: any) => {
    const current = moment(value.date);
    const { selected, onDateSelected } = value;

    // 요일
    const day = current.format('dd');
    // 일
    const date = Number(current.format('D')) === 1 ? current.format('MM/D') : current.format('D');

    let fontColor = Color.Black1000;
    if (day === '토') fontColor = Color.Calendar_Blue;
    if (day === '일') fontColor = Color.Calendar_Red;

    return (
      <CustomButton onPress={() => onDateSelected(current)}>
        <View
          style={{
            width: 34,
            backgroundColor: selected ? Color.Grayyellow100 : 'transparent',
            borderRadius: 17,
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <CustomText
            style={{
              color: fontColor,
              fontWeight: selected ? 'bold' : 'normal',
              fontSize: 12,
            }}
          >
            {day}
          </CustomText>
          <CustomText
            style={{
              color: fontColor,
              fontWeight: selected ? 'bold' : 'normal',
              fontSize: 14,
              marginTop: 3,
            }}
          >
            {date}
          </CustomText>
        </View>
      </CustomButton>
    );
  };

  const renderCalendar = useMemo(
    () => () => {
      return (
        <CalendarStrip
          style={{ flexGrow: 1, height: 80, marginHorizontal: 20 }}
          innerStyle={{ flexGrow: 1 }}
          scrollable
          numDaysInWeek={8}
          datesWhitelist={datesWhitelist}
          leftSelector={[]}
          rightSelector={[]}
          minDate={moment()}
          maxDate={moment().add(2, 'month')}
          calendarHeaderContainerStyle={{ display: 'none' }}
          dayComponentHeight={56}
          onDateSelected={(e) => onPressDate(moment(e))}
          dayComponent={(e) => renderDayComponent(e)}
        />
      );
    },
    [],
  );

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="home" />
      <FlatList
        data={[0]}
        renderItem={() => (
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
              <CustomText
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                {headerDate}
              </CustomText>
              <View style={{ width: 24, height: 24 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Arrow/icArrowDw.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
            {renderCalendar()}
            <CustomButton onPress={() => onPressTestLogin()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  backgroundColor: Color.Gray300,
                }}
              >
                <CustomText style={{ color: '#333', fontSize: 14 }}>테스트 로그인</CustomText>
              </View>
            </CustomButton>
          </View>
        )}
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
