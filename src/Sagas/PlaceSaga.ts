import { put, call, select } from 'redux-saga/effects';
import PlaceActions from '@/Stores/Place/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import AuthAction from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

export function* fetchPlaceAroundList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.PLACE_AROUND_LIST_URL,
    };

    const response = yield call(Axios.GET, payload);
    // console.log(response.data.placeResult);
    if (response.result === true && response.code === null) {
      yield put(
        PlaceActions.fetchPlaceReducer({ type: 'aroundList', data: response.data.placeResult, page: data.params.page }),
      );
      yield put(PlaceActions.fetchPlaceReducer({ type: 'aroundListPage', data: data.params.page + 1 }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceAroundList : ', e);
  }
}

export function* fetchPlaceSearchList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.PLACE_SEARCH_LIST_URL,
    };

    const response = yield call(Axios.GET, payload);
    //
    if (response.result === true && response.code === null) {
      // console.log('fetchPlaceSearchList:', response.data);
      yield put(
        PlaceActions.fetchPlaceReducer({
          type: 'myAroundList',
          data: response.data.place,
          page: data.params.page,
        }),
      );
      yield put(PlaceActions.fetchPlaceReducer({ type: 'myAroundListPage', data: data.params.page + 1 }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceAroundList : ', e);
  }
}

export function* fetchPlaceDetail(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.PLACE_URL}/${data.params.idx}`,
    };

    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(PlaceActions.fetchPlaceReducer({ type: 'placeDetailIdx', data: data.params.idx }));
      yield put(PlaceActions.fetchPlaceReducer({ type: 'placeDetail', data: response.data }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceDetail : ', e);
  }
}

export function* fetchPlaceTicketList(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.PLACE_URL}/${data.params.idx}/ticketInfo`,
    };

    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      yield put(PlaceActions.fetchPlaceReducer({ type: 'placeTicketList', data: response.data }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceTicketInfo : ', e);
  }
}

export function* fetchPlaceRecentList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_VIEW_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(
        PlaceActions.fetchPlaceReducer({ type: 'recentList', data: response.data.view, page: data.params.page }),
      );
      yield put(PlaceActions.fetchPlaceReducer({ type: 'recentListPage', data: data.params.page + 1 }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceRecentList : ', e);
  }
}
