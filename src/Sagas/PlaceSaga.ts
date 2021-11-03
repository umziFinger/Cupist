import { put, call } from 'redux-saga/effects';
import PlaceActions from '@/Stores/Place/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

export function* fetchPlaceAroundList(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.PLACE_AROUND_LIST_URL,
    };

    const response = yield call(Axios.GET, payload);
    // console.log(response.data.placeResult);
    if (response.result === true && response.code === null) {
      yield put(PlaceActions.fetchPlaceReducer({ type: 'aroundList', data: response.data.placeResult }));
    } else {
      yield put(PlaceActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchPlaceAroundList : ', e);
  }
}
