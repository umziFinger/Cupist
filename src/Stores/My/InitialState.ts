export const INITIAL_STATE: MyState['my'] = {
  myReviewPage: 1,
  myReviewList: [],
  myCouponPage: 1,
  myCouponList: [],
  myPointList: [],
  myPointListPage: 1,
  total_mileage: 0,
  moreScreenRenderItem: [
    {
      title: '내 프로필 관리',
      icon: require('@/Assets/Images/More/icPlusProfile.png'),
      screen: 'ProfileSettingScreen',
    },
    { title: '내 알림', screen: 'NotificationScreen' },
    { title: '최근 본 볼링장', screen: 'RecentPlaceScreen' },
    { title: '공지사항', icon: require('@/Assets/Images/More/icPlusNotice.png'), screen: 'NoticeScreen' },
    { title: '이벤트', icon: require('@/Assets/Images/More/icPlusEvent.png'), screen: 'EventScreen' },
    { title: '고객센터', icon: require('@/Assets/Images/More/icPlusCustomer.png'), screen: 'QnaScreen' },
    { title: '서비스설정', icon: require('@/Assets/Images/More/icPlusSetup.png'), screen: 'MyProfileScreen' },
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
};
export interface MyState {
  my: {
    myReviewPage: number;
    myReviewList: any[];
    myCouponPage: number;
    myCouponList: any[];
    myPointList: any[];
    myPointListPage: number;
    total_mileage: number;
    moreScreenRenderItem: Array<{ title: string; icon?: any; screen: string }>;
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
  };
}
export type qnaType =
  | { key: '앱 사용 문의'; content: '앱 사용 문의' }
  | { key: '예약 문의'; content: '예약 문의' }
  | { key: '결제/환불 문의'; content: '결제 / 환불 문의' }
  | { key: '취소 문의'; content: '취소 문의' }
  | { key: '기타 문의'; content: '기타 문의' };

export type qnaTabType = { name: '문의내역'; key: 'list' } | { name: '문의하기'; key: 'write' };
