import { put, call, select } from 'redux-saga/effects';
import React from 'react';
import CommonActions from '@/Stores/Common/Actions';
import ReservationActions from '@/Stores/Reservation/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { navigate, navigateAndReset, navigateGoBack } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

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
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: Config.RESERVATION_URL,
    };
    const response = yield call(Axios.POST, payload);
    console.log('예약 res : ', response);
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'paymentInfo', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isOpenReservationRBS', data: true }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservation : ', e);
  }
}

export function* fetchReservationCardList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.RESERVATION_CARD_URL,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'myCardList', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchReservationCardList : ', e);
  }
}

export function* fetchReservationCancel(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
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

      const params = {
        perPage: 10,
        page: 1,
        state: 'cancel',
      };
      yield put(MyActions.fetchMyReservationList(params));
      navigate('MyScreen');
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservationCardList : ', e);
  }
}

export function* fetchReservationSimplePayment(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: Config.RESERVATION_PAYMENT_CARD_URL,
    };
    const response = yield call(Axios.POST, payload);
    console.log('간편결제 결과 res : ', response);
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'paymentResult', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      navigate('PaymentResultScreen');
      navigateAndReset('PaymentResultScreen');
    } else {
      yield put(ReservationActions.fetchReservationReducer({ type: 'paymentPwd', data: '' }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservationSimplePayment : ', e);
  }
}

export function* fetchReservationCard(data: any): any {
  try {
    const { selectedPlaceIdx, selectedTicket } = yield select((state: PlaceState) => state.place);
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: Config.RESERVATION_CARD_URL,
    };
    const response = yield call(Axios.POST, payload);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      console.log('call saga 카드 등록 성공! : ', selectedTicket);
      navigate('ReservationScreen', { placeIdx: selectedPlaceIdx, ticketInfoIdx: selectedTicket?.idx });
    } else {
      navigateGoBack();
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservationCard : ', e);
  }
}

export function* fetchReservationDeleteCard(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.RESERVATION_CARD_URL}/${data.params.idx}`,
    };
    const response = yield call(Axios.DELETE, payload);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(ReservationActions.fetchReservationCardList());
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservationDeleteCard : ', e);
  }
}
