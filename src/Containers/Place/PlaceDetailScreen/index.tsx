import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Platform, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CalendarSlider from '@/Components/Calendar/CalendarSlider';
import TicketSlider from '@/Components/Card/Common/TicketSlider';
import ImageArea from '@/Containers/Place/PlaceDetailScreen/ImageArea';
import TitleArea from '@/Containers/Place/PlaceDetailScreen/TitleArea';
import MapArea from '@/Containers/Place/PlaceDetailScreen/MapArea';
import ReviewArea from '@/Containers/Place/PlaceDetailScreen/ReviewArea';
import { HomeState, TICKET_TYPE } from '@/Stores/Home/InitialState';
import PlaceActions from '@/Stores/Place/Actions';
import { numberFormat, scrollCalendarHandler } from '@/Components/Function';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import TogetherArea from '@/Containers/Place/PlaceDetailScreen/TogetherArea';
import CommonActions from '@/Stores/Common/Actions';
import AlbamonActions from '@/Stores/Albamon/Actions';
import EventHotArea from '@/Containers/Place/PlaceDetailScreen/EventHotArea';
import PlaceDetailAlbamonBanner from '@/Containers/Place/PlaceDetailScreen/PlaceDetailAlbamonBanner';
import TabMenu from '@/Components/TabMenu';
import { PLACE_DETAIL_TAB_DATA } from '@/Containers/Place/PlaceDetailScreen/data';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import UnsupportAlbamon from '@/Containers/Place/PlaceDetailScreen/UnsupportAlbamon';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PlaceDetailScreen'>;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PlaceDetailScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { idx, ticketType = TICKET_TYPE.ALL } = route.params;
  const { heightInfo, competitionInfo } = useSelector((state: CommonState) => state.common);
  const { userIdx, userInfo } = useSelector((state: AuthState) => state.auth);
  const { placeDetail, placeTicketList, selectedTicket } = useSelector((state: PlaceState) => state.place);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { placeDetailSelectedTab, albamonDate } = useSelector((state: AlbamonState) => state.albamon);

  const animatedFlatRef = useRef<any>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isShowTopCalendar, setIsShowTopCalendar] = useState<boolean>(false);
  const [isRenderMap, setIsRenderMap] = useState<boolean>(false); // 맵 마커 랜더 안되는 이슈때문에 추가

  const place = placeDetail?.place || {};
  const latestReview = placeDetail?.latestReview || [];
  const starReview = placeDetail?.starReview || [];
  const together = placeDetail?.together || [];
  const event = placeDetail?.event || [];

  useEffect(() => {
    dispatch(CommonActions.fetchCommonCode({ parentCode: 'competition', code: 'alkorbol' }));
    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'placeDetailInit' }));
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'placeDetailSelectedTabInit' }));
      // dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
    };
  }, []);

  useEffect(() => {
    dispatch(PlaceActions.fetchPlaceDetail({ idx }));
    animatedFlatRef?.current?.scrollToIndex({ index: 0, animated: true });
  }, [route]);

  useEffect(() => {
    console.log(calendarDate, albamonDate);
    if (placeDetailSelectedTab.key === 'default') {
      dispatch(PlaceActions.fetchPlaceTicketList({ idx, date: moment(calendarDate).format('YYYY-MM-DD') }));
    } else if (!albamonDate) {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'placeTicketList', data: { free: [], normal: [] } }));
    } else {
      dispatch(PlaceActions.fetchPlaceTicketList({ idx, date: moment(albamonDate).format('YYYY-MM-DD') }));
    }
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
  }, [route, calendarDate, albamonDate, placeDetailSelectedTab]);

  const handleScroll = (e: any) => {
    setIsRenderMap(e?.nativeEvent.contentOffset.y > 500 && e?.nativeEvent.contentOffset.y < 1500);
    const result = scrollCalendarHandler(e, 540);
    setIsShowTopCalendar(result.isShow);
  };

  const onPressReservation = () => {
    console.log('placeTicketList', placeTicketList);
    if (selectedTicket) {
      if (!userIdx) {
        navigate('SimpleLoginScreen');
      }
      if (placeDetailSelectedTab?.key === 'albamon') {
        if (userInfo?.competitionsYn === 'N') {
          dispatch(
            AlbamonActions.fetchCompetitionsRegistInfo({
              currentScreen: 'PlaceDetailScreen',
              placeIdx: place?.idx,
              placeDetailName: place?.name,
              competitionIdx: competitionInfo?.value,
            }),
          );
          return;
        }
        if (userInfo?.competitionStatus !== '참가완료' && userInfo?.competitionStatus !== '참가불가') {
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'alertDialog',
              data: {
                alertDialog: true,
                alertDialogType: 'confirm',
                alertDialogDataType: 'beforeCompetitionPay',
                alertDialogTitle: '예선전 예약은 참가신청금액이\n입금된 후 예약이 가능합니다.',
              },
            }),
          );
          return;
        }
      }
      if (selectedTicket?.idx) {
        navigate('ReservationScreen', {
          placeIdx: idx,
          ticketInfoIdx: selectedTicket?.idx,
        });
      }
    } else if (placeTicketList?.normal.length < 1 && placeTicketList?.free.length < 1) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '날짜를 다시 선택해주세요',
          },
        }),
      );
    } else {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '상품을 선택해주세요',
          },
        }),
      );
      animatedFlatRef?.current?.scrollToIndex({ index: 2, animated: true });
    }
  };

  const onPressCancel = () => {
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
  };

  const renderItem = (item: number) => {
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
            <PlaceDetailAlbamonBanner />
          </View>
        );
      }
      case 2: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <TabMenu type={'albamon'} data={PLACE_DETAIL_TAB_DATA} />
            {(placeDetailSelectedTab.key === 'default' || place?.albamonYn === 'Y') && (
              <View style={{ marginTop: 30, paddingLeft: 20 }}>
                <CalendarSlider />
              </View>
            )}
            {placeDetailSelectedTab.key === 'albamon' && place?.albamonYn === 'N' && <UnsupportAlbamon />}
          </View>
        );
      }
      case 3: {
        return (
          (placeDetailSelectedTab.key === 'default' || place?.albamonYn === 'Y') && (
            <View style={{ flex: 1, marginTop: 20 }}>
              <View style={{ height: 1, backgroundColor: Color.Gray300 }} />
              <TicketSlider
                allowedTimeArr={[0, 1]}
                item={placeTicketList || {}}
                showDivider={false}
                focusType={ticketType}
              />
            </View>
          )
        );
      }
      case 4: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28 }}>
              <MapArea item={place} isRenderMap={isRenderMap} />
            </View>
          </View>
        );
      }
      case 5: {
        return (
          event?.length !== 0 && (
            <View style={{ flex: 1, marginTop: 28 }}>
              <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
              <View style={{ marginTop: 28 }}>
                <EventHotArea item={event} />
              </View>
            </View>
          )
        );
      }
      case 6: {
        return (
          <View style={{ flex: 1, marginTop: 28 }}>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
            <View style={{ marginTop: 28 }}>
              <ReviewArea item={place} latestReview={latestReview} starReview={starReview} />
            </View>
          </View>
        );
      }
      case 7: {
        // 다른 유저들이 함께 본 볼링장
        return (
          <View style={{ flex: 1, marginTop: 16 }}>
            {together?.length > 0 && (
              <>
                <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
                <View style={{ marginTop: 28 }}>
                  <TogetherArea list={together || []} />
                </View>
              </>
            )}
          </View>
        );
      }
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'placeDetail'} isShow={isShowTopCalendar} />
      <AnimatedFlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        // data={[4, 5, 6, 7]}
        ref={animatedFlatRef}
        renderItem={({ item }: any) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={24}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          listener: (e) => handleScroll(e),
          useNativeDriver: true,
        })}
        contentContainerStyle={{ backgroundColor: Color.White, paddingBottom: 40 }}
      />

      {(placeDetailSelectedTab?.key === 'default' || place?.albamonYn === 'Y') && (
        <View
          style={{
            paddingBottom: Platform.OS === 'ios' ? heightInfo.statusHeight : heightInfo.fixBottomHeight + 12,
            backgroundColor: Color.Gray100,
          }}
        >
          <View
            style={{
              height: 1,
              backgroundColor: Color.Gray300,
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowColor: 'rgba(107, 107, 107, 0.2)',
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: 1,
            }}
          />
          {selectedTicket && placeDetailSelectedTab.key === 'default' ? (
            <View style={{ paddingHorizontal: 24, paddingTop: 18, paddingBottom: 9 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13 }}>{selectedTicket?.ticketName}</CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 6 }}>
                  <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15, fontWeight: '500' }}>
                    {moment(calendarDate).format('MM월 DD일(dd)')} {selectedTicket?.startTime.substr(0, 5)} ~{' '}
                    {selectedTicket?.endTime.substr(0, 5)}
                  </CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold' }}>
                      {numberFormat(selectedTicket?.salePrice)}
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 17 }}>원</CustomText>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            selectedTicket && (
              <View style={{ paddingHorizontal: 24, paddingTop: 18, paddingBottom: 9 }}>
                <View style={{ justifyContent: 'center' }}>
                  <CustomText style={{ color: Color.Gray800, fontSize: 13 }}>알.코.볼 예선전</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 6 }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15, fontWeight: '500' }}>
                      {moment(albamonDate).format('MM월 DD일(dd)')} {selectedTicket?.startTime.substr(0, 5)} ~{' '}
                      {selectedTicket?.endTime.substr(0, 5)}
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold' }}>
                        {numberFormat(selectedTicket?.salePrice)}
                      </CustomText>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Black1000, fontSize: 17 }}>원</CustomText>
                    </View>
                  </View>
                </View>
              </View>
            )
          )}
          <View
            style={{
              paddingHorizontal: 24,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            {selectedTicket && (
              <CustomButton onPress={() => onPressCancel()}>
                <View
                  style={{
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: Color.Gray400,
                    paddingVertical: 15,
                    paddingHorizontal: 22,
                    marginRight: 8,
                  }}
                >
                  <CustomText style={{ color: Color.Gray600, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                    취소
                  </CustomText>
                </View>
              </CustomButton>
            )}

            <CustomButton
              onPress={() => onPressReservation()}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 3,
                borderWidth: 1,
                borderColor: Color.Primary1000,
                paddingVertical: 15,
                backgroundColor: Color.Primary1000,
              }}
            >
              <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
                예약하기
              </CustomText>
            </CustomButton>
          </View>
        </View>
      )}
    </View>
  );
};
export default PlaceDetailScreen;
