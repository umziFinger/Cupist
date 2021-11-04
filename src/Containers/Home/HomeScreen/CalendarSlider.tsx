import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';

interface PropTypes {
  setSelectedDate: Function;
}

const CalendarSlider = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { setSelectedDate } = props;
  const [headerDate, setHeaderDate] = useState<string>(moment().format('MM월 YYYY').toString());

  // 선택 불가 날짜
  const datesBlacklistFunc = (date: any) => {
    const current = moment().format('YYYYMMDD');
    console.log(date.format('YYYYMMDD') < current);
    return date.format('YYYYMMDD') < current; // disable Saturdays
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
    setSelectedDate(moment(date).toString());
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
      <CustomButton
        onPress={() => {
          if (current.format('YYYYMMDD') < moment().format('YYYYMMDD')) {
            return dispatch(
              CommonActions.fetchCommonReducer({
                type: 'alertToast',
                data: {
                  alertToast: true,
                  alertToastPosition: 'top',
                  alertToastMessage: '다른 날짜를 선택해주세요.',
                },
              }),
            );
          }
          return onDateSelected(current);
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
          style={{ flex: 1, marginTop: 10 }}
          scrollable
          numDaysInWeek={8}
          selectedDate={new Date()}
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
    [],
  );
  return (
    <View style={{ flex: 1 }}>
      {/* 캘린더 헤더 영역 */}
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

      {/* 캘린더 영역 */}
      {renderCalendar()}
    </View>
  );
};

export default CalendarSlider;
