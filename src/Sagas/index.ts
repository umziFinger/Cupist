import { all, takeLatest } from 'redux-saga/effects';
import { CommonTypes } from '@/Stores/Common/Actions';
import { HomeTypes } from '@/Stores/Home/Actions';

// search

// common
import {
  fetchErrorHandler,
  fetchInitialHandler,
  fetchSkeletonNavigate,
  fetchSkeletonNavigateReplace,
} from './CommonSaga';

// home
import {
  fetchIntroductionAdditionalList,
  fetchIntroductionAdditionalMoreList,
  fetchIntroductionCustomList,
  fetchIntroductionList,
  fetchProfile,
} from './HomeSaga';

// auth

// notification

// my

// albamon

export default function* root() {
  yield all([
    // common
    takeLatest(CommonTypes.FETCH_INITIAL_HANDLER, fetchInitialHandler),
    takeLatest(CommonTypes.FETCH_ERROR_HANDLER, fetchErrorHandler),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE, fetchSkeletonNavigate),
    takeLatest(CommonTypes.FETCH_SKELETON_NAVIGATE_REPLACE, fetchSkeletonNavigateReplace),

    // home
    takeLatest(HomeTypes.FETCH_INTRODUCTION_LIST, fetchIntroductionList),
    takeLatest(HomeTypes.FETCH_INTRODUCTION_ADDITIONAL_LIST, fetchIntroductionAdditionalList),
    takeLatest(HomeTypes.FETCH_INTRODUCTION_ADDITIONAL_MORE_LIST, fetchIntroductionAdditionalMoreList),
    takeLatest(HomeTypes.FETCH_INTRODUCTION_CUSTOM_LIST, fetchIntroductionCustomList),
    takeLatest(HomeTypes.FETCH_PROFILE, fetchProfile),
  ]);
}
