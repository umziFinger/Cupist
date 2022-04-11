import React, { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { DATA_TICKET_TIME } from '@/Components/Data/DATA_TICKET_TIME';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';
import { ALBAMON_TICKET_TYPE } from '@/Stores/Albamon/InitialState';
import { DATA_ALBAMON_TICKET_TIME } from '@/Components/Data/DATA_ALBAMON_TICKET_TIME';

interface PropTypes {
  allowedTimeArr: Array<any>;
  item: any;
  showDivider: boolean;
  focusType: TICKET_TYPE;
}

const AlbamonTicketSlider = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const {
    allowedTimeArr,
    item = {
      morning: [
        { start: '07:00', price: 0, idx: 0 },
        { start: '09:00', price: 0, idx: 1 },
        { start: '11:00', price: 0, idx: 2 },
      ],
      afternoon: [
        { start: '07:00', price: 0, idx: 3 },
        { start: '09:00', price: 0, idx: 4 },
        { start: '11:00', price: 0, idx: 5 },
      ],
      nighttime: [
        { start: '07:00', price: 0, idx: 6 },
        { start: '09:00', price: 0, idx: 7 },
        { start: '11:00', price: 0, idx: 8 },
      ],
    },
    showDivider = false,
    focusType = TICKET_TYPE.ALL,
  } = props;
  const morning = item?.morning || [
    { start: '07:00', price: 0, idx: 0 },
    { start: '09:00', price: 0, idx: 1 },
    { start: '11:00', price: 0, idx: 2 },
  ];
  const afternoon = item?.afternoon || [
    { start: '13:00', price: 0, idx: 3 },
    { start: '15:00', price: 0, idx: 4 },
    { start: '17:00', price: 0, idx: 5 },
  ];
  const nighttime = item?.nighttime || [
    { start: '20:00', price: 0, idx: 6 },
    { start: '22:00', price: 0, idx: 7 },
  ];

  const isShowFunc = (value: number) => {
    return (
      (value === 0 && morning.length > 0) ||
      (value === 1 && afternoon.length > 0) ||
      (value === 2 && nighttime.length > 0)
    );
  };

  const onPressTicket = (value: any) => {
    if (selectedTicket?.idx === value.idx) {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
      return;
    }
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: value }));
  };

  return (
    <View>
      {morning?.length !== 0 || afternoon?.length !== 0 || nighttime?.length !== 0 ? (
        <FlatList
          data={allowedTimeArr}
          renderItem={({ item: allowedTime }) => {
            return (
              <>
                {isShowFunc(allowedTime) && (
                  <View style={{ flex: 1, marginTop: 24 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 24 }}>
                      <View style={{ width: 24, height: 24, marginRight: 2 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Common/icTime.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                      <View
                        style={{ justifyContent: 'center', marginRight: 6, flexDirection: 'row', alignItems: 'center' }}
                      >
                        <CustomText
                          style={{ color: Color.Primary1000, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}
                        >
                          {DATA_ALBAMON_TICKET_TIME[allowedTime].type}
                        </CustomText>
                        <View style={{ width: 1, height: 11, backgroundColor: Color.Gray300, marginHorizontal: 6 }} />
                        <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: 0 }}>
                          {DATA_ALBAMON_TICKET_TIME[allowedTime].period}
                        </CustomText>
                      </View>
                      {/* <View style={{ backgroundColor: Color.Gray300, width: 1, height: 11, marginRight: 6 }} /> */}
                      {/* <View style={{ justifyContent: 'center' }}> */}
                      {/*  <CustomText style={{ color: Color.Gray800, fontSize: 13 }}> */}
                      {/*    {DATA_TICKET_TIME[index].time} */}
                      {/*  </CustomText> */}
                      {/* </View> */}
                    </View>
                    <FlatList
                      data={allowedTime === 0 ? morning : allowedTime === 1 ? afternoon : nighttime}
                      renderItem={({ item: time }) => (
                        <CustomButton onPress={() => onPressTicket(time)}>
                          <View
                            style={{
                              width: 120,
                              marginTop: 13,
                              paddingVertical: 20,
                              paddingLeft: 12,
                              paddingRight: 21,
                              borderRadius: 5,
                              borderWidth: 1,
                              borderColor: selectedTicket?.idx === time.idx ? Color.Primary1000 : Color.Gray300,
                              backgroundColor:
                                selectedTicket?.idx === time.idx ? 'rgba(255, 185, 10, 0.05)' : Color.Grayyellow50,
                              marginRight: 8,
                            }}
                          >
                            {/* 자유볼링 티켓 */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <CustomText
                                style={{
                                  color: Color.Grayyellow1000,
                                  fontSize: 14,
                                  fontWeight: '500',
                                }}
                              >
                                {time?.start}
                              </CustomText>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 2,
                              }}
                            >
                              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <CustomText
                                  style={{
                                    color: Color.Grayyellow1000,
                                    fontSize: 15,
                                    fontWeight: '500',
                                  }}
                                >
                                  {numberFormat(time?.salePrice)}
                                </CustomText>
                              </View>
                              <View style={{ justifyContent: 'center' }}>
                                <CustomText
                                  style={{
                                    color: Color.Grayyellow1000,
                                    fontSize: 15,
                                  }}
                                >
                                  원
                                </CustomText>
                              </View>
                            </View>
                          </View>
                        </CustomButton>
                      )}
                      keyExtractor={(cardKey, keyIndex) => keyIndex.toString()}
                      initialNumToRender={3}
                      maxToRenderPerBatch={6}
                      windowSize={7}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingLeft: 24 }}
                    />
                    {showDivider && allowedTime === 1 && (
                      <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 24 }} />
                    )}
                  </View>
                )}
              </>
            );
          }}
          keyExtractor={(keyItem, index) => index.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
        />
      ) : (
        <View style={{ marginTop: 60, marginBottom: 52, alignItems: 'center' }}>
          <View style={{ width: 60, height: 60 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Home/emptyList.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ marginTop: 8, alignItems: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray400, fontSize: 14, fontWeight: '500', letterSpacing: -0.25 }}>
                해당 날짜에 예약할 수 있는 상품이 없습니다.
              </CustomText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AlbamonTicketSlider;
