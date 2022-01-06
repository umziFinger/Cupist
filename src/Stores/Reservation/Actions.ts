import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchReservationReducer: ['params'],
  fetchReservationInfo: ['params'],
  fetchReservation: ['params'],
  fetchReservationCardList: ['params'],
  fetchReservationCancel: ['params'],
  fetchReservationSimplePayment: ['params'],
  fetchReservationCard: ['params'],
  fetchReservationDeleteCard: ['params'],
  fetchReservationPaymentSign: ['params'],
  fetchReservationPaymentVerify: ['params'],
  fetchReservationCertification: ['params'],
});

export const ReservationTypes = Types;
export default Creators;
