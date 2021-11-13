import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchMyReducer: ['params'],
  fetchMyReviewList: ['params'],
  fetchMyCouponList: ['params'],
  fetchMyPushYN: ['params'],
  fetchMyUserInfoPatch: ['params'],
  fetchMyPointList: ['params'], // 내 마일리지 현황
  fetchMySmsSend: ['params'],
  fetchMyPlacePatch: ['params'],
  fetchMyProfilePatch: ['params'],
  fetchMyProfileImagePatch: ['params'],
  fetchMyNoticeList: ['params'],
  fetchMyNoticeDetailInfo: ['params'],
  fetchMyEventList: ['params'],
  fetchMyEventDetailInfo: ['params'],
  fetchMyQnaList: ['params'],
  fetchMyQnaWrite: ['params'],
  fetchMyQnaDetailInfo: ['params'],
});

export const MyTypes = Types;
export default Creators;
