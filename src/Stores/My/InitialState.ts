import { MainStackParamList } from '@/Navigators/MainNavigator';

export const INITIAL_STATE: MyState['my'] = {
  myReviewPage: 1,
  myReviewList: {
    writeReview: [],
    writeableReview: [],
  },

  myPointList: [],
  myPointListPage: 1,
  total_mileage: 0,
  moreScreenRenderItem: [
    {
      title: '내 프로필 관리',
      icon: require('@/Assets/Images/More/icPlusProfile.png'),
      screen: 'ProfileSettingScreen',
    },
    { title: '내 쿠폰함', screen: 'MyCouponScreen' },
    { title: '내 알림', screen: 'NotificationScreen' },
    { title: '최근 본 볼링장', screen: 'RecentPlaceScreen' },
    {
      title: '환불계좌관리',
      icon: require('@/Assets/Images/Arrow/icArrowRi.png'),
      screen: 'RefundAccountManagementScreen',
    },
    { title: '공지사항', icon: require('@/Assets/Images/More/icPlusNotice.png'), screen: 'NoticeScreen' },
    { title: '이벤트', icon: require('@/Assets/Images/More/icPlusEvent.png'), screen: 'EventScreen' },
    { title: '고객센터', icon: require('@/Assets/Images/More/icPlusCustomer.png'), screen: 'QnaScreen' },
    { title: '서비스설정', icon: require('@/Assets/Images/More/icPlusSetup.png'), screen: 'ServiceSettingScreen' },
  ],
  myNoticeList: [],
  myNoticeListPage: 1,
  myNoticeDetail: null,
  myEventList: [],
  myEventListPage: 1,
  myEventDetail: null,
  qnaSelectedTab: { name: '문의내역', key: 'list' },
  myQnaList: [],
  myQnaListPage: 1,
  myQnaDetail: null,
  writeQnaContent: '',
  writeQnaValid: false,
  qnaType: { key: '앱 사용 문의', content: '앱 사용 문의' },
  mySelectedTab: { title: '예약', selectKey: 'reservation' },
  reservationList: { before: [], after: [], cancel: [] },
  reservationListPage: { before: 1, after: 1, cancel: 1 },
  reservationSelectedTab: { title: '진행중', key: 'before' },
  reservationDetail: null,
  reservationCancelDetail: null,
  writeReviewInfo: {
    paymentIdx: 0,
    placeIdx: 0,
    placeName: '',
    ticketName: '',
    star: 0,
    content: '',
    files: '',
  }, // 작성 가능한 리뷰 데이터 담는 곳
  clickedReviewItem: null,
  couponSelectedTab: { title: '사용가능', key: 'usable' },

  expiredCouponPage: 1,
  usableCouponPage: 1,
  myCouponList: {
    coupon: [],
    metadata: [],
  },
  selectedCouponGuide: null,
  ringmeList: [],
  isCheckedReservationDetail: false,
  bankList: [],
};
export interface MyState {
  my: {
    myReviewPage: number;
    myReviewList: {
      writeReview: any[];
      writeableReview: any[];
    };
    myPointList: any[];
    myPointListPage: number;
    total_mileage: number;
    moreScreenRenderItem: Array<{ title: string; icon?: any; screen: keyof MainStackParamList }>;
    myNoticeList: any[];
    myNoticeListPage: number;
    myNoticeDetail: any;
    myEventList: any[];
    myEventListPage: number;
    myEventDetail: any;
    qnaSelectedTab: qnaTabType;
    myQnaList: any[];
    myQnaListPage: number;
    myQnaDetail: any;
    writeQnaContent: string;
    writeQnaValid: boolean;
    qnaType: qnaType;
    mySelectedTab: myTabType;
    reservationList: {
      before: any[];
      after: any[];
      cancel: any[];
    };
    reservationListPage: reservationPageType;
    reservationSelectedTab: reservationTabType;
    reservationDetail: any;
    reservationCancelDetail: any;
    writeReviewInfo: {
      paymentIdx: number;
      placeIdx: number;
      placeName: string;
      ticketName: string;
      star: number;
      content: string;
      files: any;
    };
    clickedReviewItem: any;
    couponSelectedTab: CouponTabType;
    myCouponList: CouponListType;
    expiredCouponPage: number;
    usableCouponPage: number;

    selectedCouponGuide: CouponItemType | null;
    ringmeList: any[];
    isCheckedReservationDetail: boolean | false;
    bankList: any;
  };
}
export interface CouponItemType {
  idx: number;
  expireDate: string;
  useDate: string;
  useYN: TypeYN;
  regDate: string;
  updateDate: string;
  deleteDate: string;
  Coupon: {
    idx: number;
    type: string;
    startDate: string;
    endDate: string;
    title: string;
    price: number;
    period: number;
    usePrice: number;
    useTerms: string;
    notice: string;
    public: string;
    regDate: string;
    updateDate: string;
    deleteDate: string;
  };
  useDateView: string;
  status: string;
}

export interface CouponListType {
  coupon: Array<CouponItemType>;
  metadata: Array<{ expiredCnt: number; usableCnt: number }>;
}

type TypeYN = 'Y' | 'N';

export type qnaType =
  | { key: '앱 사용 문의'; content: '앱 사용 문의' }
  | { key: '예약 문의'; content: '예약 문의' }
  | { key: '결제/환불 문의'; content: '결제 / 환불 문의' }
  | { key: '취소 문의'; content: '취소 문의' }
  | { key: '기타 문의'; content: '기타 문의' };

export type qnaTabType = { name: '문의내역'; key: 'list' } | { name: '문의하기'; key: 'write' };
export type myTabType = { title: '예약'; selectKey: 'reservation' } | { title: '리뷰'; selectKey: 'review' };
export type reservationTabType =
  | { title: '진행중'; key: 'before' }
  | { title: '지난'; key: 'after' }
  | { title: '취소'; key: 'cancel' };
export type reservationPageType = { before: 1; after: 1; cancel: 1 };
export type CouponTabType = { title: '사용가능'; key: 'usable' } | { title: '지난쿠폰'; key: 'expired' };
