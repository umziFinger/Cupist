import React, { useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import TabMenu from '@/Components/TabMenu';
import { MY_TAB_MENU } from '@/Containers/My/MyScreen/data';
import { MyState } from '@/Stores/My/InitialState';
import ReservationList from '@/Containers/My/MyScreen/ReservationList';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import InfoItem from '@/Containers/My/ReservationDetailScreen/InfoItem';

const ReservationDetailScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const {
    reservationSelectedTab = { title: '진행중', key: 'before' },
    mySelectedTab = { title: '예약', selectKey: 'reservation' },
    reservationListPage = { before: 1, after: 1, cancel: 1 },
  } = useSelector((state: MyState) => state.my);

  const renderItem = (index: number) => {
    switch (index) {
      case 0: {
        return <InfoItem />;
      }
      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.Gray200 }}>
      <Header type={'back'} />
      <View style={{ paddingTop: 28, backgroundColor: Color.White }}>
        <FlatList
          data={[0, 1, 2]}
          renderItem={({ index }) => renderItem(index)}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
          windowSize={7}
          contentContainerStyle={{ backgroundColor: Color.White, paddingHorizontal: 24 }}
        />
      </View>
    </View>
  );
};

export default ReservationDetailScreen;
