export const INITIAL_STATE: NotificationState['notification'] = {
  notificationListPage: 1,
  notificationList: [],
  notificationConfirm: 'N',
};
export interface NotificationState {
  notification: {
    notificationListPage: number;
    notificationList: any;
    notificationConfirm: string | 'N';
  };
}
