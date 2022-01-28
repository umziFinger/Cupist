import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchCommonReducer: ['params'],
  fetchErrorHandler: ['params'],
  fetchInitialHandler: null,
  fetchSkeletonNavigate: ['params'],
  fetchSkeletonNavigateReplace: ['params'],
  fetchCommonPlaceDibsHandler: ['params'],
  fetchCommonReport: ['params'],
  fetchCommonCode: ['params'],
});

export const CommonTypes = Types;
export default Creators;
