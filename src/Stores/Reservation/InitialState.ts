export const INITIAL_STATE = {
  reservationInfo: null,
  totalPrice: 0,
  myCardList: [],
  paymentType: '',
  selcetedCardIdx: -1,
  paymentMethod: -1,
};

export interface ReservationState {
  reservation: {
    reservationInfo: any;
    totalPrice: number | 0;
    myCardList: Array<any> | [];
    paymentType: string | '';
    selcetedCardIdx: number | -1;
    paymentMethod: number | -1;
  };
}
