import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarList, LocaleConfig, DateObject } from 'react-native-calendars';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import 'moment/locale/ko';
import { BetweenDates } from '@/Components/Function';
import RentalActions from '@/Stores/Rental/Actions';
import { RentalState } from '@/Stores/Rental/InitialState';

const { height } = Dimensions.get('window');

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const CustomCalendar = ({ type }: any) => {
  const { calendarRBS } = useSelector((state: CommonState) => state.common);
  const { cartIdx } = useSelector((state: RentalState) => state.rental);

  const [selectStartDay, setSelectStartDay] = useState('');
  const [selectEndDay, setSelectEndDay] = useState('');
  const [betweenDay, setBetweenDay] = useState([]);
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();

  useEffect(() => {
    if (calendarRBS) RBSheetRef.current.open();
  }, [calendarRBS]);

  useEffect(() => {
    console.log(betweenDay);
  }, [betweenDay]);

  const onSelectDay = async (day: DateObject) => {
    console.log('day : ', day.dateString === moment().format('YYYY-MM-DD'));

    if (selectStartDay) {
      const diff = moment(selectStartDay).diff(day.dateString);
      if (diff > 0) {
        console.log('선택불가');
        return;
      }
    }

    if (day.dateString === moment().format('YYYY-MM-DD')) {
      console.log('당일 선택 불가');
      return;
    }
    if (!selectStartDay) {
      setSelectStartDay(day.dateString);
    } else if (selectStartDay && !selectEndDay) {
      if (selectStartDay === day.dateString) {
        console.log('같은날 선택 못함');
      } else {
        setSelectEndDay(day.dateString);
        const temp: any = await BetweenDates(selectStartDay, day.dateString);
        setBetweenDay(temp);
      }
    } else {
      console.log('선택일 다있음', selectStartDay, selectEndDay);
    }
  };

  // console.log('moment.locale();', moment().add(3, 'days').format('YYYY-MM-DD'));
  let title = '대여기간 선택';
  if (type === 'select') {
    title = '대여기간 선택';
  } else if (type === 'change') {
    title = '대여기간 변경';
  }

  const onPressRefresh = () => {
    console.log('onPressRefresh');
    setSelectStartDay('');
    setSelectEndDay('');
    setBetweenDay([]);
  };

  const onPressComplete = () => {
    if (betweenDay.length > 0) {
      if (type === 'select') {
        dispatch(RentalActions.fetchRentalReducer({ type: 'rentalBetweenDay', data: betweenDay }));
      } else if (type === 'change') {
        const params = {
          idx: cartIdx,
          startDate: selectStartDay,
          endDate: selectEndDay,
          period: betweenDay.length,
        };
        dispatch(RentalActions.fetchRentalChangeBetweenDay(params));
      }
      if (calendarRBS) RBSheetRef.current.close();
    }
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      animationType={'fade'}
      height={height}
      openDuration={300}
      closeDuration={200}
      customStyles={{
        container: {
          height: height * 0.8,
          backgroundColor: 'transparent',
          justifyContent: 'center',
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'calendarRBS', data: false }))}
    >
      <View
        style={{
          height: height * 0.6,
          backgroundColor: Color.White,
          marginBottom: height * 0.2,
          paddingTop: 36,
          marginHorizontal: 24,
          borderRadius: 24,
        }}
      >
        <View
          style={{ alignItems: 'center', paddingBottom: 23.5, borderBottomWidth: 1, borderBottomColor: Color.grayBg }}
        >
          <CustomText style={{ color: Color.Black1000, fontSize: 17, letterSpacing: -0.42 }}>{title}</CustomText>
        </View>
        <View style={{ position: 'absolute', top: 20, right: 20 }}>
          <CustomButton
            onPress={() => dispatch(CommonActions.fetchCommonReducer({ type: 'calendarRBS', data: false }))}
            hitSlop={20}
          >
            <View style={{ width: 24, height: 24 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icXBlack70.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
        </View>
        <View style={{ flex: 1 }}>
          <CalendarList
            current={moment().format('YYYY-MM-DD')}
            minDate={moment().format('YYYY-MM-DD')}
            maxDate={moment().add(3, 'days').format('YYYY-MM-DD')}
            dayComponent={({ date, state }) => {
              let borderStatus = 'transparent';
              let bgStatus = 'transparent';
              let textColor = Color.Black1000;
              let todayWeightStatus = false;

              if (selectStartDay === date.dateString || selectEndDay === date.dateString) {
                borderStatus = Color.Primary1000;
                bgStatus = Color.Primary1000;
              }
              if (betweenDay && betweenDay.includes(date.dateString)) {
                bgStatus = Color.Primary1000;
              }
              if (state === 'today') {
                textColor = Color.Primary1000;
                todayWeightStatus = true;
              } else if (state === 'disabled') {
                textColor = Color.grayDefault;
              }
              return (
                <CustomButton
                  onPress={() => state !== 'disabled' && onSelectDay(date)}
                  style={{ alignItems: 'center' }}
                  hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: borderStatus,
                      padding: 8,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: bgStatus,
                    }}
                  >
                    <CustomText
                      style={{
                        fontSize: 13,
                        textAlign: 'center',
                        color: textColor,
                        fontWeight: todayWeightStatus ? 'bold' : 'normal',
                        textDecorationLine: state === 'disabled' ? 'line-through' : 'none',
                      }}
                    >
                      {date.day}
                    </CustomText>
                  </View>
                  {selectStartDay === date.dateString && (
                    <View style={{ position: 'absolute', bottom: -12 }}>
                      <CustomText style={{ fontSize: 11, fontWeight: 'bold', color: Color.Primary1000 }}>
                        수령
                      </CustomText>
                    </View>
                  )}
                  {selectEndDay === date.dateString && (
                    <View style={{ position: 'absolute', bottom: -12 }}>
                      <CustomText style={{ fontSize: 11, fontWeight: 'bold', color: Color.Primary1000 }}>
                        반납
                      </CustomText>
                    </View>
                  )}
                </CustomButton>
              );
            }}
            onDayPress={onSelectDay}
            monthFormat={'yyyy MMM'}
            pastScrollRange={1}
            futureScrollRange={1}
            scrollEnabled
          />
        </View>

        <View
          style={{
            borderTopColor: Color.grayBg,
            borderTopWidth: 1,
            paddingVertical: 15.5,
            paddingRight: 15,
            paddingLeft: 25,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <CustomButton onPress={() => onPressRefresh()}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 20, height: 20, marginRight: 3 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Rent/icRefresh.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View
                      style={{ justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: Color.grayDefault }}
                    >
                      <CustomText style={{ color: Color.grayDefault, fontSize: 13, letterSpacing: -0.32 }}>
                        다시 선택
                      </CustomText>
                    </View>
                  </View>
                </CustomButton>
              </View>
            </View>
            <CustomButton onPress={() => onPressComplete()}>
              <View
                style={{
                  backgroundColor: betweenDay.length > 0 ? Color.Black1000 : Color.grayLine,
                  borderRadius: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 36,
                }}
              >
                <CustomText style={{ color: Color.White, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.38 }}>
                  선택완료
                </CustomText>
              </View>
            </CustomButton>
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default CustomCalendar;
