import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchReservationReducer: ['params'],
});

export const ReservationTypes = Types;
export default Creators;
