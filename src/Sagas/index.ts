import { takeLatest, all } from 'redux-saga/effects';
import { AuthTypes } from '@/Stores/Auth/Actions';
import { CommonTypes } from '@/Stores/Common/Actions';
import { HomeTypes } from '@/Stores/Home/Actions';
import { SearchTypes } from '@/Stores/Search/Actions';
import { NotificationTypes } from '@/Stores/Notification/Actions';
import { MyTypes } from '@/Stores/My/Actions';

// search
import { fetchSearchAreaList, fetchSearchBowlingClubList } from '@/Sagas/SearchSaga';

// common
import {
  fetchInitialHandler,
  fetchErrorHandler,
  fetchSkeletonNavigate,
  fetchSkeletonNavigateReplace,
} from './CommonSaga';

// home
import { fetchHomeList } from './HomeSaga';

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
  fetchMyProfilePatch,
} from '@/Sagas/MySaga';
import { fetchPlaceAroundList } from '@/Sagas/PlaceSaga';
import { PlaceTypes } from '@/Stores/Place/Actions';

export default function* root() {
  yield all([
    // common
    takeLatest(CommonTypes.FETCH_INITIAL_HANDLER, fetchInitialHandler),
    takeLatest(CommonTypes.FETCH_ERROR_HANDLER, fetchErrorHandler),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE, fetchSkeletonNavigate),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE_REPLACE, fetchSkeletonNavigateReplace),

    // home
    takeLatest(HomeTypes.FETCH_HOME_LIST, fetchHomeList),

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
    takeLatest(MyTypes.FETCH_MY_PROFILE_PATCH, fetchMyProfilePatch),

    // place
    takeLatest(PlaceTypes.FETCH_PLACE_AROUND_LIST, fetchPlaceAroundList),
  ]);
}
