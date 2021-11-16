import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import TabMenu from '@/Components/TabMenu';
import { MY_RESERVATION_TAB_MENU } from '@/Containers/My/MyScreen/data';
import { MyState, reservationTabType } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { fetchMyReservationDetailInfo } from '@/Sagas/MySaga';

const ReservationList = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const {
    reservationSelectedTab = { title: '진행중', key: 'before' },
    reservationList,
    reservationListPage,
  } = useSelector((state: MyState) => state.my);

  const emptyText = (key: reservationTabType['key']) => {
    switch (key) {
      case 'before': {
        return `이용전인 예약 내역이 없습니다.\n볼링장을 검색하고 예약해보세요!`;
      }
      case 'after': {
        return `지난 예약 내역이 없습니다.\n볼링장을 검색하고 예약해보세요!`;
      }
      case 'cancel': {
        return `취소한 예약 내역이 없습니다.\n볼링장을 검색하고 예약해보세요!`;
      }
      default:
        return false;
    }
  };
  useEffect(() => {
    dispatch(MyActions.fetchMyReducer({ type: 'reservationListPageInit' }));
  }, []);

  const onRefresh = () => {
    console.log('onRefresh');
    const params = {
      perPage: 10,
      page: 1,
      state: reservationSelectedTab.key,
    };
    dispatch(MyActions.fetchMyReservationList(params));
    dispatch(
      MyActions.fetchMyReducer({
        type: 'reservationListPage',
        data: 1,
        state: reservationSelectedTab.key,
      }),
    );
  };

  const onMore = () => {
    const params = {
      perPage: 10,
      page: reservationListPage[reservationSelectedTab.key],
      state: reservationSelectedTab.key,
    };

    if (reservationListPage[reservationSelectedTab.key] > 0) dispatch(MyActions.fetchMyReservationList(params));
  };

  const onReservationDetail = (item: any) => {
    console.log(item.idx);
    const params = {
      reservationIdx: item.idx,
    };
    dispatch(MyActions.fetchMyReservationDetailInfo(params));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: 28 }}>
        <TabMenu type={'reservation'} data={MY_RESERVATION_TAB_MENU} />
      </View>

      <FlatList
        data={reservationList[reservationSelectedTab.key]}
        renderItem={({ item, index }) => (
          <CustomButton onPress={() => onReservationDetail(item)}>
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 15,
                borderRadius: 5,
                backgroundColor: Color.White,
                shadowColor: 'rgba(232, 232, 232, 0.5)',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 10,
                shadowOpacity: 1,
                borderWidth: 1,
                borderColor: Color.Gray300,
                marginTop: index === 0 ? 0 : 16,
                elevation: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.Gray300,
                }}
              >
                <View style={{ width: 36, height: 36, borderRadius: 5 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={{ uri: item?.placePhoto }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <CustomText style={{ fontSize: 17, fontWeight: '500', letterSpacing: -0.3, color: Color.Black1000 }}>
                    롤리볼리볼링장
                  </CustomText>
                </View>
              </View>

              <View style={{ marginTop: 16 }}>
                <View>
                  <CustomText style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}>
                    {item?.stateText || ''}
                  </CustomText>
                </View>
                <View style={{ marginTop: 6 }}>
                  <CustomText
                    style={{ fontSize: 15, fontWeight: '500', fontStyle: 'normal', color: Color.Grayyellow1000 }}
                  >
                    {item?.useDate || ''} {item?.startTime || ''} - {item?.endTime || ''}
                  </CustomText>
                </View>
                <View style={{ marginTop: 6 }}>
                  <CustomText style={{ fontSize: 13, letterSpacing: 0, color: Color.Grayyellow1000 }}>
                    {item?.ticketName || ''}
                  </CustomText>
                </View>
              </View>

              <View style={{ marginTop: 16 }}>
                {reservationSelectedTab.key === 'before' && (
                  <CustomButton>
                    <View
                      style={{ paddingTop: 12, paddingBottom: 11, backgroundColor: Color.Gray200, borderRadius: 5 }}
                    >
                      <CustomText
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          letterSpacing: -0.2,
                          textAlign: 'center',
                          color: Color.Gray600,
                        }}
                      >
                        예약취소
                      </CustomText>
                    </View>
                  </CustomButton>
                )}

                {reservationSelectedTab.key === 'after' && (
                  <View style={{ flexDirection: 'row' }}>
                    <CustomButton style={{ flex: 1 }}>
                      <View
                        style={{
                          paddingTop: 12,
                          paddingBottom: 11,
                          backgroundColor: Color.White,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: Color.Gray300,
                          marginRight: 9,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            letterSpacing: -0.2,
                            textAlign: 'center',
                            color: Color.Gray600,
                          }}
                        >
                          다시 예약
                        </CustomText>
                      </View>
                    </CustomButton>

                    <CustomButton style={{ flex: 1 }}>
                      <View
                        style={{
                          paddingTop: 12,
                          paddingBottom: 11,
                          backgroundColor: item?.reviewYN === 'N' ? Color.Primary1000 : Color.White,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: item?.reviewYN === 'N' ? 'transparent' : Color.Primary1000,
                        }}
                      >
                        <CustomText
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            letterSpacing: -0.2,
                            textAlign: 'center',
                            color: item?.reviewYN === 'N' ? Color.White : Color.Primary1000,
                          }}
                        >
                          {item?.reviewYN === 'N' ? '리뷰쓰기' : '내 리뷰 보기'}
                        </CustomText>
                      </View>
                    </CustomButton>
                  </View>
                )}

                {reservationSelectedTab.key === 'cancel' && (
                  <CustomButton>
                    <View
                      style={{
                        paddingTop: 12,
                        paddingBottom: 11,
                        backgroundColor: Color.White,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: Color.Gray300,
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          letterSpacing: -0.2,
                          textAlign: 'center',
                          color: Color.Gray600,
                        }}
                      >
                        다시예약
                      </CustomText>
                    </View>
                  </CustomButton>
                )}
              </View>
            </View>
          </CustomButton>
        )}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => onRefresh()}
        scrollEnabled
        onEndReached={() => onMore()}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: Color.White,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 60, height: 60, marginTop: 120 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/emptyBooking.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ marginTop: 8 }}>
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  letterSpacing: -0.25,
                  textAlign: 'center',
                  color: Color.Gray400,
                }}
              >
                {emptyText(reservationSelectedTab.key)}
              </CustomText>
            </View>
            <CustomButton onPress={() => navigate('MyAroundScreen')}>
              <View style={{ marginTop: 24 }}>
                <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}>
                  내 주변 볼링장 보기
                </CustomText>
              </View>
            </CustomButton>
          </View>
        )}
        ListFooterComponent={<View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
      />
    </View>
  );
};

export default ReservationList;
