import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Notification/InitialState';
import { NotificationTypes } from '@/Stores/Notification/Actions';

export const fetchNotificationReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'notificationList': {
        if (actions.params.page === 1) {
          if (data.notification.data?.length > 0) {
            draft.notificationList = data.notification.data;
          } else {
            draft.notificationList = '';
          }
        } else {
          draft.notificationList =
            data.notification.data.length > 0
              ? draft.notificationList.concat(data.notification.data)
              : draft.notificationList;
        }
        break;
      }
      case 'notificationListPage': {
        draft.notificationListPage = data;
        break;
      }
      case 'notificationListInit': {
        draft.notificationList = '';
        draft.notificationListPage = 1;
        break;
      }
      case 'notificationConfirm': {
        console.log('call reducer notificationConfirm : ', data);
        draft.notificationConfirm = data;
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
