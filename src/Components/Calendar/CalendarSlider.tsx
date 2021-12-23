import React, { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import HomeActions from '@/Stores/Home/Actions';
import { HomeState } from '@/Stores/Home/InitialState';

const CalendarSlider = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef<any>();

  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const [headerDate, setHeaderDate] = useState<string>(moment().format('MM월 YYYY').toString());

  useEffect(() => {
    setHeaderDate(moment(calendarDate).format('MM월 YYYY'));
  }, [calendarDate]);

  // 선택 가능 날짜 범위
  const datesWhitelist = (date: any) => {
    // console.log(`${date.format('YYYYMMDD')}: ${date.format('YYYYMMDD') >= moment().format('YYYYMMDD')}`);
    return date.format('YYYYMMDD') >= moment().format('YYYYMMDD');
  };

  const onPressDate = (date: any) => {
    // console.log('onPressDate : ', calendarDate);
    setHeaderDate(date.format('MM월 YYYY'));
    dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(date).toString() }));
  };

  const onPressHeader = () => {
    console.log('onPressHeader');
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCalendarRBS', data: true }));
  };

  const renderDayComponent = (value: any) => {
    const current = moment(value?.date);
    const { selected, onDateSelected } = value;

    // onBlackItemCounter(current);
    // 요일
    const day = current.format('dd');
    // 일
    const date = Number(current.format('D')) === 1 ? current.format('M/D') : current.format('D');

    let fontColor = Color.Black1000;
    if (day === '토') fontColor = Color.Calendar_Blue;
    if (day === '일') fontColor = Color.Calendar_Red;

    if (current.format('YYYYMMDD') < moment().format('YYYYMMDD')) {
      return null;
    }
    return (
      <CustomButton
        onPress={() => {
          onDateSelected(current);
        }}
      >
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
          ref={calendarRef}
          // scrollerPaging
          onWeekScrollStart={(date) => {
            if (moment(date).format('YYYYMMDD') < moment().format('YYYYMMDD')) {
              console.log('스크롤 시작', moment(date));
              calendarRef?.current.updateWeekView(date);
            }
          }}
          onWeekScrollEnd={(date) => {
            if (moment(date).format('YYYYMMDD') < moment().format('YYYYMMDD')) {
              console.log('스크롤 끝', moment(date));
              calendarRef?.current.updateWeekView(date);
            }
          }}
          shouldAllowFontScaling={false}
          style={{ flex: 1, marginTop: 5, marginBottom: -7 }}
          startingDate={moment(calendarDate)}
          scrollable
          numDaysInWeek={8}
          selectedDate={moment(calendarDate)}
          datesWhitelist={datesWhitelist}
          leftSelector={[]}
          rightSelector={[]}
          minDate={moment()}
          maxDate={moment().add(2, 'month')}
          calendarHeaderContainerStyle={{ display: 'none' }}
          dayComponentHeight={56}
          onDateSelected={(e) => {
            onPressDate(moment(e));
          }}
          dayComponent={(e) => renderDayComponent(e)}
        />
      );
    },
    [calendarDate],
  );
  return (
    <View style={{ flex: 1 }}>
      {/* 캘린더 헤더 영역 */}
      <CustomButton onPress={() => onPressHeader()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500' }}>{headerDate}</CustomText>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icArrowDw.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
      </CustomButton>

      {/* 캘린더 영역 */}

      {renderCalendar()}
    </View>
  );
};

export default CalendarSlider;
