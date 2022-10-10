import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchHomeReducer: ['params'],
  fetchIntroductionList: ['params'],
  fetchIntroductionAdditionalList: ['params'],
  fetchIntroductionAdditionalMoreList: ['params'],
  fetchIntroductionCustomList: ['params'],
  fetchProfile: ['params'],
});

export const HomeTypes = Types;
export default Creators;
