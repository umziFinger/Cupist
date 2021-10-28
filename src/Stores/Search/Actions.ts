import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchSearchReducer: ['params'],
  fetchSearchAreaList: [],
});

export const SearchTypes = Types;
export default Creators;
