import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import RootNavigator from '@/Navigators/RootNavigator';
import Dialog from '@/Components/Dialog';
import Toast from '@/Components/Toast';
import Loading from '@/Components/Loading';
import AgreeDetailScreen from '../Auth/AgreeDetailScreen';

// import { FirebaseTokenUpdate } from '@/Components/Firebase/messaging';
// import RootCheckAppVersion from './RootCheckAppVersion';
// import RootDynamicLink from './RootDynamicLink';
// import RootFcm from '@/Containers/Root/RootFcm';

import { NotificationRequest } from '@/Components/Permission/Notification';
import TimeFilterRBS from '@/Components/RBS/Home/TimeFilterRBS';
import QnaTypeRBS from '@/Components/RBS/Qna/QnaTypeRBS';
import ReservationRBS from '@/Components/RBS/Reservation/ReservationRBS';
import DirectReservationRBS from '@/Components/RBS/Home/DirectReservationRBS';
import CalendarRBS from '@/Components/RBS/Common/CalendarRBS';

LogBox.ignoreLogs([
  'interpolate() was renamed to interpolateNode()',
  'Easing was renamed to EasingNode in Reanimated 2.',
  'If you want to use Reanimated 2 then go through our installation steps',
  'Warning: Overriding previous layout animation with new one before the first began',
  'new NativeEventEmitter()',
  'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format',
]);

const RootScreen = () => {
  const dispatch = useDispatch();
  const {
    // isConnected,
    isLoading,
    alertDialog,
    alertDialogType,
    alertDialogDataType,
    alertDialogTitle,
    alertDialogMessage,
    alertToast,
    alertToastPosition,
    alertToastMessage,
    isOpenAgreeDetailRBS,
    isOpenTimeFilterRBS,
    isOpenDirectReservationRBS,
    isOpenQnaTypeRBS,
    isOpenReservationRBS,
    isOpenCalendarRBS,
  } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    // dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'N' }));
    AsyncStorage.getItem('splashStatus').then((r) => console.log('rootscreen splashStatus', r));
    dispatch(CommonActions.fetchInitialHandler());

    return () => {
      dispatch(CommonActions.fetchInitialHandler());
    };
  }, []);

  useEffect(() => {
    console.log(
      'RBSheet Flag State : ',
      isOpenTimeFilterRBS,
      isOpenDirectReservationRBS,
      isOpenReservationRBS,
      isOpenCalendarRBS,
    );
  }, [isOpenTimeFilterRBS, isOpenDirectReservationRBS, isOpenReservationRBS, isOpenCalendarRBS]);

  return (
    <>
      <RootNavigator />
      {isLoading && <Loading />}
      {/** 공통 얼러트 컴포넌트 * */}
      {alertDialog && (
        <Dialog
          item={{
            type: alertDialogType,
            dataType: alertDialogDataType,
            title: alertDialogTitle,
            text: alertDialogMessage,
          }}
        />
      )}
      {alertToast && <Toast position={alertToastPosition} message={alertToastMessage} />}

      {/* <RootFcm /> */}
      {/* <RootCodePush /> */}
      {/* {checkSplash && <RootCodePush />} */}
      {/** 앱버전체크(realDB) 리스너 컴포넌트 * */}
      {/* <RootCheckAppVersion /> */}
      {/* <RootDynamicLink /> */}

      {isOpenAgreeDetailRBS && <AgreeDetailScreen />}
      {isOpenTimeFilterRBS && <TimeFilterRBS />}
      {isOpenQnaTypeRBS && <QnaTypeRBS />}
      {isOpenDirectReservationRBS && <DirectReservationRBS />}
      {isOpenReservationRBS && <ReservationRBS />}
      {isOpenCalendarRBS && <CalendarRBS />}
    </>
  );
};

export default RootScreen;
