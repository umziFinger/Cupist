import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchMyReducer: ['params'],
  fetchMyReviewList: ['params'],
  fetchMyCouponList: ['params'],
  fetchMyPushYN: ['params'],
  fetchMyUserInfoPatch: ['params'],
  fetchMyPointList: ['params'], // 내 마일리지 현황
  fetchMySmsSend: ['params'],
});

export const MyTypes = Types;
export default Creators;
