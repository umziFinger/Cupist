import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import RootNavigator from '@/Navigators/RootNavigator';
import Dialog from '@/Components/Dialog';
// import { FirebaseTokenUpdate } from '@/Components/Firebase/messaging';
import Toast from '@/Components/Toast';
import Loading from '@/Components/Loading';
import AgreeDetailScreen from '../Auth/AgreeDetailScreen';

import GoogleLoginInitial from '@/Components/Login/SocialLogin/GoogleLoginInitial';
// import RootCheckAppVersion from './RootCheckAppVersion';
// import RootDynamicLink from './RootDynamicLink';
import RootCodePush from './RootCodePush';
// import RootFcm from '@/Containers/Root/RootFcm';

import { NotificationRequest } from '@/Components/Permission/Notification';
import TimeFilterRBS from '@/Components/RBS/Home/TimeFilterRBS';
import QnaTypeRBS from '@/Components/RBS/Qna/QnaTypeRBS';

LogBox.ignoreLogs([
  'interpolate() was renamed to interpolateNode()',
  'Easing was renamed to EasingNode in Reanimated 2.',
  'If you want to use Reanimated 2 then go through our installation steps',
  'Warning: Overriding previous layout animation with new one before the first began',
  'new NativeEventEmitter()',
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
  } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    // dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'N' }));
    AsyncStorage.getItem('splashStatus').then((r) => console.log('rootscreen splashStatus', r));
    dispatch(CommonActions.fetchInitialHandler());

    // 알림 권한 없으면 요청 후 토큰 업데이트
    NotificationRequest();

    // 구글 로그인 초기화
    GoogleLoginInitial();

    return () => {
      dispatch(CommonActions.fetchInitialHandler());
    };
  }, []);

  useEffect(() => {
    console.log('RBSheet Flag State : ', isOpenTimeFilterRBS, isOpenDirectReservationRBS);
  }, [isOpenTimeFilterRBS, isOpenDirectReservationRBS]);

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
      <RootCodePush />
      {/* {checkSplash && <RootCodePush />} */}
      {isOpenAgreeDetailRBS && <AgreeDetailScreen />}
      {/** 앱버전체크(realDB) 리스너 컴포넌트 * */}
      {/* <RootCheckAppVersion /> */}
      {/* <RootDynamicLink /> */}

      {isOpenTimeFilterRBS && <TimeFilterRBS />}
      {isOpenQnaTypeRBS && <QnaTypeRBS />}
      {/* {isOpenLoginRBS && <LoginScreen />} */}
      {/* {isOpenRepairNotificationRBS && <RepairNotificationScreen item={restorationInfo} />} */}
      {/* {isOpenMyAddressRBS && <MyAddressRBS />} */}
      {/* {isOpenSearchAddressRBS && <SearchAddressRBS />} */}
      {/* <AuthRBSheet /> */}
    </>
  );
};

export default RootScreen;
