export const INITIAL_STATE: NotificationState['notification'] = {
  notificationListPage: 1,
  notificationList: {
    read: [],
    unread: [],
    new: false,
    readCnt: 0,
    unreadCnt: 0,
  },
  notificationConfirm: 'N',
  notificationCategory: { name: '전체', category: 'all' },
};

export interface NotificationState {
  notification: {
    notificationListPage: number;
    notificationList: {
      read: any[];
      unread: any[];
      new: boolean;
      readCnt: number;
      unreadCnt: number;
    };
    notificationConfirm: string | 'N';
    notificationCategory: notificationType;
  };
}
export type notificationType =
  | { name: '전체'; category: 'all' }
  | { name: '예약'; category: 'reservation' }
  | { name: '리뷰'; category: 'review' }
  | { name: '이벤트'; category: 'event' }
  | { name: '고객센터'; category: 'cs' };
