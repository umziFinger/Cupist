import { put, call } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import SearchActions from '@/Stores/Search/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

export function* fetchRecentSearchList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.SEARCH_QUERY_URL,
    };

    const response = yield call(Axios.GET, payload);
    console.log('최근 검색어,', response);
    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'recentSearch', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchRecentSearchList : ', e);
  }
}

export function* fetchUpdateRecentSearchList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.SEARCH_QUERY_URL,
    };

    const response = yield call(Axios.POST, payload);
    console.log(response);
    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'recentSearch', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchRecentSearchList : ', e);
  }
}

export function* fetchSearchList(data: any): any {
  // try {
  //   const { query, type } = data.params;
  //   console.log(query);
  //   // yield put(SearchActions.fetchSearchReducer({ type: 'searchQuery', data: query }));
  //   //
  //   const payload = {
  //     ...data,
  //     url: Config.SEARCH_URL,
  //   };
  //   console.log('call saga search : ', data.params.query);
  //   const response = yield call(Axios.GET, payload);
  //
  //   if (response.result === true && response.code === null) {
  //     console.log('----------');
  //     console.log(response);
  //     if (type === 'artist') {
  //       yield put(SearchActions.fetchSearchReducer({ type: 'artist', data: response.data, page: data.params.page }));
  //       yield put(SearchActions.fetchSearchReducer({ type: 'artistPage', data: data.params.page + 1 }));
  //     } else if (type === 'drama') {
  //       yield put(SearchActions.fetchSearchReducer({ type: 'drama', data: response.data, page: data.params.page }));
  //       yield put(SearchActions.fetchSearchReducer({ type: 'dramaPage', data: data.params.page + 1 }));
  //     } else if (type === 'place') {
  //       yield put(SearchActions.fetchSearchReducer({ type: 'place', data: response.data, page: data.params.page }));
  //       yield put(SearchActions.fetchSearchReducer({ type: 'placePage', data: data.params.page + 1 }));
  //     } else {
  //       yield put(SearchActions.fetchSearchReducer({ type: 'all', data: response.data }));
  //     }
  //   } else {
  //     console.log(response);
  //     yield put(CommonActions.fetchErrorHandler(response));
  //   }
  // } catch (e) {
  //   console.log('occurred Error...fetchSearchList : ', e);
  // }
}

export function* fetchDeleteAllSearchQuery(): any {
  try {
    const payload = {
      url: Config.SEARCH_QUERY_URL,
    };

    const response = yield call(Axios.DELETE, payload);
    console.log(response);
    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'deleteAllRecentSearch' }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchDeleteAllSearchQuery : ', e);
  }
}

export function* fetchDeleteSearchQuery(data: any): any {
  try {
    const { idx } = data.params;
    console.log();
    const payload = {
      ...data,
      url: `${Config.SEARCH_QUERY_URL}/${idx}`,
    };

    const response = yield call(Axios.DELETE, payload);
    console.log(response);
    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'deleteRecentSearch', data: idx }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchDeleteSearchQuery : ', e);
  }
}
