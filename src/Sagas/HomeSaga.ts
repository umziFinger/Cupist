import { put, call } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import HomeActions from '@/Stores/Home/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import { JsonForm } from '@/Components/Function';

export function* fetchIntroductionList(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
    const payload = {
      ...data,
      url: Config.INTRODUCTION,
    };
    const response = yield call(Axios.GET, payload);

    console.log('====fetchIntroductionList===', JsonForm(response));
    yield put(HomeActions.fetchHomeReducer({ type: 'introductionList', data: response.data }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchIntroductionList : ', e);
  }
}

export function* fetchIntroductionAdditionalList(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
    const payload = {
      ...data,
      url: Config.INTRODUCTION_ADDITIONAL,
    };
    const response = yield call(Axios.GET, payload);

    console.log('====fetchIntroductionAdditionalList===', JsonForm(response));
    yield put(
      HomeActions.fetchHomeReducer({
        type: 'introductionAdditionalList',
        data: { data: response.data, page: response.meta?.next?.id },
      }),
    );
    yield put(HomeActions.fetchHomeReducer({ type: 'introductionAdditionalPage', data: response.meta?.next?.id }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchIntroductionAdditionalList : ', e);
  }
}

export function* fetchIntroductionAdditionalMoreList(data: any): any {
  try {
    if (data.params.page) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
      // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
      const payload = {
        ...data,
        url: `${Config.INTRODUCTION_ADDITIONAL}/${data.params.page}`,
      };
      const response = yield call(Axios.GET, payload);

      console.log('====fetchIntroductionAdditionalList===', JsonForm(response));
      yield put(
        HomeActions.fetchHomeReducer({
          type: 'introductionAdditionalList',
          data: { data: response.data, page: response.meta?.next?.id },
        }),
      );
      yield put(HomeActions.fetchHomeReducer({ type: 'introductionAdditionalPage', data: response.meta?.next?.id }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchIntroductionAdditionalList : ', e);
  }
}

export function* fetchIntroductionCustomList(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
    const payload = {
      ...data,
      url: `${Config.INTRODUCTION_CUSTOM}`,
    };
    const response = yield call(Axios.POST, payload);

    console.log('====fetchIntroductionCustomList===', JsonForm(response));
    yield put(
      HomeActions.fetchHomeReducer({
        type: 'introductionCustomList',
        data: response.data,
      }),
    );
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    // yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
    console.log('occurred Error...fetchIntroductionAdditionalList : ', e);
  }
}
