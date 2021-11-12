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
    { title: '이벤트', icon: require('@/Assets/Images/More/icPlusEvent.png'), screen: 'MyProfileScreen' },
    { title: '고객센터', icon: require('@/Assets/Images/More/icPlusCustomer.png'), screen: 'MyProfileScreen' },
    { title: '서비스설정', icon: require('@/Assets/Images/More/icPlusSetup.png'), screen: 'MyProfileScreen' },
  ],
  myNoticeList: [],
  myNoticeListPage: 1,
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
  };
}
