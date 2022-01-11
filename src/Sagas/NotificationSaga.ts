import { call, put } from 'redux-saga/effects';
import { Platform } from 'react-native';
import BadgeAndroid from 'react-native-android-badge';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import CommonActions from '@/Stores/Common/Actions';
import NotificationActions from '@/Stores/Notification/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import { navigate, navigateAndReset, navigateAndSimpleReset } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';

export function* fetchNotificationList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.MY_NOTIFICATION_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(
        NotificationActions.fetchNotificationReducer({
          type: 'notificationList',
          data: response.data,
          page: data.params.page,
        }),
      );
      yield put(
        NotificationActions.fetchNotificationReducer({ type: 'notificationListPage', data: data.params.page + 1 }),
      );
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchNotificationList : ', e);
  }
}

export function* fetchNotificationRead(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.MY_NOTIFICATION_URL}/${data.params.idx}`,
    };

    const response = yield call(Axios.PATCH, payload);
    console.log('알림 읽음: ', response);
    if (response.result === true && response.code === null) {
      // const params = {
      //   page: 1,
      // };
      // yield put(NotificationActions.fetchNotificationList(params));
      yield put(NotificationActions.fetchNotificationDetailNavigate(data.params));
      // yield put(NotificationActions.fetchNotificationCount());
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchNotificationCheck : ', e);
  }
}

export function* fetchNotificationCount(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.NOTIFICATION_COUNT_URL}`,
    };

    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      const { noticount } = response.data;
      console.log('##### Badge Count Update ###### -> ', noticount);
      if (Platform.OS === 'android') {
        BadgeAndroid.setBadge(Number(noticount));
      } else if (Platform.OS === 'ios') {
        PushNotificationIOS.setApplicationIconBadgeNumber(Number(noticount));
      }

      if (noticount === 0) {
        yield put(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'Y' }));
      } else {
        yield put(NotificationActions.fetchNotificationReducer({ type: 'notificationConfirm', data: 'N' }));
      }
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchNotificationCount : ', e);
  }
}

export function* fetchNotificationDetailNavigate(data: any): any {
  try {
    const { category, type } = data.params;

    if (category) {
      if (category === 'reservation') {
        if (type === 'done')
          yield put(
            MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '진행중', key: 'before' } }),
          );
        if (type === 'cancel')
          yield put(
            MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '취소', key: 'cancel' } }),
          );
        if (type === 'wait')
          yield put(
            MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '진행중', key: 'before' } }),
          );
        navigate('MyScreen');
      }
      if (category === 'review') {
        yield put(MyActions.fetchMyReducer({ type: 'mySelectedTab', data: { title: '리뷰', selectKey: 'review' } }));
        navigate('MyScreen');
      }
    } else {
      navigate('HomeScreen');
    }
  } catch (e) {
    console.log('occurred Error...fetchNotificationDetailNavigate : ', e);
  }
}

function* moveScreen(item: any) {
  console.log('category! : ', item);
  const { type, category } = item;
  if (category) {
    if (category === 'reservation') {
      if (type === 'done')
        // yield put(MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '지난', key: 'after' } }));
        yield put(
          MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '진행중', key: 'before' } }),
        );
      if (type === 'cancel')
        yield put(MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '취소', key: 'cancel' } }));
      if (type === 'wait')
        yield put(
          MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '진행중', key: 'before' } }),
        );
      console.log('스크린 이동2 : ', category);
      return navigate('MyScreen');
    }
    if (category === 'review') {
      yield put(MyActions.fetchMyReducer({ type: 'mySelectedTab', data: { title: '리뷰', selectKey: 'review' } }));
      console.log('스크린 이동2 : ', category);
      return navigate('MyScreen');
    }
  }
  return navigate('HomeScreen');
}
