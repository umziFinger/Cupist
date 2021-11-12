export const INITIAL_STATE: NotificationState['notification'] = {
  notificationListPage: 1,
  notificationList: {
    read: [],
    unread: [],
  },
  notificationConfirm: 'N',
  notificationCategory: 'all',
};

export interface NotificationState {
  notification: {
    notificationListPage: number;
    notificationList: {
      read: any[];
      unread: any[];
    };
    notificationConfirm: string | 'N';
    notificationCategory: notificationType;
  };
}
export type notificationType = 'all' | 'reservation' | 'review' | 'event' | 'cs';
