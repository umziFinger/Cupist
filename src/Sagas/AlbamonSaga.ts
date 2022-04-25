import { call, put } from 'redux-saga/effects';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import CommonActions from '@/Stores/Common/Actions';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { navigate, navigateAndReset } from '@/Services/NavigationService';
import AuthActions from '@/Stores/Auth/Actions';

// 알코볼 신청서 안내내용 가져오기
export function* fetchCompetitionsRegistInfo(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_REGIST_INFO_URL}/1`,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      const isMoveScreen = data.params.isMoveScreen;
      const placeIdx = data.params.placeIdx;
      const placeDetailName = data.params.placeDetailName;

      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionsRegistInfo', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      if (isMoveScreen) {
        navigate('RegistScreen', { placeIdx, placeDetailName });
      }
    } else {
      console.log('fetchCompetitionsRegistInfo : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsRegistInfo : ', e);
  }
}

// 대회 신청하기
export function* fetchCompetitionsRegist(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_REGIST_INFO_URL}/1`,
    };
    const response = yield call(Axios.POST, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      const userCode = Config.USER_CODE;
      const paymentData = {
        pg: 'nice', // PG사
        pay_method: 'vbank', // 결제수단
        merchant_uid: response?.data?.merchantUid || '', // 주문번호 (백엔드에서 임시 예약시 생성된 주문번호 넣어줄것)
        amount: response?.data?.price || 0, // 결제금액
        name: response?.data?.Place?.name || '', // 주문명
        buyer_name: response?.data?.username || '', // 구매자 이름
        buyer_tel: data?.params?.mobile || '', // 구매자 전화번호
        buyer_email: '', // 구매자 이메일
        app_scheme: 'bolimi',
        niceMobileV2: true,
      };
      console.log('알코볼 신청비용 결제 정보 ::: ', 'userCode: ', userCode, '결제 정보: ', paymentData);
      navigate('AlbamonPaymentScreen', { userCode, data: paymentData });
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionsPaymentInfo', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log('fetchCompetitionsRegist : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsRegist : ', e);
  }
}

// 결제 검증 계좌발급
export function* fetchCompetitionsPaymentVerify(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_REGIST_PAYMENT_VERIFY_URL}`,
    };
    const response = yield call(Axios.POST, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionsPaymentResult', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      navigate('RegistCompleteScreen');
      navigateAndReset('RegistCompleteScreen');
    } else {
      console.log('fetchCompetitionsPaymentVerify : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsPaymentVerify : ', e);
  }
}

// 볼링장 검색
export function* fetchCompetitionsPlaceSearch(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_PLACE_URL}`,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionPlaceSearchList', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log('fetchCompetitionsPlaceSearch : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsPlaceSearch : ', e);
  }
}

export function* fetchCompetitionsClubSearch(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_CLUB_URL}`,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionClubSearchList', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log('fetchCompetitionsClubSearch : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsClubSearch : ', e);
  }
}

export function* fetchCompetitionsVerify(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_VERIFY_URL}`,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionVerifyData', data: response.data.result }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log('fetchCompetitionsVerify : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsVerify : ', e);
  }
}
