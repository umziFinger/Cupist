const dev = {
  APP_MODE: 'dev',

  CS_COMPANY_NAME: '(주)볼링플러스',
  CS_ADDRESS: '경기도 광명시 일직로 12번길 22, 5층',
  CS_PRIVACY: '유재수',
  CS_COMPANY: '892-88-01731',
  CS_SELL_REPORT: '2021-경기광명-0188',
  CS_NUMBER: '070-4680-3267',
  CS_EMAIL: 'help@bolimi.kr',

  // iamport User Code
  USER_CODE: 'imp00301699',

  // NAVER MAP
  NMAP_MARKET_URL_IOS: 'itms-apps://itunes.apple.com/kr/app/네이버-지도-내비게이션/id311867728',
  NMAP_MARKET_URL_ANDROID: 'market://details?id=com.nhn.android.nmap',

  // TMAP
  TMAP_MARKET_URL_IOS: 'itms-apps://itunes.apple.com/kr/app/tmap-내비게이션-지도/id431589174',
  TMAP_MARKET_URL_ANDROID: 'market://details?id=com.skt.tmap.ku',

  // API_URL: 'http://192.168.0.12:5000/',
  API_URL: 'https://api.bolimi.kr/',

  // dynamicLink URL
  DYNAMIC_URL: 'https://link.bolimi.kr',

  // 자체 관리 rn 버전
  APP_VERSION: '1.0.0',

  // market url
  MARKET_URL_IOS: 'itms-apps://itunes.apple.com/kr/app/apple-store/id1596274166',
  MARKET_URL_ANDROID: 'market://details?id=kr.bolimi',

  // naver key
  NAVER_KEY: 'oRxO0Jqlo_XYVxcKk_1A',
  NAVER_SECRET: 'SOYTVQcWCq',
  NAVER_APP_NAME: '볼리미',
  NAVER_APP_URL_SCHEME: 'kr.bolimi', // only for iOS

  // home
  HOME_URL: 'home',
  HOME_PLACE_URL: 'home/place',
  HOME_EARLY_URL: 'home/early',
  HOME_CHECK_URL: 'home/check',
  HOME_CHECK_EARLY_URL: 'home/check/early',

  // auth
  AUTH_LOGIN_URL: 'auth/login',
  AUTH_LOGIN_SOCIAL_URL: 'auth/login/social', // 소셜 로그인/임시가입
  AUTH_LOGOUT_URL: 'auth/logout',
  AUTH_REFRESH_URL: 'auth/refresh',
  AUTH_SMS_SEND_URL: 'auth/sms-send',
  AUTH_SMS_AUTH_URL: 'auth/sms-auth',
  AUTH_JOIN_URL: 'auth/join',
  AUTH_FIND_PASSWORD_URL: 'auth/find-password',
  AUTH_RENEW_TOKEN_URL: 'auth/refresh',
  AUTH_JOIN_SOCIAL_URL: 'auth/join/social', // 동의 후 소셜 가입
  AUTH_JOIN_SOCIAL_URL2: 'auth/join-social', // 동의 후 소셜 가입
  AUTH_CHECK_EMAIL_URL: 'auth/check/email',

  // my
  MY_URL: 'my',
  MY_PUSH_YN_URL: 'my/pushYN',
  MY_REVIEW: 'my/review',
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
  MY_DIBS_URL: 'my/dibs',
  MY_PASSWORD_URL: 'my/password',

  NOTIFICATION_COUNT_URL: 'my/notification/count',

  // search
  SEARCH_AREA_URL: 'search/area',
  SEARCH_URL: 'search',
  SEARCH_QUERY_URL: 'search/searchQuery',
  SEARCH_POPULAR_URL: 'search/popular',

  // user
  USER_URL: 'user',

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
  PLACE_URL: 'place',
  PLACE_AROUND_LIST_URL: 'place/around',
  PLACE_SEARCH_LIST_URL: 'place/search', // 내주변/지역별 예약 가능한 볼링장 찾기

  // reservation
  RESERVATION_URL: 'reservation',
  RESERVATION_CARD_URL: 'reservation/card',
  RESERVATION_CANCEL_URL: 'reservation/cancel',
  RESERVATION_PAYMENT_CARD_URL: 'reservation/payment/card',
  RESERVATION_PAYMENT_SIGN_URL: 'reservation/payment/sign',
  RESERVATION_PAYMENT_VERIFY_URL: 'reservation/payment/verify',
  RESERVATION_CERTIFICATION_URL: 'reservation/certification',
};

export default dev;
