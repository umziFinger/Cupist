import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchSearchReducer: ['params'],
  fetchSearchAreaList: ['params'],
  fetchSearchBowlingClubList: ['params'],
  fetchSearchRecentList: ['params'],
  fetchSearchRecentListPost: ['params'],
});

export const SearchTypes = Types;
export default Creators;
