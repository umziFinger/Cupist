import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Reservation/InitialState';
import { ReservationTypes } from '@/Stores/Reservation/Actions';

export const fetchReservationReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'reservationInfo': {
        console.log('call reducer reservationInfo : ', data.paymentInfo);
        draft.reservationInfo = data.paymentInfo;
        break;
      }

      case 'reservationInfoInit': {
        console.log('call reducer reservationInfoInit');
        draft.reservationInfo = null;
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [ReservationTypes.FETCH_RESERVATION_REDUCER]: fetchReservationReducer,
});
