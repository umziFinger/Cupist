import { put, call } from 'redux-saga/effects';
import PlaceActions from '@/Stores/Place/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import CommonActions from '@/Stores/Common/Actions';

export function* fetchPlaceAroundList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.PLACE_AROUND_LIST_URL,
    };

    const response = yield call(Axios.GET, payload);
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
    if (response.result === true && response.code === null) {
      // 내주변 탭과 홈화면의 알코볼 리스트를 분리하기 위해 추가
      if (data.params.sort === 'albamon') {
        yield put(
          PlaceActions.fetchPlaceReducer({
            type: 'homeAlbamonList',
            data: response.data.place,
            page: data.params.page,
          }),
        );
      }
      yield put(
        PlaceActions.fetchPlaceReducer({
          type: 'myAroundList',
          data: response.data.place,
          page: data.params.page,
        }),
      );
      if (response.data.place?.length > 0)
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

export function* fetchPlaceReviewList(data: any): any {
  try {
    if (data.params.page === 1) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    }

    const payload = {
      ...data,
      url: `${Config.PLACE_URL}/${data.params.placeIdx}/review`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(
        PlaceActions.fetchPlaceReducer({
          type: 'placeReview',
          data: response.data,
          page: data.params.page,
        }),
      );

      yield put(
        PlaceActions.fetchPlaceReducer({
          type: 'reviewListPage',
          data: data.params.page + 1,
        }),
      );

      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));

    console.log('occurred Error...fetchPlaceReviewList : ', e);
  }
}

export function* fetchPlaceList(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.PLACE_URL}`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(PlaceActions.fetchPlaceReducer({ type: 'placeList', data: response.data, page: data.params.page }));
      yield put(PlaceActions.fetchPlaceReducer({ type: 'placeListPage', data: data.params.page + 1 }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceList : ', e);
  }
}

export function* fetchPlaceEventHotList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.EVENT_HOT_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(PlaceActions.fetchPlaceReducer({ type: 'hotPlaceList', data: response.data, page: data.params.page }));
      yield put(PlaceActions.fetchPlaceReducer({ type: 'hotPlaceListPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceEventHotList : ', e);
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
  }
}

export function* fetchPlaceEventHotDetail(data: any): any {
  try {
    const payload = {
      url: `${Config.EVENT_HOT_URL}/${data.params.eventIdx}`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log(response.data);
      yield put(PlaceActions.fetchPlaceReducer({ type: 'eventHotDetail', data: response.data }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceEventHotDetail : ', e);
  }
}

export function* fetchPlaceDibsList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.MY_DIBS_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(PlaceActions.fetchPlaceReducer({ type: 'dibsList', data: response.data, page: data.params.page }));
      yield put(PlaceActions.fetchPlaceReducer({ type: 'dibsListPage', data: data.params.page + 1 }));

      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log(' Error...fetchPlaceDibsList : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchPlaceDibsList : ', e);
  }
}
