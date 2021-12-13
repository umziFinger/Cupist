import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import TabMenu from '@/Components/TabMenu';
import { MY_TAB_MENU } from '@/Containers/My/MyScreen/data';
import { MyState } from '@/Stores/My/InitialState';
import ReservationList from '@/Containers/My/MyScreen/ReservationList';
import ReviewList from '@/Containers/My/MyScreen/ReviewList';
import { fetchMyReviewList } from '@/Sagas/MySaga';
import { navigationRef } from '@/Services/NavigationService';

const MyScreen = () => {
  const isFocused = useIsFocused();
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

  // 다른 탭 이동시 예약 서브 탭 상태값 초기화
  useEffect(() => {
    if (!isFocused && navigationRef.current.getCurrentRoute().name !== 'WriteReviewScreen') {
      dispatch(MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '진행중', key: 'before' } }));
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingTop: paddingTop + 29 }}>
      <TabMenu type={'my'} data={MY_TAB_MENU} />

      {mySelectedTab.selectKey === 'reservation' && <ReservationList />}
      {mySelectedTab.selectKey === 'review' && <ReviewList />}
    </View>
  );
};

export default MyScreen;
