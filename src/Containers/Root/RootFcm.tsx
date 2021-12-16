import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BadgeAndroid from 'react-native-android-badge';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { navigate } from '@/Services/NavigationService';
import NotificationActions from '@/Stores/Notification/Actions';
import { HomeState } from '@/Stores/Home/InitialState';

const RootFcm = () => {
  const dispatch = useDispatch();
  // const { isHomeLoaded } = useSelector((state: HomeState) => state.home);
  // const [moveScreenParams, setMoveScreenParams] = useState<any>(null);
  //
  // useEffect(() => {
  //   console.log('Root Fcm isHomeLoaded : ', isHomeLoaded);
  //   if (isHomeLoaded) {
  //     moveScreen(moveScreenParams);
  //     setMoveScreenParams(null);
  //   }
  // }, [isHomeLoaded]);

  useEffect(() => {
    // 포그라운드
    messaging().onMessage(onMessageReceived);

    // 백그라운드
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('remoteMessage : ', remoteMessage);
      if (remoteMessage) {
        await onMessageBackgroundReceived(remoteMessage);
      }
    });

    // 앱이 백그라운드였다가 알람 누르고 앱 켜질때
    messaging().onNotificationOpenedApp(onMessageBackgroundReceivedWithMoveScreen);

    // 앱이 종료상태에서 알림 놀렀을때 이벤트
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          await onMessageBackgroundReceivedWithMoveScreen(remoteMessage);
        }
      })
      .catch((e) => {
        console.log('getInitialNotification', e);
      });
  }, []);

  const onMessageReceived = (message: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('notifications : ', JSON.stringify(message));
    // dispatch(NotificationActions.fetchNotificationCount());
    /* const badgeCnt = message?.data?.badge || 0;
    const category = message?.data?.category || 'info';

    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'N' }));
    if (category === 'my') {
      dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationNewConfirm', data: 'N' }));
    }

    // 알림 뱃지 업데이트
    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(Number(badgeCnt));
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(badgeCnt));
    } */

    /* Todo 포그라운드때 알림오면 띄어주는 화면 호출 로직 작업예정 */
    // const title = json.data.title ? message.data.title : '';
    // const content = message.notification.body ? message.notification.body : '';
    // const params = {
    //   toggle: true,
    //   item: {
    //     title,
    //     content,
    //     idx: message?.data?.idx,
    //   },
    // };
    // dispatch(CommonActions.fetchCommonReducer({ type: 'fcmAlert', data: { fcmAlert: params } }));
  };

  const onMessageBackgroundReceived = (message: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('notification (background)', JSON.stringify(message));
    // dispatch(NotificationActions.fetchNotificationCount());
    /* const badgeCnt = message?.data?.badge || 0;
    const category = message?.data?.category || 'info';

    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(Number(badgeCnt));
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(badgeCnt));
    }

    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'N' }));
    if (category === 'my') {
      dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationNewConfirm', data: 'N' }));
    } */
  };

  const onMessageBackgroundReceivedWithMoveScreen = (message: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('notification (background) with move screen!', JSON.stringify(message));
    navigate('HomeScreen');
    // dispatch(NotificationActions.fetchNotificationCount());
    //
    // const params = {
    //   type: message?.data?.type,
    //   typeIdx: message?.data?.type_idx,
    //   state: message?.data?.state,
    // };
    //
    // setMoveScreenParams(params);

    /* const type = message?.data?.type;
    const json = message?.data?.json;
    const pushIdx = message?.data?.idx;
    const category = message?.data?.category;
    const badgeCnt = message?.data?.badge || 0;

    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(Number(badgeCnt));
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(badgeCnt));
    }

    // 페이지 이동
    // moveScreen({ type, json });

    const params = {
      idx: pushIdx,
      category,
      type,
      json,
    };

    // 읽음 처리
    dispatch(NotificationActions.fetchNotificationDetailNavigate(params));
    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'Y' })); */
  };

  const moveScreen = (data: any) => {
    console.log('####### fcm moveScreen data : ', data);
    const type = data?.type;
    const typeIdx = data?.typeIdx;
    const state = data?.state;

    try {
      if (type) {
        if (type === 'restoration') {
          if (Number(typeIdx) === 0) {
            return navigate('RepairHistoryScreen');
          }

          if (Number(typeIdx) !== 0) {
            if (state === 'SRSE') {
              return navigate('RepairDetailScreen', { rstr_no: typeIdx });
            }
            if (state === 'QARQ') {
              return navigate('RepairCheckScreen', { rstr_no: typeIdx });
            }
            return navigate('RepairHistoryDetailScreen', { rstr_no: typeIdx });
          }
        }
      }

      return navigate('HomeScreen');

      // if (type === 'rental') {
      //   if (typeIdx === 0) {
      //     return navigate('RentHistoryScreen');
      //   }
      //   return navigate('RentHistoryDetailScreen', { payment_no: typeIdx });
      // }
      // if (type === 'join') {
      // }
      // if (type === 'home') {
      // }
      // if (type === 'review') {
      // }
      // if (type === 'promotion') {
      //   if (typeIdx === 0) {
      //     return navigate('`MyCouponScreen`');
      //   }
      //   return navigate('MyCouponDetailScreen', { promotion_no: typeIdx });
      // }
    } catch (e) {
      return navigate('HomeScreen');
    }
  };

  return null;
};
export default RootFcm;
