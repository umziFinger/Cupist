import { put, call } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import ReservationActions from '@/Stores/Reservation/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

export function* fetchReservationInfo(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.RESERVATION_URL}/${data.params.placeIdx}/ticket/${data.params.ticketInfoIdx}`,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'reservationInfo', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchReservationInfo : ', e);
  }
}

export function* fetchReservation(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.RESERVATION_URL}/${data.params.placeIdx}/ticket/${data.params.ticketInfoIdx}`,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'reservationInfo', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchReservation : ', e);
  }
}
