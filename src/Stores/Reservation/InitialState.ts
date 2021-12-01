export const INITIAL_STATE: ReservationState['reservation'] = {
  reservationInfo: null,
  totalPrice: 0,
  myCardList: [],
  paymentType: '',
  selcetedCardIdx: -1,
  paymentMethod: -1,
  personCount: 1,
  shoesCount: 0,
  paymentInfo: null,
  paymentResult: null,
};

export interface ReservationState {
  reservation: {
    reservationInfo: any;
    totalPrice: number | 0;
    myCardList: Array<any> | [];
    paymentType: string | '';
    selcetedCardIdx: number | -1;
    paymentMethod: number | -1;
    personCount: number | 1;
    shoesCount: number | 0;
    paymentInfo: any;
    paymentResult: any;
  };
}
