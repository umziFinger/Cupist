import { notificationType } from '@/Stores/Notification/InitialState';

export const NOTIFICATION_CATEGORY: Array<notificationType> = [
  { name: '전체', category: 'all' },
  { name: '예약', category: 'reservation' },
  { name: '리뷰', category: 'review' },
  { name: '이벤트', category: 'event' },
  { name: '고객센터', category: 'cs' },
];
