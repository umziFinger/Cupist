import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchAlbamonReducer: ['params'],
});

export const AlbamonTypes = Types;
export default Creators;
