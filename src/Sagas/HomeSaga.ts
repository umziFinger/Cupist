import { put, call } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import HomeActions from '@/Stores/Home/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

export function* fetchHomeList(data: any): any {
  console.log('call SAGA fetchHomeList : ', data.params);
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
  console.log('call SAGA fetchHomeDirectReservationList : ', data.params);
  try {
    const payload = {
      ...data,
      url: Config.HOME_PLACE_URL,
    };
    const response = yield call(Axios.GET, payload);
    console.log('call saga fetchHomeDirectReservationList : ', response);
    if (response.result === true && response.code === null) {
      yield put(HomeActions.fetchHomeReducer({ type: 'directReservationList', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchHomeDirectReservationList : ', e);
  }
}
