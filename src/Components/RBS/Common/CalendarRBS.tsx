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
  const { width, height } = useWindowDimensions();
  const { heightInfo, isOpenCalendarRBS } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { placeTicketList, selectedTicket } = useSelector((state: PlaceState) => state.place);
  const [markedDate, setMarkedDate] = useState<any>();

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
                // customHeader={(data) => {
                //   console.log(data);
                //   return (
                //     <View style={{ paddingTop: 24 }}>
                //       <View style={{ justifyContent: 'center' }}>
                //         <CustomText style={{ color: '#333', fontSize: 14 }}>
                //           sdfsdfsd
                //           {/* {moment(month.toString()).format('MM월').toString()} */}
                //         </CustomText>
                //       </View>
                //     </View>
                //   );
                // }}
                dayComponent={({ date, state }) => {
                  const borderStatus = 'transparent';
                  const bgStatus = 'transparent';
                  const textColor = Color.Black1000;
                  const todayWeightStatus = false;

                  return (
                    <CustomButton
                      onPress={() => state !== 'disabled' && onPressDate(date)}
                      style={{ alignItems: 'center' }}
                      hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
                    >
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor: borderStatus,
                          padding: 11,
                          // borderRadius: 10,
                          backgroundColor: bgStatus,
                          opacity: state === 'disabled' ? 0.2 : 1,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 14,
                            textAlign: 'center',
                            color: textColor,
                            fontWeight: todayWeightStatus ? 'bold' : 'normal',
                            // textDecorationLine: state === 'disabled' ? 'line-through' : 'none',
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
                headerStyle={{ alignItems: 'flex-start', flex: 1, backgroundColor: 'red' }}
                pastScrollRange={1}
                futureScrollRange={1}
                scrollEnabled
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={2}
            maxToRenderPerBatch={1}
            windowSize={7}
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