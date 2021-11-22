import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, Platform, useWindowDimensions, View } from 'react-native';
import moment from 'moment';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import PlaceActions from '@/Stores/Place/Actions';
import { HomeState } from '@/Stores/Home/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import TicketSlider from '@/Components/Card/Common/TicketSlider';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';

const DirectReservationRBS = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { heightInfo, isOpenDirectReservationRBS } = useSelector((state: CommonState) => state.common);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { calendarDate, selectedDirectIdx, selectedDirectName } = useSelector((state: HomeState) => state.home);
  const { placeTicketList, selectedTicket } = useSelector((state: PlaceState) => state.place);
  const RBSheetRef = useRef<any>();

  useEffect(() => {
    if (isOpenDirectReservationRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenDirectReservationRBS]);

  useEffect(() => {
    dispatch(
      PlaceActions.fetchPlaceTicketList({ idx: selectedDirectIdx, date: moment(calendarDate).format('YYYY-MM-DD') }),
    );
  }, [selectedDirectIdx]);

  const onPressCancel = () => {
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
    RBSheetRef?.current.close();
  };

  const onPressReservation = () => {
    if (selectedTicket) {
      if (!userIdx) {
        navigate('SimpleLoginScreen');
      }
      if (selectedTicket?.idx) {
        navigate('ReservationScreen', { placeIdx: selectedDirectIdx, ticketInfoIdx: selectedTicket?.idx });
      }
      RBSheetRef?.current.close();
    }
    return null;
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.7}
      openDuration={500}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenDirectReservationRBS', data: false }))}
    >
      <View style={{ width: '100%', height: height * 0.7 }}>
        <View style={{ paddingTop: 28, paddingBottom: 12, paddingLeft: 24 }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
            {selectedDirectName}
          </CustomText>
        </View>
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View>
              <View style={{ flex: 1 }}>
                <View style={{}}>
                  <TicketSlider allowedTimeArr={[0, 1, 2]} item={placeTicketList || {}} showDivider />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
        <View
          style={{
            paddingBottom: Platform.OS === 'ios' ? heightInfo.fixBottomHeight : heightInfo.fixBottomHeight + 12,
          }}
        >
          <View
            style={{
              height: 1,
              backgroundColor: Color.Gray300,
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowColor: 'rgba(107, 107, 107, 0.1)',
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: 1,
            }}
          />
          {selectedTicket && (
            <View style={{ paddingHorizontal: 24, paddingTop: 18, paddingBottom: 9 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13 }}>{selectedTicket?.ticketName}</CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 6 }}>
                  <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15, fontWeight: '500' }}>
                    {moment(calendarDate).format('MM월 DD일(dd)')} {selectedTicket?.startTime.substr(0, 5)} ~{' '}
                    {selectedTicket?.endTime.substr(0, 5)}
                  </CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold' }}>
                      {numberFormat(selectedTicket?.salePrice)}
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 17 }}>원</CustomText>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={{ paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <CustomButton onPress={() => onPressCancel()}>
              <View
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Color.Gray300,
                  paddingVertical: 15,
                  paddingHorizontal: 22,
                  marginRight: 8,
                }}
              >
                <CustomText style={{ color: Color.Gray400, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                  취소
                </CustomText>
              </View>
            </CustomButton>
            <CustomButton
              onPress={() => onPressReservation()}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 3,
                paddingVertical: 15,
                backgroundColor: selectedTicket ? Color.Primary1000 : Color.Grayyellow200,
              }}
            >
              <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
                예약하기
              </CustomText>
            </CustomButton>
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default DirectReservationRBS;
