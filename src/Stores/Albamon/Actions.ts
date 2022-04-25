import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchAlbamonReducer: ['params'],
  fetchCompetitionsRegistInfo: ['params'],
  fetchCompetitionsRegist: ['params'],
  fetchCompetitionsPaymentVerify: ['params'],
  fetchCompetitionsPlaceSearch: ['params'],
  fetchCompetitionsClubSearch: ['params'],
  fetchCompetitionsVerify: ['params'],
});

export const AlbamonTypes = Types;
export default Creators;
