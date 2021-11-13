import { createActions } from 'reduxsauce';
import { fetchMyNoticeDetailInfo } from '@/Sagas/MySaga';

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
});

export const MyTypes = Types;
export default Creators;
