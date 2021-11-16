import { put, call } from 'redux-saga/effects';
import React from 'react';
import CommonActions from '@/Stores/Common/Actions';
import ReservationActions from '@/Stores/Reservation/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

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
export function* fetchReservationCancel(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.RESERVATION_CANCEL_URL}`,
    };

    const response = yield call(Axios.POST, payload);
    console.log('에약 취소: ', response.data);
    if (response.result === true && response.code === null) {
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogMessage: '예약이 취소되었습니다.\n예약 > 취소내역에서 확인 가능합니다.',
          },
        }),
      );
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservation : ', e);
  }
}
