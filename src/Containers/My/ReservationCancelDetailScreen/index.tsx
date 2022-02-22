import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import RowItem from '@/Containers/My/ReservationCancelDetailScreen/RowItem';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import { numberFormat } from '@/Components/Function';
import ReservationActions from '@/Stores/Reservation/Actions';
import { CommonState } from '@/Stores/Common/InitialState';

const ReservationCancelDetailScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { reservationCancelDetail } = useSelector((state: MyState) => state.my);

  const onProgressCancel = () => {
    const params = {
      paymentIdx: reservationCancelDetail?.idx,
      name: reservationCancelDetail?.username,
      reason: '예약 취소',
    };
    dispatch(ReservationActions.fetchReservationCancel(params));
  };

  const renderCancelPercentNotice = (percent: number) => {
    return (
      <View
        style={{
          borderRadius: 3,
          backgroundColor: Color.Gray800,
          marginTop: 28,
          paddingVertical: 12,
          alignItems: 'center',
        }}
      >
        <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.White }}>
          {`환불 규정에 따라 예약금액의 ${percent}%가 차감됩니다.`}
        </CustomText>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <View style={{ backgroundColor: Color.White, flex: 1, paddingHorizontal: 24 }}>
        <FlatList
          data={[0]}
          renderItem={({ index }) => (
            <>
              <View>
                <CustomText
                  style={{
                    paddingTop: 28,
                    fontSize: 22,
                    fontWeight: 'bold',
                    letterSpacing: -0.4,
                    color: Color.Black1000,
                  }}
                >
                  예약 취소 안내
                </CustomText>
              </View>
              <View style={{ marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem title={'볼링장명'} content={reservationCancelDetail?.Place?.name || ''} />
              </View>
              <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem title={'이용날짜'} content={reservationCancelDetail?.useDateText || ''} />
              </View>
              <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem title={'이용시간'} content={`${reservationCancelDetail?.useTimeText || ''}`} />
              </View>
              <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem title={'상품명'} content={reservationCancelDetail?.ticketName || ''} />
              </View>
              <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem title={'예약인원'} content={`${reservationCancelDetail?.memberCnt || ''}명`} />
              </View>
              <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', paddingBottom: 28 }}>
                <RowItem title={'추가옵션'} content={`볼링화 ${reservationCancelDetail?.shoesCnt || ''}켤레`} />
              </View>

              <View style={{ borderStyle: 'dashed', borderWidth: 0.5, borderColor: Color.Gray350 }} />

              <View style={{ marginTop: 28, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem title={'취소 가능 기한'} content={reservationCancelDetail?.cancelLimitDate || ''} />
              </View>
              <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', paddingBottom: 28 }}>
                <RowItem title={'결제방법'} content={reservationCancelDetail?.type || ''} />
              </View>

              <View style={{ borderStyle: 'dashed', borderWidth: 0.5, borderColor: Color.Gray350 }} />

              {/* {reservationCancelDetail?.cancelType === '당일취소' && ( */}
              {/*  */}
              {/* )} */}
              {reservationCancelDetail?.cancelPercent !== 0 &&
                renderCancelPercentNotice(reservationCancelDetail?.cancelPercent)}

              <View style={{ marginTop: 28, flexDirection: 'row', alignItems: 'center' }}>
                <RowItem
                  title={'결제 금액'}
                  content={`${numberFormat(reservationCancelDetail?.totalPrice || '')}원`}
                  contentStyle={{
                    fontSize: 15,
                    fontWeight: '500',
                    letterSpacing: -0.2,
                    textAlign: 'right',
                    color: Color.Black1000,
                  }}
                />
              </View>
              <View style={{ marginTop: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 28 }}>
                <RowItem
                  title={'취소수수료 차감'}
                  content={`-${numberFormat(reservationCancelDetail?.fees || '')}원`}
                  contentStyle={{
                    fontSize: 15,
                    fontWeight: '500',
                    letterSpacing: -0.2,
                    textAlign: 'right',
                    color: Color.Black1000,
                  }}
                />
              </View>

              <View style={{ borderStyle: 'dashed', borderWidth: 0.5, borderColor: Color.Gray350 }} />

              <View style={{ marginTop: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 28 }}>
                <RowItem
                  title={'환불 예정 금액'}
                  content={`${numberFormat(reservationCancelDetail?.cancelPrice || '')}원`}
                  contentStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.24, color: Color.Error }}
                />
              </View>

              <CustomButton onPress={() => onProgressCancel()}>
                <View
                  style={{
                    borderRadius: 3,
                    backgroundColor: Color.White,
                    marginTop: 40,
                    paddingVertical: 12,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: Color.Grayyellow200,
                  }}
                >
                  <CustomText
                    style={{ fontSize: 14, letterSpacing: -0.25, textAlign: 'center', color: Color.Grayyellow1000 }}
                  >
                    예약 취소 진행하기
                  </CustomText>
                </View>
              </CustomButton>
            </>
          )}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: heightInfo.statusHeight }}
        />
      </View>
    </View>
  );
};

export default ReservationCancelDetailScreen;
