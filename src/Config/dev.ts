const dev = {
  APP_MODE: 'dev',

  CS_NUMBER: '0507-1374-1929',
  CS_ADDRESS: '서울시 강남구 테헤란로 419, 1528호',
  CS_SELL_REPORT: '제2021-제주정방-19호',
  CS_COMPANY: '367-87-01771',
  CS_HEAD_OFFICE: '제주특별자치도 서귀포시 중정로 86, 3층 315호',
  CS_SEOUL_OFFICE: '서울시 강남구 테헤란로 419, 1528호',
  CS_EMAIL: 'nallcorp.luxury@gmail.com',
  CS_PRIVACY: '이인성',

  // API_URL: 'http://192.168.1.21:5000/',
  API_URL: 'https://api.bolimi.kr/',

  // 이미지 url
  IMAGE_URL: 'https://www.luxurynall.com/',

  // 자체 관리 rn 버전
  APP_VERSION: '1.0.0',

  // market url
  MARKET_URL_IOS: 'itms-apps://itunes.apple.com/kr/app/apple-store/id1587131376',
  MARKET_URL_ANDROID: 'market://details?id=com.luxurynall',

  // naver key
  NAVER_KEY: 'WfWT7ibYlhiet1ujlWo_',
  NAVER_SECRET: '4wti9stqdi',
  NAVER_APP_NAME: '럭셔리앤올',
  NAVER_APP_URL_SCHEME: 'com.luxurynall', // only for iOS

  // home
  HOME_URL: 'home',
  HOME_PLACE_URL: 'home/place',

  // auth
  AUTH_LOGIN_URL: 'auth/login',
  AUTH_LOGIN_SOCIAL_URL: 'auth/login/social',
  AUTH_LOGOUT_URL: 'auth/logout',
  AUTH_REFRESH_URL: 'auth/refresh',
  AUTH_SMS_SEND_URL: 'auth/sms-send',
  AUTH_SMS_AUTH_URL: 'auth/sms-auth',
  AUTH_JOIN_URL: 'auth/join',
  AUTH_FIND_PASSWORD_URL: 'auth/find-password',
  AUTH_RENEW_TOKEN_URL: 'auth/refresh',
  // my
  MY_URL: 'my',
  MY_PUSH_YN_URL: 'my/pushYN',
  MY_REVIEW: 'my/reviews',
  MY_MILEAGES: 'my/mileages',
  MY_PROMOTION_URL: 'my/promotion',
  MY_CERT_GET_URL: 'my/cert/get',
  MY_PROFILE_URL: 'my/profile',
  MY_VIEW_URL: 'my/view',
  MY_NOTIFICATION_URL: 'my/notification',
  MY_NOTICE_URL: 'my/notice',
  MY_EVENT_URL: 'my/event',
  MY_QNA_URL: 'my/qna',
  MY_NOTIFICATION_YN_URL: 'my/notification-push',
  MY_MARKETING_YN_URL: 'my/marketing-push',
  MY_EVENT_YN_URL: 'my/event-push',
  MY_WITHDRAW_URL: 'my/withdraw',
  MY_RESERVATION_URL: 'my/reservation',
  // search
  SEARCH_AREA_URL: 'search/area',
  SEARCH_URL: 'search',
  // user
  USER_URL: 'user',

  // notification
  NOTIFICATION_URL: 'notifications',
  NOTIFICATION_COUNT_URL: 'notifications/count',

  // main
  MAIN_REVIEWS: 'main/reviews',

  // restorations
  RESTORATIONS_URL: 'restorations',
  RESTORATIONS_REQ_URL: 'restorations/req', // 수선 요청 목록 (수선내역)
  RESTORATIONS_ING_URL: 'restorations/ing', // 수선 진행 목록 (수선내역)
  RESTORATIONS_RES_URL: 'restorations/res', // 수선 진행 목록 (내 명품 수선 내역)
  RESTORATIONS_CMP_URL: 'restorations/cmp', // 수선 완료 목록 (내 명품 수선 내역)
  RESTORATIONS_CCL_URL: 'restorations/ccl', // 수선 취소 목록 (내 명품 수선 내역)
  RESTORATIONS_PAYMENT_URL: 'restorations/payment',
  RESTORATIONS_PAYMENT_RESULT_URL: 'restorations/payment-result',
  RESTORATIONS_CHECK_STATE: 'restorations/checkstate',

  // util
  UTIL_RESTORETYPE_URL: 'restoretype',
  UTIL_BRAND_SEARCH_URL: 'brand/search',
  UTIL_PAY_TERMS_URL: 'pay/terms', // 수선 약관
  UTIL_CATEGORY_URL: 'category',
  UTIL_BRAND_LIST_URL: 'brand',
  UTIL_BRAND_FAV_URL: 'brand/fav',

  // place
  PLACE_URL: 'place', // 내주변/지역별 예약 가능한 볼링장 찾기
  PLACE_AROUND_LIST_URL: 'place/around',
  PLACE_SEARCH_LIST_URL: 'place/search', // 내주변/지역별 예약 가능한 볼링장 찾기
};

export default dev;
