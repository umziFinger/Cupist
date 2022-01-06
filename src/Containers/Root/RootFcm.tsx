import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BadgeAndroid from 'react-native-android-badge';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '@/Services/NavigationService';
import NotificationActions from '@/Stores/Notification/Actions';
import { HomeState } from '@/Stores/Home/InitialState';
import MyActions from '@/Stores/My/Actions';

const RootFcm = () => {
  const dispatch = useDispatch();
  const { isHomeLoaded } = useSelector((state: HomeState) => state.home);
  const [moveScreenParams, setMoveScreenParams] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('splashStatus').then((value) => {
      console.log('Root Fcm isHomeLoaded : ', isHomeLoaded, value);
      if (isHomeLoaded && value === 'end') {
        dispatch(NotificationActions.fetchNotificationDetailNavigate(moveScreenParams));
        setMoveScreenParams(null);
      }
    });
    // console.log('FCM DIDUPDATE isHomeLoaded : ', isHomeLoaded);
    // console.log('FCM DIDUPDATE moveScreenParams : ', moveScreenParams);
    // if (isHomeLoaded && moveScreenParams) {
    //   dispatch(NotificationActions.fetchNotificationDetailNavigate(moveScreenParams));
    //   setMoveScreenParams(null);
    // }
  }, [isHomeLoaded]);

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
    const badgeCnt = message?.data?.badge || 0;

    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'N' }));

    // 알림 뱃지 업데이트
    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(Number(badgeCnt));
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(badgeCnt));
    }

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
    const badgeCnt = message?.data?.badge || 0;

    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(Number(badgeCnt));
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(badgeCnt));
    }

    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'N' }));
  };

  const onMessageBackgroundReceivedWithMoveScreen = (message: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('notification (background) with move screen!', JSON.stringify(message));
    // dispatch(NotificationActions.fetchNotificationCount());

    const category = message?.data?.category;
    const type = message?.data?.type;
    const pushIdx = message?.data?.idx;
    const badgeCnt = message?.data?.badge || 0;

    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(Number(badgeCnt));
    } else if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(Number(badgeCnt));
    }

    const params = {
      idx: pushIdx,
      category,
      type,
    };

    setMoveScreenParams(params);

    // 읽음 처리
    // dispatch(NotificationActions.fetchNotificationDetailNavigate(params));
    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'Y' }));
  };

  return null;
};

export default RootFcm;
