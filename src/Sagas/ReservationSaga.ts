import { put, call, select } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import ReservationActions from '@/Stores/Reservation/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import { navigate, navigateAndReset, navigateGoBack } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';
import { ReservationState } from '@/Stores/Reservation/InitialState';

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
      console.log('예약 response.data : ', response.data);

      // const userCode = Config.USER_CODE;
      // const data = {
      //   pg: 'html5_inicis', // PG사
      //   pay_method: 'card', // 결제수단
      //   merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      //   amount: 100, // 결제금액
      //   name: '아임포트 결제 데이터 분석', // 주문명
      //   buyer_name: '홍길동', // 구매자 이름
      //   buyer_tel: '01012341234', // 구매자 전화번호
      //   buyer_email: 'example@example', // 구매자 이메일
      //   buyer_addr: '신사동 661-16', // 구매자 주소
      //   buyer_postcode: '06018', // 구매자 우편번호
      // };
      // console.log('paymentMethod : ', DATA_PAYMENT_METHOD[paymentMethod].key);
      // navigate('PaymentScreen', { userCode, data });

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
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchAuthCheckEmail : ', e);
  }
}
