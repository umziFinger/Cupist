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
import ReviewList from '@/Containers/My/MyScreen/ReviewList';
import { fetchMyReviewList } from '@/Sagas/MySaga';

const MyScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const {
    reservationSelectedTab = { title: '진행중', key: 'before' },
    mySelectedTab = { title: '예약', selectKey: 'reservation' },
    reservationListPage = { before: 1, after: 1, cancel: 1 },
    myReviewPage = 1,
  } = useSelector((state: MyState) => state.my);
  const paddingTop = Platform.OS === 'android' ? 0 : heightInfo.statusHeight;

  useEffect(() => {
    if (mySelectedTab.selectKey === 'reservation') {
      const params = {
        perPage: 10,
        page: reservationListPage[reservationSelectedTab.key],
        state: reservationSelectedTab.key,
      };
      dispatch(MyActions.fetchMyReservationList(params));
    } else if (mySelectedTab.selectKey === 'review') {
      const params = {
        perPage: 10,
        page: myReviewPage,
      };
      dispatch(MyActions.fetchMyReviewList(params));
    }
  }, [mySelectedTab.selectKey, reservationSelectedTab.key]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingTop: paddingTop + 29 }}>
      <TabMenu type={'my'} data={MY_TAB_MENU} />

      {mySelectedTab.selectKey === 'reservation' && <ReservationList />}
      {mySelectedTab.selectKey === 'review' && <ReviewList />}
    </View>
  );
};

export default MyScreen;
