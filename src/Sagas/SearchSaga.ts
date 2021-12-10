import { put, call } from 'redux-saga/effects';
import { getUniqueId } from 'react-native-device-info';
import CommonActions from '@/Stores/Common/Actions';
import SearchActions from '@/Stores/Search/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

export function* fetchSearchAreaList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.SEARCH_AREA_URL,
    };

    const response = yield call(Axios.GET, payload);
    // console.log('성공: ', response.data);

    if (response.result === true && response.code === null) {
      // console.log('여기야 여기: ', data.params);
      if (data.params) {
        yield put(SearchActions.fetchSearchReducer({ type: 'searchedAreaList', data: response.data.area }));
      } else {
        yield put(SearchActions.fetchSearchReducer({ type: 'areaList', data: response.data.area }));
      }
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchAreaList : ', e);
  }
}

export function* fetchSearchBowlingClubList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));

    const payload = {
      ...data,
      url: `${Config.SEARCH_URL}`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'bowlingList', data: response.data, page: data.params.page }));
      yield put(SearchActions.fetchSearchReducer({ type: 'bowlingListPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchSearchBowlingClubList : ', e);
  }
}

export function* fetchSearchRecentList(data: any): any {
  try {
    const params = {
      ...data,
      url: `${Config.SEARCH_QUERY_URL}`,
    };

    const response = yield call(Axios.GET, params);

    if (response.result === true && response.code === null) {
      console.log('최근 검색어 리스트: ', response.data);
      yield put(SearchActions.fetchSearchReducer({ type: 'recentSearch', data: response.data.search }));
    } else {
      console.log('occurred Error...fetchSearchRecentList : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchRecentList : ', e);
  }
}

export function* fetchSearchRecentListPost(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.SEARCH_QUERY_URL,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      console.log('최근 검색어 등록 성공:', response);
      const uniqueId = getUniqueId();
      const params = {
        uniqueId,
        perPage: 30,
        page: 1,
      };
      yield put(SearchActions.fetchSearchRecentList(params));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchRecentListPost : ', e);
  }
}

export function* fetchSearchRecentListDelete(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.SEARCH_QUERY_URL}/${data.params.idx}`,
    };

    const response = yield call(Axios.DELETE, payload);

    if (response.result === true && response.code === null) {
      console.log('최근 검색어 삭제 성공:', response);
      yield put(SearchActions.fetchSearchReducer({ type: 'recentSearchDelete', data: data.params.idx }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchRecentListDelete : ', e);
  }
}

export function* fetchSearchRecentListDeleteAll(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.SEARCH_QUERY_URL}`,
    };

    const response = yield call(Axios.DELETE, payload);

    if (response.result === true && response.code === null) {
      console.log('최근 검색어 전체 삭제 성공:', response);
      yield put(SearchActions.fetchSearchReducer({ type: 'recentSearch', data: [] }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchRecentListDeleteAll : ', e);
  }
}

export function* fetchSearchPopularList(data: any): any {
  try {
    const payload = {
      ...data,
      url: `${Config.SEARCH_POPULAR_URL}`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log('인기 볼리장:', response);
      yield put(SearchActions.fetchSearchReducer({ type: 'popularList', data: response.data.placeResult }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchPopularList : ', e);
  }
}
