import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchCommonReducer: ['params'],
  fetchErrorHandler: ['params'],
  fetchInitialHandler: null,
  fetchSkeletonNavigate: ['params'],
  fetchSkeletonNavigateReplace: ['params'],
});

export const CommonTypes = Types;
export default Creators;
