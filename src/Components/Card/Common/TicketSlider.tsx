import React, { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color, Opacity } from '@/Assets/Color';
import { DATA_TICKET_TIME } from '@/Components/Data/DATA_TICKET_TIME';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';

interface PropTypes {
  allowedTimeArr: Array<any>;
  item: any;
  showDivider: boolean;
  focusType: TICKET_TYPE;
}

const TicketSlider = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const { allowedTimeArr, item, showDivider = false, focusType = TICKET_TYPE.ALL } = props;
  const normal = item?.normal || [];
  const free = item?.free || [];

  console.log('@@@@@@@@@@@@@@@@@@@@', free);
  useMemo(() => {
    let findIdx = -1;
    if (focusType === TICKET_TYPE.NORMAL) {
      for (let i = 0; i < normal.length; i++) {
        if (!normal[i].hasSoldOut) {
          findIdx = i;
          break;
        }
      }
      if (findIdx > -1) dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: normal[findIdx] }));
    } else if (focusType === TICKET_TYPE.FREE) {
      for (let i = 0; i < free.length; i++) {
        if (!free[i].hasSoldOut) {
          findIdx = i;
          break;
        }
      }
      if (findIdx > -1) dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: free[findIdx] }));
    }
  }, [item]);

  const isShowFunc = (value: number) => {
    return (value === 0 && normal.length > 0) || (value === 1 && free.length > 0);
  };

  const onPressTicket = (value: any) => {
    console.log('ticket==-=-=-=-=-=', value);
    if (selectedTicket?.idx === value.idx || value.hasSoldOut) {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
      return;
    }

    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: value }));
  };

  return (
    <View>
      {normal?.length !== 0 || free?.length !== 0 ? (
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
                      <View style={{ justifyContent: 'center', marginRight: 6 }}>
                        <CustomText
                          style={{ color: Color.Primary1000, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}
                        >
                          {DATA_TICKET_TIME[allowedTime].type}
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
                      data={allowedTime === 0 ? normal : free}
                      renderItem={({ item: time }) => (
                        <CustomButton onPress={() => onPressTicket(time)}>
                          <View
                            style={{
                              marginTop: 13,
                              paddingVertical: allowedTime === 0 ? 20 : 16,
                              paddingLeft: 12,
                              paddingRight: time?.hasSoldOut ? 20 : allowedTime === 1 ? 12 : 44,
                              borderRadius: 5,
                              borderWidth: 1,
                              borderColor:
                                selectedTicket?.idx === time.idx
                                  ? Color.Primary1000
                                  : time?.hasSoldOut
                                  ? 'transparent'
                                  : Color.Gray300,
                              backgroundColor:
                                selectedTicket?.idx === time.idx
                                  ? 'rgba(255, 185, 10, 0.05)'
                                  : time?.hasSoldOut
                                  ? Color.Gray100
                                  : Color.Grayyellow50,
                              marginRight: 8,
                            }}
                          >
                            {/* 자유볼링 티켓 */}

                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              {(allowedTime === 1 || time?.hasSoldOut) && (
                                <View
                                  style={{
                                    backgroundColor:
                                      selectedTicket?.idx === time.idx
                                        ? Color.Primary1000
                                        : time?.hasSoldOut
                                        ? `${Color.Gray400}${Opacity._40}`
                                        : Color.Grayyellow500,
                                    paddingVertical: 1,
                                    paddingHorizontal: time?.hasSoldOut ? 2 : 4,
                                    borderTopLeftRadius: 2,
                                    borderBottomLeftRadius: 2,
                                    borderTopRightRadius: time?.hasSoldOut ? 2 : 0,
                                    borderBottomRightRadius: time?.hasSoldOut ? 2 : 0,
                                    marginBottom: 8,
                                  }}
                                >
                                  <CustomText
                                    style={{
                                      color:
                                        selectedTicket?.idx === time.idx
                                          ? Color.White
                                          : time?.hasSoldOut
                                          ? Color.Gray600
                                          : Color.White,
                                      fontSize: 11,
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {selectedTicket?.idx === time.idx
                                      ? `잔여예약 ${time?.remainingCnt}`
                                      : time?.hasSoldOut
                                      ? '마감'
                                      : `잔여예약 ${time?.remainingCnt}`}
                                  </CustomText>
                                </View>
                              )}
                              {!time?.hasSoldOut && (
                                <View
                                  style={{
                                    paddingVertical: 1,
                                    paddingHorizontal: 4,
                                    backgroundColor: time?.hasSoldOut
                                      ? Color.Gray300
                                      : selectedTicket?.idx === time.idx
                                      ? `${Color.Primary1000}${Opacity._20}`
                                      : Color.Grayyellow200,
                                    borderTopLeftRadius: allowedTime === 1 ? 0 : 2,
                                    borderBottomLeftRadius: allowedTime === 1 ? 0 : 2,
                                    borderTopRightRadius: 2,
                                    borderBottomRightRadius: 2,
                                    marginBottom: 8,
                                  }}
                                >
                                  <CustomText
                                    style={{
                                      fontSize: 11,
                                      fontWeight: '500',
                                      color: selectedTicket?.idx === time.idx ? Color.Primary1000 : Color.Grayyellow500,
                                    }}
                                  >
                                    {time?.gameCnt === 0 ? '무제한 게임' : `${time?.gameCnt}게임 가능`}
                                  </CustomText>
                                </View>
                              )}
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <CustomText
                                style={{
                                  color:
                                    selectedTicket?.idx === time.idx
                                      ? Color.Grayyellow1000
                                      : time?.hasSoldOut
                                      ? Color.Gray400
                                      : Color.Grayyellow1000,
                                  fontSize: 14,
                                  fontWeight: '500',
                                }}
                              >
                                {time.startTime.substr(0, 5)} - {time.endTime.substr(0, 5)}
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
                                {/* {allowedTime === 0 && time?.hasSoldOut && ( */}
                                {/*  <View */}
                                {/*    style={{ */}
                                {/*      backgroundColor: Color.Gray300, */}
                                {/*      paddingVertical: 1, */}
                                {/*      paddingHorizontal: 2, */}
                                {/*      marginRight: 5, */}
                                {/*      borderRadius: 2, */}
                                {/*    }} */}
                                {/*  > */}
                                {/*    <CustomText style={{ color: Color.Gray400, fontSize: 11, fontWeight: 'bold' }}> */}
                                {/*      마감 */}
                                {/*    </CustomText> */}
                                {/*  </View> */}
                                {/* )} */}

                                <CustomText
                                  style={{
                                    color:
                                      selectedTicket?.idx === time.idx
                                        ? Color.Grayyellow1000
                                        : time?.hasSoldOut
                                        ? Color.Gray400
                                        : Color.Grayyellow1000,
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
                                    color:
                                      selectedTicket?.idx === time.idx
                                        ? Color.Grayyellow1000
                                        : time?.hasSoldOut
                                        ? Color.Gray400
                                        : Color.Grayyellow1000,
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
                    {showDivider && allowedTime === 0 && free?.length > 0 && (
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

export default TicketSlider;
