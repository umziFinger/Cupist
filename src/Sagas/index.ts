import { takeLatest, all } from 'redux-saga/effects';
import { AuthTypes } from '@/Stores/Auth/Actions';
import { CommonTypes } from '@/Stores/Common/Actions';
import { HomeTypes } from '@/Stores/Home/Actions';
import { SearchTypes } from '@/Stores/Search/Actions';
import { NotificationTypes } from '@/Stores/Notification/Actions';
import { MyTypes } from '@/Stores/My/Actions';
import { PlaceTypes } from '@/Stores/Place/Actions';

// search
import { fetchSearchAreaList, fetchSearchBowlingClubList } from '@/Sagas/SearchSaga';

// common
import {
  fetchInitialHandler,
  fetchErrorHandler,
  fetchSkeletonNavigate,
  fetchSkeletonNavigateReplace,
  fetchCommonPlaceDibsHandler,
} from './CommonSaga';

// home
import { fetchHomeList, fetchHomeDirectReservationList } from './HomeSaga';

// auth
import {
  fetchAuthSmsSend,
  fetchSmsAuth,
  fetchUserJoin,
  fetchUserLogin,
  fetchUserInfo,
  fetchUserLogout,
  fetchAuthTerms,
  fetchAuthFindId,
  fetchAuthFindPassword,
  fetchAuthSocialJoin,
} from './AuthSaga';

// notification
import { fetchNotificationList, fetchNotificationRead, fetchNotificationCount } from './NotificationSaga';

// my
import {
  fetchMyCouponList,
  fetchMyReviewList,
  fetchMyPushYN,
  fetchMyUserInfoPatch,
  fetchMyPointList,
  fetchMySmsSend,
  fetchMyPlacePatch,
  fetchMyModifyProfileImage,
  fetchMyProfileImagePatch,
  fetchMyProfilePatch,
} from '@/Sagas/MySaga';

import {
  fetchPlaceAroundList,
  fetchPlaceDetail,
  fetchPlaceRecentList,
  fetchPlaceSearchList,
  fetchPlaceTicketList,
} from '@/Sagas/PlaceSaga';

export default function* root() {
  yield all([
    // common
    takeLatest(CommonTypes.FETCH_INITIAL_HANDLER, fetchInitialHandler),
    takeLatest(CommonTypes.FETCH_ERROR_HANDLER, fetchErrorHandler),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE, fetchSkeletonNavigate),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE_REPLACE, fetchSkeletonNavigateReplace),
    takeLatest(CommonTypes.FETCH_COMMON_PLACE_DIBS_HANDLER, fetchCommonPlaceDibsHandler),

    // home
    takeLatest(HomeTypes.FETCH_HOME_LIST, fetchHomeList),
    takeLatest(HomeTypes.FETCH_HOME_DIRECT_RESERVATION_LIST, fetchHomeDirectReservationList),

    // auth
    takeLatest(AuthTypes.FETCH_AUTH_SMS_SEND, fetchAuthSmsSend),
    takeLatest(AuthTypes.FETCH_SMS_AUTH, fetchSmsAuth),
    takeLatest(AuthTypes.FETCH_AUTH_SOCIAL_JOIN, fetchAuthSocialJoin),
    takeLatest(AuthTypes.FETCH_USER_JOIN, fetchUserJoin),
    takeLatest(AuthTypes.FETCH_USER_LOGIN, fetchUserLogin),
    takeLatest(AuthTypes.FETCH_USER_INFO, fetchUserInfo),
    takeLatest(AuthTypes.FETCH_USER_LOGOUT, fetchUserLogout),
    takeLatest(AuthTypes.FETCH_AUTH_TERMS, fetchAuthTerms),
    takeLatest(AuthTypes.FETCH_AUTH_FIND_ID, fetchAuthFindId),
    takeLatest(AuthTypes.FETCH_AUTH_FIND_PASSWORD, fetchAuthFindPassword),

    // search
    takeLatest(SearchTypes.FETCH_SEARCH_AREA_LIST, fetchSearchAreaList),
    takeLatest(SearchTypes.FETCH_SEARCH_BOWLING_CLUB_LIST, fetchSearchBowlingClubList),

    // notification
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_LIST, fetchNotificationList),
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_READ, fetchNotificationRead),
    takeLatest(NotificationTypes.FETCH_NOTIFICATION_COUNT, fetchNotificationCount),

    // my
    takeLatest(MyTypes.FETCH_MY_REVIEW_LIST, fetchMyReviewList),
    takeLatest(MyTypes.FETCH_MY_COUPON_LIST, fetchMyCouponList),
    takeLatest(MyTypes.FETCH_MY_PUSH_YN, fetchMyPushYN),
    takeLatest(MyTypes.FETCH_MY_USER_INFO_PATCH, fetchMyUserInfoPatch),
    takeLatest(MyTypes.FETCH_MY_POINT_LIST, fetchMyPointList),
    takeLatest(MyTypes.FETCH_MY_SMS_SEND, fetchMySmsSend),
    takeLatest(MyTypes.FETCH_MY_PLACE_PATCH, fetchMyPlacePatch),
    takeLatest(MyTypes.FETCH_MY_PROFILE_IMAGE_PATCH, fetchMyProfileImagePatch),
    takeLatest(MyTypes.FETCH_MY_PROFILE_PATCH, fetchMyProfilePatch),

    // place
    takeLatest(PlaceTypes.FETCH_PLACE_AROUND_LIST, fetchPlaceAroundList),
    takeLatest(PlaceTypes.FETCH_PLACE_SEARCH_LIST, fetchPlaceSearchList),
    takeLatest(PlaceTypes.FETCH_PLACE_DETAIL, fetchPlaceDetail),
    takeLatest(PlaceTypes.FETCH_PLACE_TICKET_LIST, fetchPlaceTicketList),
    takeLatest(PlaceTypes.FETCH_PLACE_RECENT_LIST, fetchPlaceRecentList),
  ]);
}
