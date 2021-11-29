import { put, call } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import SearchActions from '@/Stores/Search/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import NotificationActions from '@/Stores/Notification/Actions';

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
    const payload = {
      ...data,
      url: `${Config.SEARCH_URL}`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'bowlingList', data: response.data, page: data.params.page }));
      yield put(SearchActions.fetchSearchReducer({ type: 'bowlingListPage', data: data.params.page + 1 }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchBowlingClubList : ', e);
  }
}
