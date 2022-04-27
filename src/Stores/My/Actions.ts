import { createActions } from 'reduxsauce';
import { fetchMyRefundBank } from '@/Sagas/MySaga';

const { Types, Creators } = createActions({
  fetchMyReducer: ['params'],
  fetchMyReviewList: ['params'],
  fetchMyCouponList: ['params'],
  fetchMyPushYN: ['params'],
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
  fetchMyNotificationPushYN: ['params'],
  fetchMyMarketingPushYN: ['params'],
  fetchMyEventPushYN: ['params'],
  fetchMyWithdraw: ['params'],
  fetchMyReservationList: ['params'],
  fetchMyReservationDetailInfo: ['params'],
  fetchMyReservationCancelDetailInfo: ['params'],
  fetchMyReviewWrite: ['params'],
  fetchMyReviewModify: ['params'],
  fetchMyReviewDelete: ['params'],
  fetchMyPasswordModify: ['params'],
  fetchMyCouponAdd: ['params'],
  fetchMyProfileRingme: ['params'],
  fetchMyReservationCheckDetail: ['params'],
  fetchMyRefundBank: ['params'],
});

export const MyTypes = Types;
export default Creators;
