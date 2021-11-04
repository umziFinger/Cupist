import { createActions } from 'reduxsauce';
import { fetchSearchAreaList, fetchSearchBowlingClubList } from '@/Sagas/SearchSaga';

const { Types, Creators } = createActions({
  fetchSearchReducer: ['params'],
  fetchSearchAreaList: ['params'],
  fetchSearchBowlingClubList: ['params'],
});

export const SearchTypes = Types;
export default Creators;
