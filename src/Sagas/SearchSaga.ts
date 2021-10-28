import { put, call } from 'redux-saga/effects';
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
    if (response.result === true && response.code === null) {
      yield put(SearchActions.fetchSearchReducer({ type: 'areaList', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSearchAreaList : ', e);
  }
}
