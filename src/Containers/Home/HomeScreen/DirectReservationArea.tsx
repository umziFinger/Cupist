import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import produce from 'immer';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import DirectReservationCard from '@/Components/Card/Home/DirectReservationCard';
import CustomButton from '@/Components/CustomButton';
import { SearchState } from '@/Stores/Search/InitialState';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { HomeState } from '@/Stores/Home/InitialState';
import { DATA_TIME_FILTER } from '@/Containers/Home/HomeScreen/data';
import HomeActions from '@/Stores/Home/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import Config from '@/Config';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

interface PropTypes {
  list: Array<any>;
}
const DirectReservationArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { list } = props;
  const { homeAlbamonList } = useSelector((state: PlaceState) => state.place);
  const { myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { calendarDate, areaFilterIdx, timeFilterIdx, possibleDirectDate } = useSelector(
    (state: HomeState) => state.home,
  );
  const { areaList } = useSelector((state: SearchState) => state.search);

  const date = calendarDate ? moment(calendarDate).format('YYYY/MM/DD') : moment().format('YYYY/MM/DD');
  const getDirectReservationList = (idx: number) => {
    const areaCode = areaFilter()[idx].key;
    // const startTime = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].startTime : null;
    // const endTime = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].endTime : null;
    const type = timeFilterIdx !== 0 ? DATA_TIME_FILTER[timeFilterIdx].key : 'all';

    let params = {};
    if (idx === 1) {
      params = {
        date,
        lat: myLatitude,
        lng: myLongitude,
        type,
      };
    }
    if (idx === 2) {
      params = {
        // areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
        date,
        lat: myLatitude || 37,
        lng: myLongitude || 126,
        sort: 'albamon',
        perPage: 10,
        page: 1,
      };
      dispatch(PlaceActions.fetchPlaceSearchList(params));
      return;
    }
    if (idx > 2) {
      params = {
        date,
        areaCode,
        lat: myLatitude,
        lng: myLongitude,
        type,
      };
    }

    dispatch(HomeActions.fetchHomeDirectReservationList(params));
  };

  useEffect(() => {
    console.log('DIDUPATE : timeFilterIdx : ', timeFilterIdx);
    getDirectReservationList(areaFilterIdx);
  }, [timeFilterIdx]);

  const onPressFilter = (value: number) => {
    if (value === 0) {
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenTimeFilterRBS', data: true }));
      return;
    }
    // dispatch(HomeActions.fetchHomeReducer({ type: 'possibleDirectDate', data: '' }));

    // 홈 필터에 알바몬 추가, 알바몬 눌렀을떄
    if (value === 2) {
      dispatch(HomeActions.fetchHomeReducer({ type: 'areaFilterIdx', data: value }));
      const params = {
        // areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
        date,
        lat: myLatitude || 37,
        lng: myLongitude || 126,
        sort: 'albamon',
        perPage: 10,
        page: 1,
      };
      dispatch(PlaceActions.fetchPlaceSearchList(params));
      return;
    }
    dispatch(HomeActions.fetchHomeReducer({ type: 'areaFilterIdx', data: value }));
    getDirectReservationList(value);
  };

  const onPressNextDay = () => {
    console.log('onPressNextDay');
    dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(possibleDirectDate).toString() }));
  };

  const areaTag = [
    {
      index: 0,
      key: 'all',
      value: DATA_TIME_FILTER[timeFilterIdx]?.content || 0,
      color: timeFilterIdx === 0 ? Color.Grayyellow1000 : Color.White,
      backgroundColor: timeFilterIdx === 0 ? Color.Gray200 : Color.Grayyellow1000,
    },
    {
      index: 1,
      key: 'around',
      value: '내주변',
      color: Color.Grayyellow1000,
      backgroundColor: 'transparent',
    },
    {
      index: 2,
      key: 'albamon',
      value: '알.코.볼',
      color: Color.Grayyellow1000,
      backgroundColor: 'transparent',
    },
  ];

  // 필터 데이터 커스터마이징
  const areaFilter = useMemo(
    () => () =>
      produce(areaTag, (draft) => {
        if (areaList?.length > 0) {
          areaList?.map((item: any, index: number) => {
            return draft.push({
              index: index + 3,
              key: item.code,
              value: item.area,
              color: Color.Grayyellow1000,
              backgroundColor: 'transparent',
            });
          });
        }
      }),
    [areaList, timeFilterIdx],
  );

  const onPossibleDirectDateYNRender = useCallback(() => {
    if (list?.length < 1 && possibleDirectDate) {
      return (
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold', letterSpacing: -0.29 }}>
              다른 날짜
            </CustomText>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, letterSpacing: -0.29 }}>에</CustomText>
          </View>
          <View>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, letterSpacing: -0.29 }}>
              바로 예약 볼링장이 있어요!
            </CustomText>
          </View>

          <CustomButton onPress={() => onPressNextDay()}>
            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  borderRadius: 24,
                  borderWidth: 1.5,
                  borderColor: Color.Primary1000,
                  paddingVertical: 15,
                  paddingHorizontal: 24,
                }}
              >
                <CustomText
                  style={{ color: Color.Primary1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}
                >
                  {moment(possibleDirectDate).format('MM월 D일').toString()}로 날짜변경하기
                </CustomText>
              </View>
            </View>
          </CustomButton>
        </View>
      );
    }
    return (
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray400, fontSize: 14, fontWeight: '500', letterSpacing: -0.25 }}>
            해당날짜에 바로예약 상품이 없습니다.
          </CustomText>
        </View>
      </View>
    );
  }, [possibleDirectDate]);

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingLeft: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              바로 예약
            </CustomText>
          </View>
          <View style={{ width: 5, height: 5, marginBottom: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icPeriod.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View style={{ marginTop: 6 }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 15, letterSpacing: -0.2 }}>
            실시간 예약 가능한 곳
          </CustomText>
        </View>
      </View>
      <View style={{ paddingLeft: 20 }}>
        <FlatList
          data={areaFilter() || []}
          renderItem={({ item, index }) => (
            <CustomButton onPress={() => onPressFilter(item.index)}>
              <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center' }}>
                {index === 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 16.5,
                      paddingLeft: 10,
                      paddingRight: 14,
                      paddingVertical: 7.5,
                      backgroundColor:
                        areaFilterIdx !== 0 && areaFilterIdx === item.index
                          ? Color.Grayyellow1000
                          : item.backgroundColor,
                    }}
                  >
                    <View style={{ width: 20, height: 20, marginRight: 2 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={
                          (areaFilterIdx !== 0 && areaFilterIdx === item.index) || timeFilterIdx !== 0
                            ? require('@/Assets/Images/Common/icTimeWhite.png')
                            : require('@/Assets/Images/Common/icTime.png')
                        }
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <CustomText
                      style={{
                        color: areaFilterIdx !== 0 && areaFilterIdx === item.index ? Color.White : item.color,
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                      }}
                    >
                      {item.value}
                    </CustomText>
                  </View>
                ) : (
                  <View
                    style={{
                      borderRadius: 16.5,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: areaFilterIdx === item.index ? Color.Grayyellow1000 : Color.Gray300,
                      backgroundColor: areaFilterIdx === item.index ? Color.Grayyellow1000 : item.backgroundColor,
                    }}
                  >
                    <CustomText
                      style={{
                        color: areaFilterIdx === item.index ? Color.White : item.color,
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                      }}
                    >
                      {item.value}
                    </CustomText>
                  </View>
                )}
              </View>
            </CustomButton>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          maxToRenderPerBatch={8}
          windowSize={7}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 8 }}
          ListFooterComponent={<View style={{ paddingRight: 20 }} />}
        />
      </View>
      <FlatList
        data={areaFilterIdx === 2 ? homeAlbamonList?.slice(0, 4) : list}
        // data={test}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <DirectReservationCard item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={3}
        maxToRenderPerBatch={6}
        windowSize={7}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: 20, marginTop: 80, marginBottom: 50, alignItems: 'center' }}>
            <View style={{ width: 60, height: 60 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Home/emptyList.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            {onPossibleDirectDateYNRender()}
          </View>
        }
      />
      {areaFilterIdx === 1 && (
        <CustomButton
          onPress={() => navigate('MyAroundScreen')}
          style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'rgba(246, 245, 242, 0.5)',
              borderWidth: 1,
              borderRadius: 21,
              borderColor: Color.Grayyellow100,
              paddingVertical: 12,
              paddingLeft: 20,
              paddingRight: 16,
            }}
          >
            <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
              내 주변{' '}
            </CustomText>
            <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, letterSpacing: -0.2 }}>
              볼링장 모두보기
            </CustomText>
            <View style={{ width: 15, height: 15 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Home/icArrowRiPurple.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>
      )}
      {areaFilterIdx === 2 && (
        <CustomButton
          onPress={() => {
            // 알코볼로 필터 변경
            dispatch(
              PlaceActions.fetchPlaceReducer({
                type: 'myAroundSort',
                data: {
                  index: 3,
                  key: 'albamon',
                  value: '알코볼',
                },
              }),
            );
            navigate('MyAroundScreen');
          }}
          style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'rgba(246, 245, 242, 0.5)',
              borderWidth: 1,
              borderRadius: 21,
              borderColor: Color.Grayyellow100,
              paddingVertical: 12,
              paddingLeft: 20,
              paddingRight: 16,
            }}
          >
            <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
              알.코.볼{' '}
            </CustomText>
            <CustomText style={{ color: Color.Grayyellow500, fontSize: 13, letterSpacing: -0.2 }}>
              볼링장 모두보기
            </CustomText>
            <View style={{ width: 15, height: 15 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Home/icArrowRiPurple.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>
      )}
    </View>
  );
};

export default DirectReservationArea;
