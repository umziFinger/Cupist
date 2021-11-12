import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Notification/InitialState';
import { NotificationTypes } from '@/Stores/Notification/Actions';

export const fetchNotificationReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'notificationList': {
        draft.notificationList.unread = data.notification.unread ? data.notification.unread : [];
        draft.notificationList.new = data.notification.new;
        draft.notificationList.readCnt = data.notification.readCnt;
        draft.notificationList.unreadCnt = data.notification.unreadCnt;
        if (actions.params.page === 1) {
          draft.notificationList.read = data.notification.read;
        } else {
          draft.notificationList.read =
            data.notification.read.length > 0
              ? draft.notificationList.read.concat(data.notification.read)
              : draft.notificationList.read;
        }
        break;
      }
      case 'notificationListPage': {
        draft.notificationListPage = data;
        break;
      }
      case 'notificationListInit': {
        draft.notificationList = INITIAL_STATE.notificationList;
        draft.notificationListPage = 1;
        draft.notificationCategory = INITIAL_STATE.notificationCategory;
        break;
      }
      case 'notificationConfirm': {
        draft.notificationConfirm = data;
        break;
      }
      case 'notificationCategory': {
        draft.notificationCategory = data;
        break;
      }

      default:
        return draft;
    }

    return draft;
  });
};
export const reducer = createReducer(INITIAL_STATE, {
  [NotificationTypes.FETCH_NOTIFICATION_REDUCER]: fetchNotificationReducer,
});
