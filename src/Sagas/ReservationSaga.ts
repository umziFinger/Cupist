import { put, call, select } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import ReservationActions from '@/Stores/Reservation/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import { navigate, navigateAndReset, navigateGoBack } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import AlbamonActions from '@/Stores/Albamon/Actions';

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
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'paymentInfo', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      // 웹뷰에서 결제 성공 후 callback 에서 rbs open
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
      console.log('card response : ', response);
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
    console.log('예약 취소: ', response.data);
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

      yield put(MyActions.fetchMyReducer({ type: 'reservationListPageInit' })); // 예약 취소 후 마이볼리>예약탭>취소탭 이동 시 목록 업데이트 안되는 이슈때문에 추가함

      const params = {
        perPage: 10,
        page: 1,
        state: 'cancel',
      };
      yield put(MyActions.fetchMyReservationList(params));

      navigate('MyScreen');

      yield put(MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: { title: '취소', key: 'cancel' } }));

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
  const { isAlbamonPayment } = yield select((state: AlbamonState) => state.albamon);
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
      // if (isAlbamonPayment) {
      //   navigate('RegistCompleteScreen');
      //   navigateAndReset('RegistCompleteScreen');
      //   yield put(AlbamonActions.fetchAlbamonReducer({ type: 'isAlbamonPayment', data: false }));
      // }
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
  const { registCardAfterScreen } = yield select((state: CommonState) => state.common);
  try {
    const { selectedPlaceIdx } = yield select((state: PlaceState) => state.place);
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: Config.RESERVATION_CARD_URL,
    };
    const response = yield call(Axios.POST, payload);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      console.log('call saga 카드 등록 성공!! : ', data.params.ticketInfoIdx);
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '카드가 등록되었습니다.',
          },
        }),
      );
      if (registCardAfterScreen === 'ReservationScreen') {
        navigate('ReservationScreen', { placeIdx: selectedPlaceIdx, ticketInfoIdx: data.params.ticketInfoIdx });
        navigateAndReset('ReservationScreen');
        yield put(CommonActions.fetchCommonReducer({ type: 'registCardAfterScreen', data: '' }));
      }
      if (registCardAfterScreen === 'RegistScreen') {
        yield put(AlbamonActions.fetchAlbamonReducer({ type: 'isReturn', data: true }));
        navigate('RegistScreen', { placeIdx: -1, placeDetailName: '' });
        navigateAndReset('RegistScreen');
        yield put(CommonActions.fetchCommonReducer({ type: 'registCardAfterScreen', data: '' }));
      }
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

export function* fetchReservationPaymentSign(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.RESERVATION_PAYMENT_SIGN_URL}`,
    };
    const response = yield call(Axios.PATCH, payload);
    console.log('비밀번호 재등록!!: ', response.data);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(ReservationActions.fetchReservationCardList());
      navigateGoBack();
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservationDeleteCard : ', e);
  }
}

export function* fetchReservationPaymentVerify(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.RESERVATION_PAYMENT_VERIFY_URL}`,
    };
    const response = yield call(Axios.POST, payload);
    console.log('SAGA 결제 검증 response : ', response);
    if (response.result === true && response.code === null) {
      yield put(ReservationActions.fetchReservationReducer({ type: 'paymentResult', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      navigate('PaymentResultScreen');
      navigateAndReset('PaymentResultScreen');
    } else {
      navigateGoBack();
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchReservationPaymentVerify : ', e);
  }
}

export function* fetchReservationCertification(data: any): any {
  try {
    const { addCardInfo } = yield select((state: ReservationState) => state.reservation);
    const payload = {
      ...data,
      url: Config.RESERVATION_CERTIFICATION_URL,
    };

    const response = yield call(Axios.POST, payload);
    if (response.result === true && response.code === null) {
      console.log('본인인증 검증 Res : ', response);
      const birth = response.data?.certification?.birthday.replace('-', '').replace('-', '').substring(2) || '';
      yield put(
        ReservationActions.fetchReservationReducer({
          type: 'addCardInfo',
          data: { ...addCardInfo, birth },
        }),
      );
      navigate('AddCardScreen');
      navigateAndReset('AddCardScreen');
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchAuthCheckEmail : ', e);
  }
}
