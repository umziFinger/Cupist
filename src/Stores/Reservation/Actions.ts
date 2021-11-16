import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchReservationReducer: ['params'],
  fetchReservationInfo: ['params'],
  fetchReservation: ['params'],
  fetchReservationCardList: ['params'],
});

export const ReservationTypes = Types;
export default Creators;
