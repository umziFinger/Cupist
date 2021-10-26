import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchSearchReducer: ['params'],
  fetchSearchList: ['params'],
  fetchDeleteAllSearchQuery: [],
  fetchDeleteSearchQuery: ['params'],
  fetchRecentSearchList: ['params'],
  fetchUpdateRecentSearchList: ['params'],
});

export const SearchTypes = Types;
export default Creators;
