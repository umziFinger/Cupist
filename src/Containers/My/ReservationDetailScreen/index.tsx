import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';

import Header from '@/Components/Header';

import PlaceInfo from '@/Containers/My/ReservationDetailScreen/PlaceInfo';
import ReservationInfo from '@/Containers/My/ReservationDetailScreen/ReservationInfo';
import PaymentInfo from '@/Containers/My/ReservationDetailScreen/PaymentInfo';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import PaymentMethod from '@/Containers/My/ReservationDetailScreen/PaymentMethod';
import { MyState } from '@/Stores/My/InitialState';

const ReservationDetailScreen = () => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { reservationDetail } = useSelector((state: MyState) => state.my);

  const renderItem = (index: number) => {
    switch (index) {
      case 0: {
        return (
          <>
            <View style={{ paddingTop: 28, paddingHorizontal: 24, backgroundColor: Color.White }}>
              <PlaceInfo />
            </View>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
          </>
        );
      }
      case 1: {
        return (
          <>
            <View style={{ paddingHorizontal: 24, backgroundColor: Color.White }}>
              <ReservationInfo />
            </View>
            <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
          </>
        );
      }
      case 2: {
        return (
          <View style={{ paddingHorizontal: 24, backgroundColor: Color.White }}>
            <PaymentInfo />
          </View>
        );
      }
      // case 3은 무통장입금일때만 노출
      case 3: {
        return (
          reservationDetail?.type === '가상계좌' && (
            <View style={{ marginTop: 28 }}>
              <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
              <PaymentMethod />
            </View>
          )
        );
      }
      case 4: {
        return (
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: Color.Gray300, marginTop: 28 }} />
            <View style={{ marginTop: 28, paddingBottom: heightInfo.subBottomHeight }}>
              <CustomText
                style={{ fontSize: 10, letterSpacing: 0, color: Color.Gray400 }}
              >{`(주)볼링플러스는 통신판매중개자로서 통신판매의 당사자가 아니며,\n상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.`}</CustomText>
            </View>
          </View>
        );
      }
      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header type={'back'} />
      <View style={{ backgroundColor: Color.White, flex: 1 }}>
        <FlatList
          data={[0, 1, 2, 3, 4]}
          renderItem={({ index }) => renderItem(index)}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ReservationDetailScreen;
