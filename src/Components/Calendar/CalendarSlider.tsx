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
import AlbamonActions from '@/Stores/Albamon/Actions';
import { HomeState } from '@/Stores/Home/InitialState';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';

const CalendarSlider = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef<any>();

  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { competitionInfo } = useSelector((state: CommonState) => state.common);
  const { albamonDate, placeDetailSelectedTab, competitionsRegistInfo } = useSelector(
    (state: AlbamonState) => state.albamon,
  );
  const [headerDate, setHeaderDate] = useState<string>(moment().format('MM월 YYYY').toString());
  const competitionStartDate = competitionsRegistInfo?.competitions?.qualifiersStartDate;
  const competitionEndDate = competitionsRegistInfo?.competitions?.qualifiersEndDate;

  useEffect(() => {
    // dispatch(AlbamonActions.fetchCompetitionsRegistInfo({ isMoveScreen: false, placeIdx: -1, placeDetailName: '' }));
    return (
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'albamonDate', data: '' })),
      // dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(new Date()).toString() })),
      setHeaderDate(moment(calendarDate).format('MM월 YYYY'))
    );
  }, []);

  useEffect(() => {
    if (
      moment(competitionEndDate).format('YYYYMMDD') < moment().format('YYYYMMDD') &&
      moment(competitionStartDate).format('YYYYMMDD') < moment().format('YYYYMMDD')
    ) {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'isCompetitionProgress', data: false }));
    } else {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'isCompetitionProgress', data: true }));
    }
    if (placeDetailSelectedTab.key === 'albamon') {
      dispatch(
        AlbamonActions.fetchCompetitionsRegistInfo({
          currentScreen: 'CalendarSlider',
          placeIdx: -1,
          placeDetailName: '',
          competitionIdx: competitionInfo?.value,
        }),
      );
      dispatch(
        AlbamonActions.fetchAlbamonReducer({
          type: 'albamonDate',
          data: checkStartDate() ? moment(competitionStartDate).toString() : moment(new Date()).toString(),
        }),
      );
    } else {
      dispatch(
        AlbamonActions.fetchAlbamonReducer({
          type: 'albamonDate',
          data: '',
        }),
      );
    }
  }, [placeDetailSelectedTab, competitionStartDate, competitionEndDate]);

  useEffect(() => {
    console.log('=-=-==-=-==-=-=-=-=-', albamonDate);
    if (placeDetailSelectedTab.key === 'default') {
      setHeaderDate(moment(calendarDate).format('MM월 YYYY'));
    } else {
      setHeaderDate(moment(albamonDate).format('MM월 YYYY'));
    }
  }, [calendarDate, placeDetailSelectedTab, albamonDate]);

  // 선택 가능 날짜 범위
  const datesWhitelist = (date: any) => {
    // console.log(`${date.format('YYYYMMDD')}: ${date.format('YYYYMMDD') >= moment().format('YYYYMMDD')}`);
    return date.format('YYYYMMDD') >= moment().format('YYYYMMDD');
  };

  const onPressDate = (date: any) => {
    // console.log('onPressDate : ', calendarDate);
    setHeaderDate(date.format('MM월 YYYY'));
    if (placeDetailSelectedTab.key === 'default') {
      dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(date).toString() }));
    } else {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'albamonDate', data: moment(date).toString() }));
    }
  };

  const onPressHeader = () => {
    console.log('onPressHeader');
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenCalendarRBS', data: true }));
  };

  const checkStartDate = () => {
    return moment(competitionStartDate).format('YYYYMMDD') > moment().format('YYYYMMDD');
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

    // if (current.format('YYYYMMDD') < moment().format('YYYYMMDD')) {
    //   return null;
    // }
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
              console.log(date);
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
          startingDate={
            placeDetailSelectedTab.key === 'default'
              ? moment(calendarDate)
              : new Date(checkStartDate() ? competitionStartDate : moment())
          }
          scrollable
          numDaysInWeek={8}
          selectedDate={placeDetailSelectedTab.key === 'default' ? moment(calendarDate) : moment(albamonDate)}
          datesWhitelist={datesWhitelist}
          leftSelector={[]}
          rightSelector={[]}
          minDate={
            placeDetailSelectedTab.key === 'default'
              ? moment()
              : new Date(checkStartDate() ? competitionStartDate : moment())
          }
          maxDate={placeDetailSelectedTab.key === 'default' ? moment().add(2, 'month') : new Date(competitionEndDate)}
          calendarHeaderContainerStyle={{ display: 'none' }}
          dayComponentHeight={56}
          onDateSelected={(e) => {
            onPressDate(moment(e));
          }}
          dayComponent={(e) => renderDayComponent(e)}
          useIsoWeekday={false}
        />
      );
    },
    [calendarDate, placeDetailSelectedTab, albamonDate],
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
