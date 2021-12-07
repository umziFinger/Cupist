import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, Platform, useWindowDimensions, View } from 'react-native';
import moment from 'moment';
import { CalendarList, DateObject, LocaleConfig } from 'react-native-calendars';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import PlaceActions from '@/Stores/Place/Actions';
import { HomeState } from '@/Stores/Home/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import TicketSlider from '@/Components/Card/Common/TicketSlider';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import HomeActions from '@/Stores/Home/Actions';
import { DATA_HOLIDAYS } from '@/Components/RBS/Common/data';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const CalendarRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const CalendarRef = useRef<any>();
  const { width, height } = useWindowDimensions();
  const { heightInfo, isOpenCalendarRBS } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { placeTicketList, selectedTicket } = useSelector((state: PlaceState) => state.place);
  const [markedDate, setMarkedDate] = useState<any>();
  const dayNamesShort = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    if (isOpenCalendarRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenCalendarRBS]);

  const onPressCancel = () => {
    RBSheetRef?.current.close();
  };

  const onPressDate = (day: DateObject) => {
    console.log('달력 날짜 클릭 : ', day);
    dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(day.dateString).toString() }));

    RBSheetRef?.current.close();
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.7}
      openDuration={500}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCalendarRBS', data: false }))}
    >
      <View style={{ width: '100%', height: height * 0.7 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={[0]}
            renderItem={({ item, index }) => (
              <CalendarList
                current={moment().format('YYYY-MM-DD')}
                minDate={moment().format('YYYY-MM-DD')}
                customHeader={(data) => {
                  const date = moment(data.month.toString()).format('MM').toString();
                  const showDivider = moment().format('MM').toString() !== date;
                  return (
                    <View ref={CalendarRef}>
                      {showDivider && <View style={{ height: 8, backgroundColor: Color.Gray200, marginBottom: 28 }} />}
                      <View style={{ justifyContent: 'center', paddingLeft: 11 }}>
                        <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: '500' }}>
                          {date}월
                        </CustomText>
                      </View>
                      <FlatList
                        data={dayNamesShort}
                        renderItem={({ item, index }) => (
                          <View style={{ width: (width - 30) / 7, alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center' }}>
                              <CustomText
                                style={{
                                  color:
                                    index === 0
                                      ? Color.Calendar_Red
                                      : index === 6
                                      ? Color.Calendar_Blue
                                      : Color.Grayyellow1000,
                                  fontSize: 12,
                                }}
                              >
                                {item}
                              </CustomText>
                            </View>
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={7}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        horizontal
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingTop: 20, paddingBottom: 11 }}
                      />
                    </View>
                  );
                }}
                dayComponent={(data) => {
                  const { date, state } = data;
                  const dow = moment(date.timestamp).isoWeekday();
                  const holidayIdx = DATA_HOLIDAYS.findIndex(
                    (h) => h.toString() === moment(date.timestamp).format('YYYYMMDD'),
                  );
                  let bgStatus = 'transparent';
                  let textColor =
                    dow === 6
                      ? Color.Calendar_Blue
                      : dow === 7 || holidayIdx > -1
                      ? Color.Calendar_Red
                      : Color.Black1000;

                  if (date.dateString === moment(calendarDate).format('YYYY-MM-DD')) {
                    textColor = Color.White;
                    bgStatus = Color.Grayyellow1000;
                  }

                  return (
                    <CustomButton
                      onPress={() => state !== 'disabled' && onPressDate(date)}
                      hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
                    >
                      <View
                        style={{
                          // borderWidth: 2,
                          // borderColor: borderStatus,
                          paddingHorizontal: 11,
                          paddingVertical: 11,
                          borderRadius: 50,
                          backgroundColor: bgStatus,
                          opacity: state === 'disabled' ? 0.2 : 1,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 14,
                            textAlign: 'center',
                            color: textColor,
                            fontWeight: '500',
                          }}
                        >
                          {date.day}
                        </CustomText>
                      </View>
                    </CustomButton>
                  );
                }}
                onDayPress={onPressDate}
                monthFormat={'MM월'}
                pastScrollRange={0}
                futureScrollRange={1}
                scrollEnabled
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={2}
            maxToRenderPerBatch={1}
            windowSize={7}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: heightInfo.fixBottomHeight + 44, paddingTop: 32 }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
            paddingBottom: Platform.OS === 'ios' ? heightInfo.fixBottomHeight : heightInfo.fixBottomHeight + 12,
          }}
        >
          <CustomButton
            onPress={() => onPressCancel()}
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 3,
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
            }}
          >
            <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
              닫기
            </CustomText>
          </CustomButton>
        </View>
      </View>
    </RBSheet>
  );
};

export default CalendarRBS;
