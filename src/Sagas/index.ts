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
  fetchMyRefundBank,
  fetchMyCompetitionsList,
  fetchMyReservationReceipt,
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
import {
  fetchCompetitionsClubSearch,
  fetchCompetitionsPaymentVerify,
  fetchCompetitionsPlaceSearch,
  fetchCompetitionsRegist,
  fetchCompetitionsRegistInfo,
  fetchCompetitionsVerify,
} from '@/Sagas/AlbamonSaga';
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
  fetchIntroductionList,
  fetchIntroductionAdditionalList,
  fetchIntroductionAdditionalMoreList,
  fetchIntroductionCustomList,
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

// albamon

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
    takeLatest(HomeTypes.FETCH_INTRODUCTION_LIST, fetchIntroductionList),
    takeLatest(HomeTypes.FETCH_INTRODUCTION_ADDITIONAL_LIST, fetchIntroductionAdditionalList),
    takeLatest(HomeTypes.FETCH_INTRODUCTION_ADDITIONAL_MORE_LIST, fetchIntroductionAdditionalMoreList),
    takeLatest(HomeTypes.FETCH_INTRODUCTION_CUSTOM_LIST, fetchIntroductionCustomList),
  ]);
}
