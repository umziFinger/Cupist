import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, Platform, useWindowDimensions, View } from 'react-native';
import moment from 'moment';
import { Calendar, DateObject, LocaleConfig } from 'react-native-calendars';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import { HomeState } from '@/Stores/Home/InitialState';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
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
  const calendarFlatRef = useRef<any>();
  const CalendarRef = useRef<any>();
  const { width, height } = useWindowDimensions();
  const {
    heightInfo,
    isOpenCalendarRBS,
    calendarMonthPosition = 0,
  } = useSelector((state: CommonState) => state.common);

  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const dayNamesShort = ['일', '월', '화', '수', '목', '금', '토'];
  const futureRange = [0, 1];

  useEffect(() => {
    if (isOpenCalendarRBS) {
      RBSheetRef?.current.open();

      setTimeout(() => {
        calendarFlatRef?.current?.scrollToIndex({ animated: true, index: calendarMonthPosition });
      }, 0);
    }
  }, [isOpenCalendarRBS]);

  const onPressCancel = () => {
    RBSheetRef?.current.close();
  };

  const onPressDate = (day: DateObject, monthPosition: number) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'calendarMonthPosition', data: monthPosition }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(day.dateString).toString() }));
    RBSheetRef?.current.close();
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.7}
      openDuration={500}
      closeDuration={300}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCalendarRBS', data: false }))}
    >
      <View style={{ flex: 1, paddingTop: 32 }}>
        <FlatList
          ref={calendarFlatRef}
          data={futureRange}
          renderItem={(item) => (
            <>
              <Calendar
                style={{ paddingLeft: 24, paddingRight: 24 }}
                current={moment().add(item.index, 'month').format('YYYY-MM-DD')}
                minDate={moment().format('YYYY-MM-DD')}
                customHeader={(data) => {
                  const date = moment(data.month.toString()).format('MM').toString();
                  return (
                    <View ref={CalendarRef}>
                      <View style={{ justifyContent: 'center' }}>
                        <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: '500' }}>
                          {date}월
                        </CustomText>
                      </View>
                      <FlatList
                        data={dayNamesShort}
                        renderItem={({ item: headerItem, index: headerIndex }) => (
                          <View
                            style={{
                              width: (width - 48) / 7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              // backgroundColor: 'yellow',
                            }}
                          >
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <CustomText
                                style={{
                                  color:
                                    headerIndex === 0
                                      ? Color.Calendar_Red
                                      : headerIndex === 6
                                      ? Color.Calendar_Blue
                                      : Color.Grayyellow1000,
                                  fontSize: 12,
                                }}
                              >
                                {headerItem}
                              </CustomText>
                            </View>
                          </View>
                        )}
                        keyExtractor={(headerKeyItem, headerKeyIndex) => headerKeyIndex.toString()}
                        initialNumToRender={7}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        horizontal
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingBottom: 11, paddingTop: 20 }}
                      />
                    </View>
                  );
                }}
                dayComponent={(data) => {
                  const { date, state, onPress } = data;
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
                      onPress={() => state !== 'disabled' && onPress(date)}
                      hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
                    >
                      <View
                        style={{
                          paddingHorizontal: date.day.toString().length > 1 ? 11 : 16,
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
                onDayPress={(date) => onPressDate(date, item.index)}
                monthFormat={'MM월'}
              />
              {item.index !== futureRange.length - 1 && (
                <View style={{ height: 8, backgroundColor: Color.Gray200, marginBottom: 28, marginTop: 17 }} />
              )}
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={1}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={() => {
            // console.log(info.index);
            const wait = new Promise((resolve) => setTimeout(resolve, 300));
            wait.then(() => {
              calendarFlatRef?.current?.scrollToIndex({ index: calendarMonthPosition, animated: true });
            });
          }}
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
    </RBSheet>
  );
};

export default CalendarRBS;
