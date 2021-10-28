import React, { useMemo } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';

interface PropTypes {
  setHeaderDate: Function;
  setSelectedDate: Function;
}

const CalendarSlider = (props: PropTypes) => {
  const { setHeaderDate, setSelectedDate } = props;

  // 선택 불가 날짜
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
          style={{ flex: 1 }}
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
          onDateSelected={(e) => onPressDate(moment(e))}
          dayComponent={(e) => renderDayComponent(e)}
        />
      );
    },
    [],
  );
  return renderCalendar();
};

export default CalendarSlider;
