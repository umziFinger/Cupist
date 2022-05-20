import { competitionTabType, myTabType, reservationTabType } from '@/Stores/My/InitialState';

export const MY_TAB_MENU: Array<myTabType> = [
  {
    title: '예약',
    selectKey: 'reservation',
  },
  {
    title: '리뷰',
    selectKey: 'review',
  },
  {
    title: '대회',
    selectKey: 'competition',
  },
];

export const MY_RESERVATION_TAB_MENU: Array<reservationTabType> = [
  { title: '진행중', key: 'before' },
  { title: '지난', key: 'after' },
  { title: '취소', key: 'cancel' },
];

export const MY_COMPETITION_TAB_MENU: Array<competitionTabType> = [
  { title: '진행중', key: 'doing' },
  { title: '지난', key: 'done' },
];
