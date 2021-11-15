import { myTabType, reservationTabType } from '@/Stores/My/InitialState';

export const MY_TAB_MENU: Array<myTabType> = [
  {
    title: '예약',
    selectKey: 'reservation',
  },
  {
    title: '리뷰',
    selectKey: 'review',
  },
];

export const MY_RESERVATION_TAB_MENU: Array<reservationTabType> = [
  { title: '진행중', key: 'before' },
  { title: '지난', key: 'after' },
  { title: '취소', key: 'cancel' },
];
