import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchNotificationReducer: ['params'],
  fetchNotificationList: ['params'],
  fetchNotificationRead: ['params'],
  fetchNotificationCount: ['params'],
  fetchNotificationDetailNavigate: ['params'],
});

export const NotificationTypes = Types;
export default Creators;
