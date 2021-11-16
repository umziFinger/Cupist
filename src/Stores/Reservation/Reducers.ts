import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Reservation/InitialState';
import { ReservationTypes } from '@/Stores/Reservation/Actions';

export const fetchReservationReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'reservationInfo': {
        console.log('call reducer reservationInfo');
        draft.reservationInfo = data.paymentInfo;
        break;
      }

      case 'reservationInfoInit': {
        console.log('call reducer reservationInfoInit');
        draft.reservationInfo = null;
        break;
      }

      case 'totalPrice': {
        draft.totalPrice = data;
        break;
      }

      case 'myCardList': {
        console.log('call reducer myCardList : ', data.cardList);
        draft.myCardList = data.cardList;
        break;
      }

      // 간편결제 | 다른 결제수단
      case 'paymentType': {
        console.log('call reducer paymentType : ', data);
        draft.paymentType = data;
        break;
      }

      case 'selcetedCardIdx': {
        console.log('call reducer selcetedCardIdx : ', data);
        draft.selcetedCardIdx = data;
        break;
      }

      // 다른 결제수단 중 선택 된 수단
      case 'paymentMethod': {
        console.log('call reducer paymentMethod : ', data);
        draft.paymentMethod = data;
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
