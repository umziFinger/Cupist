import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchHomeReducer: ['params'],
  fetchCheckLoginYN: ['params'],
  fetchHomeList: ['params'],
});

export const HomeTypes = Types;
export default Creators;
