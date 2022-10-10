import React, { useEffect } from 'react';
import { LogBox, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import RootNavigator from '@/Navigators/RootNavigator';
import Dialog from '@/Components/Dialog';
import Toast from '@/Components/Toast';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';

// import { FirebaseTokenUpdate } from '@/Components/Firebase/messaging';

LogBox.ignoreLogs([
  'interpolate() was renamed to interpolateNode()',
  'Easing was renamed to EasingNode in Reanimated 2.',
  'If you want to use Reanimated 2 then go through our installation steps',
  'Warning: Overriding previous layout animation with new one before the first began',
  'new NativeEventEmitter()',
  'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format',
  'Deprecation warning: moment().add(period, number) is deprecated',
  'Method has been deprecated. Please instead use `remove()`',
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
  } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    // dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'N' }));
    AsyncStorage.getItem('splashStatus').then((r) => console.log('rootscreen splashStatus', r));
    dispatch(CommonActions.fetchInitialHandler());
    saveBottomHeight();
    return () => {
      dispatch(CommonActions.fetchInitialHandler());
    };
  }, []);

  const saveBottomHeight = () => {
    const statusHeight = getStatusBarHeight(true);
    const headerMenuHeight = 68;
    let bottomBarHeight, tabBarBottomHeight;

    if (Platform.OS === 'android') {
      bottomBarHeight = 0;
      tabBarBottomHeight = 70;
    } else if (isIphoneX()) {
      bottomBarHeight = getBottomSpace();
      tabBarBottomHeight = 90;
    } else {
      bottomBarHeight = 0;
      tabBarBottomHeight = 70;
    }

    const mainBottomHeight = statusHeight + bottomBarHeight + headerMenuHeight + tabBarBottomHeight;
    const subBottomHeight = statusHeight + bottomBarHeight + headerMenuHeight;

    const info = {
      mainBottomHeight,
      subBottomHeight,
      fixBottomHeight: bottomBarHeight,
      tabBarBottomHeight,
      statusHeight,
    };
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'heightInfo',
        data: { info },
      }),
    );
  };

  return (
    <>
      <RootNavigator />
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
      {/** 앱버전체크(realDB) 리스너 컴포넌트 * */}
      {/* <RootCheckAppVersion /> */}
      {/* <RootDynamicLink /> */}
    </>
  );
};

export default RootScreen;
