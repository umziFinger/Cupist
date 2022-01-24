import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchHomeReducer: ['params'],
  fetchCheckLoginYN: ['params'],
  fetchHomeList: ['params'],
  fetchHomeDirectReservationList: ['params'],
  fetchHomeFreeBowlingPlaceList: ['params'],
  fetchHomePossibleDate: ['params'],
  fetchHomeCheckEarly: ['params'],
});

export const HomeTypes = Types;
export default Creators;
