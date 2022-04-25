import { takeLatest, takeEvery, all } from 'redux-saga/effects';
import { AuthTypes } from '@/Stores/Auth/Actions';
import { CommonTypes } from '@/Stores/Common/Actions';
import { HomeTypes } from '@/Stores/Home/Actions';
import { SearchTypes } from '@/Stores/Search/Actions';
import { NotificationTypes } from '@/Stores/Notification/Actions';
import { MyTypes } from '@/Stores/My/Actions';
import { PlaceTypes } from '@/Stores/Place/Actions';
import { ReservationTypes } from '@/Stores/Reservation/Actions';
import { AlbamonTypes } from '@/Stores/Albamon/Actions';

// search
import {
  fetchSearchAreaList,
  fetchSearchBowlingClubList,
  fetchSearchPopularList,
  fetchSearchRecentList,
  fetchSearchRecentListDelete,
  fetchSearchRecentListDeleteAll,
  fetchSearchRecentListPost,
} from '@/Sagas/SearchSaga';

// common
import {
  fetchInitialHandler,
  fetchErrorHandler,
  fetchSkeletonNavigate,
  fetchSkeletonNavigateReplace,
  fetchCommonPlaceDibsHandler,
  fetchCommonReport,
  fetchCommonCode,
} from './CommonSaga';

// home
import {
  fetchHomeList,
  fetchHomeDirectReservationList,
  fetchHomeFreeBowlingPlaceList,
  fetchHomePossibleDate,
  fetchHomeCheckEarly,
} from './HomeSaga';

// auth
import {
  fetchAuthSmsSend,
  fetchSmsAuth,
  fetchUserJoin,
  fetchUserLogin,
  fetchUserInfo,
  fetchUserLogout,
  fetchAuthFindPassword,
  fetchAuthSocialJoin,
  fetchAuthCheckEmail,
  fetchAuthSocialJoin2,
} from './AuthSaga';

// notification
import {
  fetchNotificationList,
  fetchNotificationRead,
  fetchNotificationCount,
  fetchNotificationDetailNavigate,
} from './NotificationSaga';

// my
import {
  fetchMyCouponList,
  fetchMyReviewList,
  fetchMyPushYN,
  fetchMySmsSend,
  fetchMyPlacePatch,
  fetchMyProfileImagePatch,
  fetchMyProfilePatch,
  fetchMyNoticeList,
  fetchMyNoticeDetailInfo,
  fetchMyEventList,
  fetchMyEventDetailInfo,
  fetchMyQnaList,
  fetchMyQnaWrite,
  fetchMyQnaDetailInfo,
  fetchMyNotificationPushYN,
  fetchMyMarketingPushYN,
  fetchMyEventPushYN,
  fetchMyWithdraw,
  fetchMyReservationList,
  fetchMyReservationDetailInfo,
  fetchMyReservationCancelDetailInfo,
  fetchMyReviewWrite,
  fetchMyReviewModify,
  fetchMyReviewDelete,
  fetchMyPasswordModify,
  fetchMyCouponAdd,
  fetchMyProfileRingme,
  fetchMyReservationCheckDetail,
} from '@/Sagas/MySaga';

import {
  fetchPlaceAroundList,
  fetchPlaceDetail,
  fetchPlaceRecentList,
  fetchPlaceReviewList,
  fetchPlaceSearchList,
  fetchPlaceTicketList,
  fetchPlaceList,
  fetchPlaceEventHotList,
  fetchPlaceDibsList,
  fetchPlaceEventHotDetail,
} from '@/Sagas/PlaceSaga';

import {
  fetchReservation,
  fetchReservationCardList,
  fetchReservationInfo,
  fetchReservationCancel,
  fetchReservationSimplePayment,
  fetchReservationCard,
  fetchReservationDeleteCard,
  fetchReservationPaymentSign,
  fetchReservationPaymentVerify,
  fetchReservationCertification,
} from '@/Sagas/ReservationSaga';

// albamon
import {
  fetchCompetitionsClubSearch,
  fetchCompetitionsPaymentVerify,
  fetchCompetitionsPlaceSearch,
  fetchCompetitionsRegist,
  fetchCompetitionsRegistInfo,
  fetchCompetitionsVerify,
} from '@/Sagas/AlbamonSaga';

