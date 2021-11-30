import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import { numberFormat, scrollCalendarHandler } from '@/Components/Function';
import { HomeState } from '@/Stores/Home/InitialState';
import { AuthState } from '@/Stores/Auth/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';
import PlaceListCard from '@/Components/Card/PlaceList/PlaceListCard';
import { navigate } from '@/Services/NavigationService';
import DateFilter from '@/Components/FilterSilder/DateFilter';
import CalendarSlider from '@/Components/Calendar/CalendarSlider';
import { MyState } from '@/Stores/My/InitialState';
import TopDateSelector from '@/Components/Calendar/TopDateSelector';

const DibsScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo, myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { selectedTicket, selectedPlaceIdx, dibsListPage, dibsList } = useSelector((state: PlaceState) => state.place);

  const [isShowTopCalendar, setIsShowTopCalendar] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
    };
  }, []);

  useEffect(() => {
    const params = {
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 5,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceDibsList(params));
  }, []);

  useEffect(() => {
    const params = {
      page: 1,
      perPage: 10,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceDibsList(params));
  }, [calendarDate]);

  const onMore = () => {
    console.log('onMore');
    const params = {
      page: dibsListPage || 1,
      perPage: 10,
      date: calendarDate,
    };
    if (dibsListPage > 1) dispatch(PlaceActions.fetchPlaceDibsList(params));
  };

  const onRefresh = () => {
    console.log('onRefresh');
    const params = {
      page: 1,
      perPage: 10,
      date: calendarDate,
    };
    dispatch(PlaceActions.fetchPlaceDibsList(params));
  };

  const handleScroll = (event: any) => {
    const result = scrollCalendarHandler(event, 100);
    console.log('result : ', result);
    setIsShowTopCalendar(result.isShow);
  };

  const onPressCancel = () => {
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
  };

  const onPressReservation = () => {
    if (selectedTicket) {
      if (!userIdx) {
        return navigate('SimpleLoginScreen');
      }

      if (selectedTicket?.idx) {
        return navigate('ReservationScreen', { placeIdx: selectedPlaceIdx, ticketInfoIdx: selectedTicket?.idx });
      }
    }
    // return animatedFlatRef.current?.scrollToIndex({ index: 2, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingTop: heightInfo.statusHeight }}>
      <FlatList
        data={[0]}
        renderItem={() => (
          <View style={{ width: '100%', height: '100%' }}>
            <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
                  찜
                </CustomText>
              </View>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <View style={{ flex: 1, marginTop: 16 }}>
                <CalendarSlider />
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 16 }}>
              <FlatList
                data={dibsList}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
                    <PlaceListCard item={item} type={'dibs'} />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={5}
                maxToRenderPerBatch={8}
                windowSize={7}
                onEndReached={() => onMore()}
                onEndReachedThreshold={0.8}
                ListEmptyComponent={
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', height: 8, backgroundColor: Color.Gray200 }} />
                    <View style={{ width: 60, height: 60, marginTop: 120 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Common/emptyLike.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 8 }}>
                      <CustomText
                        style={{
                          color: Color.Gray400,
                          fontSize: 14,
                          fontWeight: '500',
                          textAlign: 'center',
                          letterSpacing: -0.25,
                        }}
                      >
                        {`찜한 볼링장이 없습니다.\n자주가는 볼링장을 찜하고 쉽게 예약하세요!`}
                      </CustomText>
                    </View>
                    <CustomButton onPress={() => navigate('HomeScreen')}>
                      <View style={{ marginTop: 24 }}>
                        <View style={{ justifyContent: 'center' }}>
                          <CustomText
                            style={{ color: Color.Point1000, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 }}
                          >
                            볼링장 찜 하러가기
                          </CustomText>
                        </View>
                      </View>
                    </CustomButton>
                  </View>
                }
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
        onScroll={(e) => handleScroll(e)}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: heightInfo.fixBottomHeight }}
      />
      {selectedTicket && (
        <View>
          <View
            style={{
              height: 1,
              backgroundColor: Color.Gray300,
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowColor: 'rgba(107, 107, 107, 0.1)',
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: 1,
            }}
          />
          <View style={{ paddingHorizontal: 24, paddingTop: 18, paddingBottom: 9 }}>
            {selectedTicket?.ticketName && (
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13 }}>{selectedTicket?.ticketName}</CustomText>
              </View>
            )}
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
          <View style={{ paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
            <CustomButton onPress={() => onPressCancel()}>
              <View
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Color.Gray300,
                  paddingVertical: 15,
                  paddingHorizontal: 22,
                  marginRight: 8,
                }}
              >
                <CustomText style={{ color: Color.Gray400, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                  취소
                </CustomText>
              </View>
            </CustomButton>
            <CustomButton
              onPress={() => onPressReservation()}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 3,
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
      {isShowTopCalendar && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: heightInfo.statusHeight,
            bottom: 0,
            left: 0,
            right: 0,
            height: 24 + 24 + 2 + 9 + 8,
            backgroundColor: Color.White,
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(240,240,240)',
          }}
        >
          <View style={{ paddingTop: 8, paddingHorizontal: 16 }}>
            <TopDateSelector calendarDate={calendarDate} />
          </View>
        </View>
      )}
    </View>
  );
};

export default DibsScreen;
