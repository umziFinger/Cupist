import { put, call } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import HomeActions from '@/Stores/Home/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

export function* fetchHomeList(data: any): any {
  try {
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
    const payload = {
      ...data,
      url: Config.HOME_URL,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(HomeActions.fetchHomeReducer({ type: 'homeList', data: response.data }));
      // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchHomeList : ', e);
  }
}

export function* fetchHomeDirectReservationList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.HOME_PLACE_URL,
    };
    const response = yield call(Axios.GET, payload);
    console.log('home res : ', response.data);
    if (response.result === true && response.code === null) {
      yield put(HomeActions.fetchHomeReducer({ type: 'directReservationList', data: response.data }));
      yield put(HomeActions.fetchHomePossibleDate({ type: 'directReservation', ...data.params }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchHomeDirectReservationList : ', e);
  }
}

export function* fetchHomePrepaymentPriceList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.HOME_EARLY_URL,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(HomeActions.fetchHomeReducer({ type: 'prepaymentPriceList', data: response.data }));
      yield put(HomeActions.fetchHomePossibleDate({ type: 'prepayment', ...data.params }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchHomePrepaymentPriceList : ', e);
  }
}

export function* fetchHomePossibleDate(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.HOME_CHECK_URL,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      // yield put(HomeActions.fetchHomeReducer({ type: 'prepaymentPriceList', data: response.data }));
      if (data.params.type === 'directReservation') {
        yield put(HomeActions.fetchHomeReducer({ type: 'possibleDirectDate', data: response.data }));
      }
      if (data.params.type === 'prepayment') {
        yield put(HomeActions.fetchHomeReducer({ type: 'possiblePrepaymentDate', data: response.data }));
      }
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchHomePossibleDate : ', e);
  }
}