export default function* root() {
  yield all([
    // common
    takeLatest(CommonTypes.FETCH_INITIAL_HANDLER, fetchInitialHandler),
    takeLatest(CommonTypes.FETCH_ERROR_HANDLER, fetchErrorHandler),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE, fetchSkeletonNavigate),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE_REPLACE, fetchSkeletonNavigateReplace),
    takeLatest(CommonTypes.FETCH_COMMON_PLACE_DIBS_HANDLER, fetchCommonPlaceDibsHandler),
    takeLatest(CommonTypes.FETCH_COMMON_REPORT, fetchCommonReport),
    takeLatest(CommonTypes.FETCH_COMMON_CODE, fetchCommonCode),

    // home
    takeLatest(HomeTypes.FETCH_HOME_LIST, fetchHomeList),
    takeLatest(HomeTypes.FETCH_HOME_DIRECT_RESERVATION_LIST, fetchHomeDirectReservationList),
    takeLatest(HomeTypes.FETCH_HOME_FREE_BOWLING_PLACE_LIST, fetchHomeFreeBowlingPlaceList),
    takeEvery(HomeTypes.FETCH_HOME_POSSIBLE_DATE, fetchHomePossibleDate),
    takeEvery(HomeTypes.FETCH_HOME_CHECK_EARLY, fetchHomeCheckEarly),

    // auth
    takeLatest(AuthTypes.FETCH_AUTH_SMS_SEND, fetchAuthSmsSend),
    takeLatest(AuthTypes.FETCH_SMS_AUTH, fetchSmsAuth),
    takeLatest(AuthTypes.FETCH_USER_JOIN, fetchUserJoin),
    takeLatest(AuthTypes.FETCH_USER_LOGIN, fetchUserLogin),
    takeLatest(AuthTypes.FETCH_USER_INFO, fetchUserInfo),
    takeLatest(AuthTypes.FETCH_USER_LOGOUT, fetchUserLogout),
    takeLatest(AuthTypes.FETCH_AUTH_FIND_PASSWORD, fetchAuthFindPassword),
    takeLatest(AuthTypes.FETCH_AUTH_SOCIAL_JOIN, fetchAuthSocialJoin),
    takeLatest(AuthTypes.FETCH_AUTH_CHECK_EMAIL, fetchAuthCheckEmail),
    takeLatest(AuthTypes.FETCH_AUTH_SOCIAL_JOIN2, fetchAuthSocialJoin2),

    // search
    takeLatest(SearchTypes.FETCH_SEARCH_AREA_LIST, fetchSearchAreaList),
    takeLatest(SearchTypes.FETCH_SEARCH_BOWLING_CLUB_LIST, fetchSearchBowlingClubList),
    takeLatest(SearchTypes.FETCH_SEARCH_RECENT_LIST, fetchSearchRecentList),
    takeLatest(SearchTypes.FETCH_SEARCH_RECENT_LIST_POST, fetchSearchRecentListPost),
    takeLatest(SearchTypes.FETCH_SEARCH_RECENT_LIST_DELETE, fetchSearchRecentListDelete),
    takeLatest(SearchTypes.FETCH_SEARCH_RECENT_LIST_DELETE_ALL, fetchSearchRecentListDeleteAll),
    takeLatest(SearchTypes.FETCH_SEARCH_POPULAR_LIST, fetchSearchPopularList),

    // notification
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_LIST, fetchNotificationList),
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_READ, fetchNotificationRead),
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_COUNT, fetchNotificationCount),
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_DETAIL_NAVIGATE, fetchNotificationDetailNavigate),

    // my
    takeLatest(MyTypes.FETCH_MY_REVIEW_LIST, fetchMyReviewList),
    takeLatest(MyTypes.FETCH_MY_COUPON_LIST, fetchMyCouponList),
    takeLatest(MyTypes.FETCH_MY_PUSH_YN, fetchMyPushYN),
    takeLatest(MyTypes.FETCH_MY_SMS_SEND, fetchMySmsSend),
    takeLatest(MyTypes.FETCH_MY_PLACE_PATCH, fetchMyPlacePatch),
    takeLatest(MyTypes.FETCH_MY_PROFILE_IMAGE_PATCH, fetchMyProfileImagePatch),
    takeLatest(MyTypes.FETCH_MY_PROFILE_PATCH, fetchMyProfilePatch),
    takeLatest(MyTypes.FETCH_MY_NOTICE_LIST, fetchMyNoticeList),
    takeLatest(MyTypes.FETCH_MY_NOTICE_DETAIL_INFO, fetchMyNoticeDetailInfo),
    takeLatest(MyTypes.FETCH_MY_EVENT_LIST, fetchMyEventList),
    takeLatest(MyTypes.FETCH_MY_EVENT_DETAIL_INFO, fetchMyEventDetailInfo),
    takeLatest(MyTypes.FETCH_MY_QNA_LIST, fetchMyQnaList),
    takeLatest(MyTypes.FETCH_MY_QNA_WRITE, fetchMyQnaWrite),
    takeLatest(MyTypes.FETCH_MY_QNA_DETAIL_INFO, fetchMyQnaDetailInfo),
    takeLatest(MyTypes.FETCH_MY_NOTIFICATION_PUSH_YN, fetchMyNotificationPushYN),
    takeLatest(MyTypes.FETCH_MY_MARKETING_PUSH_YN, fetchMyMarketingPushYN),
    takeLatest(MyTypes.FETCH_MY_EVENT_PUSH_YN, fetchMyEventPushYN),
    takeLatest(MyTypes.FETCH_MY_WITHDRAW, fetchMyWithdraw),
    takeLatest(MyTypes.FETCH_MY_RESERVATION_LIST, fetchMyReservationList),
    takeLatest(MyTypes.FETCH_MY_RESERVATION_DETAIL_INFO, fetchMyReservationDetailInfo),
    takeLatest(MyTypes.FETCH_MY_RESERVATION_CANCEL_DETAIL_INFO, fetchMyReservationCancelDetailInfo),
    takeLatest(MyTypes.FETCH_MY_REVIEW_WRITE, fetchMyReviewWrite),
    takeLatest(MyTypes.FETCH_MY_REVIEW_MODIFY, fetchMyReviewModify),
    takeLatest(MyTypes.FETCH_MY_REVIEW_DELETE, fetchMyReviewDelete),
    takeLatest(MyTypes.FETCH_MY_PASSWORD_MODIFY, fetchMyPasswordModify),
    takeLatest(MyTypes.FETCH_MY_COUPON_ADD, fetchMyCouponAdd),
    takeLatest(MyTypes.FETCH_MY_PROFILE_RINGME, fetchMyProfileRingme),
    takeLatest(MyTypes.FETCH_MY_RESERVATION_CHECK_DETAIL, fetchMyReservationCheckDetail),

    // place
    takeLatest(PlaceTypes.FETCH_PLACE_AROUND_LIST, fetchPlaceAroundList),
    takeLatest(PlaceTypes.FETCH_PLACE_SEARCH_LIST, fetchPlaceSearchList),
    takeLatest(PlaceTypes.FETCH_PLACE_DETAIL, fetchPlaceDetail),
    takeLatest(PlaceTypes.FETCH_PLACE_TICKET_LIST, fetchPlaceTicketList),
    takeLatest(PlaceTypes.FETCH_PLACE_RECENT_LIST, fetchPlaceRecentList),
    takeLatest(PlaceTypes.FETCH_PLACE_REVIEW_LIST, fetchPlaceReviewList),
    takeLatest(PlaceTypes.FETCH_PLACE_LIST, fetchPlaceList),
    takeLatest(PlaceTypes.FETCH_PLACE_EVENT_HOT_LIST, fetchPlaceEventHotList),
    takeLatest(PlaceTypes.FETCH_PLACE_DIBS_LIST, fetchPlaceDibsList),
    takeLatest(PlaceTypes.FETCH_PLACE_EVENT_HOT_DETAIL, fetchPlaceEventHotDetail),

    // reservation
    takeLatest(ReservationTypes.FETCH_RESERVATION_INFO, fetchReservationInfo),
    takeLatest(ReservationTypes.FETCH_RESERVATION, fetchReservation),
    takeLatest(ReservationTypes.FETCH_RESERVATION_CARD_LIST, fetchReservationCardList),
    takeLatest(ReservationTypes.FETCH_RESERVATION_CANCEL, fetchReservationCancel),
    takeLatest(ReservationTypes.FETCH_RESERVATION_SIMPLE_PAYMENT, fetchReservationSimplePayment),
    takeLatest(ReservationTypes.FETCH_RESERVATION_CARD, fetchReservationCard),
    takeLatest(ReservationTypes.FETCH_RESERVATION_DELETE_CARD, fetchReservationDeleteCard),
    takeLatest(ReservationTypes.FETCH_RESERVATION_PAYMENT_SIGN, fetchReservationPaymentSign),
    takeLatest(ReservationTypes.FETCH_RESERVATION_PAYMENT_VERIFY, fetchReservationPaymentVerify),
    takeLatest(ReservationTypes.FETCH_RESERVATION_CERTIFICATION, fetchReservationCertification),

    // albamon
    takeLatest(AlbamonTypes.FETCH_COMPETITIONS_REGIST_INFO, fetchCompetitionsRegistInfo),
    takeLatest(AlbamonTypes.FETCH_COMPETITIONS_REGIST, fetchCompetitionsRegist),
    takeLatest(AlbamonTypes.FETCH_COMPETITIONS_PAYMENT_VERIFY, fetchCompetitionsPaymentVerify),
    takeLatest(AlbamonTypes.FETCH_COMPETITIONS_PLACE_SEARCH, fetchCompetitionsPlaceSearch),
    takeLatest(AlbamonTypes.FETCH_COMPETITIONS_CLUB_SEARCH, fetchCompetitionsClubSearch),
    takeLatest(AlbamonTypes.FETCH_COMPETITIONS_VERIFY, fetchCompetitionsVerify),
  ]);
}
