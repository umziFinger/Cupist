import React, { useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color, Opacity } from '@/Assets/Color';
import { numberFormat } from '@/Components/Function';
import PlaceActions from '@/Stores/Place/Actions';
import CustomButton from '@/Components/CustomButton';
import { PlaceState } from '@/Stores/Place/InitialState';
import usePlaceDibs from '@/Hooks/usePlaceDibs';
import { navigate } from '@/Services/NavigationService';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';
import TicketTypeBox from '@/Components/Card/PlaceList/TicketTypeBox';

interface PropTypes {
  type: string;
  item: any;
  ticketType: TICKET_TYPE;
}

const PlaceListCard = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { handlerPlaceDibs } = usePlaceDibs();
  const { width } = useWindowDimensions();
  const { type, item = {}, ticketType } = props;
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const [isError, setIsError] = useState(false);

  const onValueChange = (data: any) => {
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'isOpenTicketSlider',
        data: { type, idx: data.checkType, ticketType: data.ticketType },
      }),
    );
  };

  const onPressTicket = (place: any, ticket: any) => {
    if (selectedTicket?.idx === ticket.idx || ticket.hasSoldOut) {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
      return;
    }
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: { ...ticket } }));
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedPlaceIdx', data: place.idx }));
  };

  const onPlaceDetail = (place: any) => {
    navigate('PlaceDetailScreen', { idx: place.idx, ticketType });
  };

  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <CustomButton onPress={() => onPlaceDetail(item)}>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 16 }}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: '500', letterSpacing: -0.25 }}>
                {item?.name}
              </CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <View style={{ width: 14.2, height: 14.2 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/icStar.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ marginLeft: 1.8 }}>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                  {item?.averageStar || '0'}
                </CustomText>
              </View>
              <View style={{ width: 1, height: 10, backgroundColor: Color.Gray400, marginHorizontal: 6 }} />
              <View>
                <CustomText style={{ fontSize: 12, letterSpacing: 0, color: Color.Gray700 }}>
                  {item?.area || '지역정보없음'} {'\u2022'} {item?.distance || '거리정보없음'}
                </CustomText>
              </View>
            </View>
            {(type === TICKET_TYPE.NORMAL || type === TICKET_TYPE.FREE) &&
              (item?.PlaceTicketInfo?.length !== 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 16 }}>
                      <CustomText style={{ fontWeight: 'bold' }}>{numberFormat(item?.minPrice || 0)}</CustomText>
                      <CustomText>원~</CustomText>
                    </CustomText>
                  </View>
                </View>
              ) : (
                <View style={{ justifyContent: 'center', marginTop: 15 }}>
                  <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>예약 가능한 상품이 없습니다.</CustomText>
                </View>
              ))}
            {type === 'dibs' &&
              (item?.PlaceTicketInfo?.length !== 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                  <View style={{ justifyContent: 'center', marginRight: 4 }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13 }}>{item?.ticketName}</CustomText>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, fontWeight: 'bold' }}>
                      <CustomText style={{ fontWeight: 'bold' }}>{numberFormat(item?.minPrice || 0)}</CustomText>
                      <CustomText>원~</CustomText>
                    </CustomText>
                  </View>
                </View>
              ) : (
                <View style={{ justifyContent: 'center', marginTop: 15 }}>
                  <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>예약 가능한 상품이 없습니다.</CustomText>
                </View>
              ))}
          </View>
          <View style={{ width: 70, height: 70 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 4 }}
              source={
                !item?.placePhotoArr[0] || isError
                  ? require('@/Assets/Images/Common/icNoImage.png')
                  : { uri: item?.placePhotoArr[0] }
              }
              resizeMode={FastImage.resizeMode.cover}
              onError={() => {
                setIsError(true);
              }}
            />
            <CustomButton
              onPress={() => handlerPlaceDibs(item)}
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: 0,
                right: 0,
                alignItems: 'flex-end',
                zIndex: 100,
              }}
              hitSlop={10}
            >
              <View style={{ width: 24, height: 24 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    item.isPlaceDibs
                      ? require('@/Assets/Images/Button/icHeartOn.png')
                      : require('@/Assets/Images/Button/icHeartOffWt.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </CustomButton>
          </View>
        </View>
      </CustomButton>

      {/* 티켓 타입별 selectBox */}
      {item?.PlaceTicketInfo?.length !== 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 14,
            marginHorizontal: 16,
          }}
        >
          {(ticketType === TICKET_TYPE.ALL || ticketType === TICKET_TYPE.NORMAL) && (
            <View
              style={{
                width: (width - 40) / 2,
                borderWidth: 1,
                borderColor: item?.isSelectedNormal ? Color.Primary1000 : Color.Gray300,
                borderRadius: 5,
              }}
            >
              <TicketTypeBox
                idx={item?.idx}
                ticketType={TICKET_TYPE.NORMAL}
                item={item}
                onValueChange={onValueChange}
              />
            </View>
          )}
          {(ticketType === TICKET_TYPE.ALL || ticketType === TICKET_TYPE.FREE) && (
            <View
              style={{
                width: (width - 40) / 2,
                borderWidth: 1,
                borderColor: item?.isSelectedFree ? Color.Primary1000 : Color.Gray300,
                borderRadius: 5,
              }}
            >
              <TicketTypeBox idx={item?.idx} ticketType={TICKET_TYPE.FREE} item={item} onValueChange={onValueChange} />
            </View>
          )}
        </View>
      )}

      {/* 티켓 아이템 */}
      {(item?.isSelectedNormal || item?.isSelectedFree) && (
        <View style={{ flex: 1, paddingLeft: 16, marginTop: 16 }}>
          <FlatList
            data={item?.isSelectedNormal ? item?.normal : item?.isSelectedFree ? item?.free : []}
            renderItem={({ item: ticket }) => (
              <CustomButton onPress={() => onPressTicket(item, ticket)}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor:
                      selectedTicket?.idx === ticket?.idx
                        ? Color.Primary1000
                        : ticket?.hasSoldOut
                        ? 'transparent'
                        : Color.Gray300,
                    backgroundColor:
                      selectedTicket?.idx === ticket?.idx
                        ? 'rgba(255, 185, 10, 0.05)'
                        : ticket?.hasSoldOut
                        ? Color.Gray100
                        : Color.Grayyellow50,
                    paddingLeft: 12,
                    paddingRight: ticket?.hasSoldOut ? 20 : item?.isSelectedFree ? 12 : 44,
                    paddingVertical: 16,
                    marginRight: 8,
                  }}
                >
                  {/* 자유볼링 티켓 */}

                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    {(item?.isSelectedFree || ticket?.hasSoldOut) && (
                      <View
                        style={{
                          backgroundColor:
                            selectedTicket?.idx === ticket?.idx
                              ? Color.Primary1000
                              : ticket?.hasSoldOut
                              ? `${Color.Gray400}${Opacity._40}`
                              : Color.Grayyellow500,
                          paddingVertical: 1,
                          paddingHorizontal: 4,
                          borderTopLeftRadius: 2,
                          borderBottomLeftRadius: 2,
                          borderTopRightRadius: ticket?.hasSoldOut ? 2 : 0,
                          borderBottomRightRadius: ticket?.hasSoldOut ? 2 : 0,
                          marginBottom: 8,
                        }}
                      >
                        <CustomText
                          style={{
                            color:
                              selectedTicket?.idx === ticket?.idx
                                ? Color.White
                                : ticket?.hasSoldOut
                                ? Color.Gray600
                                : Color.White,
                            fontSize: 11,
                            fontWeight: 'bold',
                          }}
                        >
                          {selectedTicket?.idx === ticket?.idx
                            ? `잔여예약 ${ticket?.remainingCnt}`
                            : ticket?.hasSoldOut
                            ? '마감'
                            : `잔여예약 ${ticket?.remainingCnt}`}
                        </CustomText>
                      </View>
                    )}
                    {!ticket?.hasSoldOut && (
                      <View
                        style={{
                          paddingVertical: 1,
                          paddingHorizontal: 4,
                          backgroundColor: ticket?.hasSoldOut
                            ? Color.Gray300
                            : selectedTicket?.idx === ticket?.idx
                            ? `${Color.Primary1000}${Opacity._20}`
                            : Color.Grayyellow200,
                          borderTopLeftRadius: item?.isSelectedFree ? 0 : 2,
                          borderBottomLeftRadius: item?.isSelectedFree ? 0 : 2,
                          borderTopRightRadius: 2,
                          borderBottomRightRadius: 2,
                          marginBottom: 8,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 11,
                            fontWeight: '500',
                            color: selectedTicket?.idx === ticket?.idx ? Color.Primary1000 : Color.Grayyellow500,
                          }}
                        >
                          {ticket?.eventType === 'normal'
                            ? '예약가능'
                            : ticket?.gameCnt === 0
                            ? '무제한 게임'
                            : `최대 ${ticket?.gameCnt}게임`}
                        </CustomText>
                      </View>
                    )}
                  </View>

                  <View style={{ justifyContent: 'center' }}>
                    <CustomText
                      style={{
                        color:
                          selectedTicket?.idx === ticket?.idx
                            ? Color.Grayyellow1000
                            : ticket?.hasSoldOut
                            ? Color.Gray400
                            : Color.Grayyellow1000,
                        fontSize: 14,
                        fontWeight: '500',
                      }}
                    >
                      {ticket.startTime.substr(0, 5)} - {ticket.endTime.substr(0, 5)}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText
                        style={{
                          color:
                            selectedTicket?.idx === ticket?.idx
                              ? Color.Grayyellow1000
                              : ticket?.hasSoldOut
                              ? Color.Gray400
                              : Color.Grayyellow1000,
                          fontSize: 15,
                          fontWeight: '500',
                        }}
                      >
                        {numberFormat(ticket?.salePrice)}
                      </CustomText>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText
                        style={{
                          color:
                            selectedTicket?.idx === ticket.idx
                              ? Color.Grayyellow1000
                              : ticket?.hasSoldOut
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
            keyExtractor={(keyItem, index) => index.toString()}
            initialNumToRender={3}
            maxToRenderPerBatch={6}
            windowSize={7}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

export default PlaceListCard;
