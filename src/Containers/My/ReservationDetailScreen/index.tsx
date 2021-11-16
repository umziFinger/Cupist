import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Color } from '@/Assets/Color';

import Header from '@/Components/Header';

import PlaceInfo from '@/Containers/My/ReservationDetailScreen/PlaceInfo';
import ReservationInfo from '@/Containers/My/ReservationDetailScreen/ReservationInfo';
import PaymentInfo from '@/Containers/My/ReservationDetailScreen/PaymentInfo';

const ReservationDetailScreen = () => {
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
      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header type={'back'} />
      <View style={{ backgroundColor: Color.White, flex: 1 }}>
        <FlatList
          data={[0, 1, 2]}
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
