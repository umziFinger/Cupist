import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import TabMenu from '@/Components/TabMenu';
import { MY_TAB_MENU } from '@/Containers/My/MyScreen/data';
import { MyState } from '@/Stores/My/InitialState';
import ReservationList from '@/Containers/My/MyScreen/ReservationList';
import Header from '@/Components/Header';

const ReservationDetailScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const {
    reservationSelectedTab = { title: '진행중', key: 'before' },
    mySelectedTab = { title: '예약', selectKey: 'reservation' },
    reservationListPage = { before: 1, after: 1, cancel: 1 },
  } = useSelector((state: MyState) => state.my);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingTop: 28 }}>
      <Header type={'back'} />
    </View>
  );
};

export default ReservationDetailScreen;
