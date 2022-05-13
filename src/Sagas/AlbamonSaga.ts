import { call, put, select } from 'redux-saga/effects';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import CommonActions from '@/Stores/Common/Actions';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { navigate, navigateAndReset } from '@/Services/NavigationService';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { DATA_PAYMENT_METHOD } from '@/Containers/Reservation/ReservationScreen/data';
import { ReservationState } from '@/Stores/Reservation/InitialState';

// 알코볼 신청서 안내내용 가져오기
export function* fetchCompetitionsRegistInfo(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const currentScreen = data.params.currentScreen;
    console.log('currentScreen : ', currentScreen);
    const url =
      currentScreen === 'CalendarSlider'
        ? `${Config.COMPETITION_REGIST_INFO_URL}/${data.params.competitionIdx}/qualifier`
        : `${Config.COMPETITION_REGIST_INFO_URL}/${data.params.competitionIdx}`;

    const payload = {
      ...data,
      url,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      const placeIdx = data.params.placeIdx;
      const placeDetailName = data.params.placeDetailName;

      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionsRegistInfo', data: response.data }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'isCompetitionProgress', data: true }));
      // yield put(
      //   AlbamonActions.fetchAlbamonReducer({
      //     type: 'registDataInit',
      //   }),
      // );
      if (
        currentScreen === 'AlbamonDetailScreen' ||
        currentScreen === 'PlaceDetailScreen' ||
        currentScreen === 'SupportAlbamonBanner'
      ) {
        navigate('RegistScreen', { placeIdx, placeDetailName });
      }

      if (currentScreen === 'UnSupportAlbamonBanner') {
        navigate('AlbamonDetailScreen');
      }
    } else {
      console.log('fetchCompetitionsRegistInfo : ', response);
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'isCompetitionProgress', data: false }));
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(AlbamonActions.fetchAlbamonReducer({ type: 'isCompetitionProgress', data: false }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsRegistInfo : ', e);
  }
}

// 대회 신청하기
export function* fetchCompetitionsRegist(data: any): any {
  const { paymentMethod, paymentType, selcetedCardIdx } = yield select((state: AlbamonState) => state.albamon);
  const { myCardList } = yield select((state: ReservationState) => state.reservation);
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_REGIST_INFO_URL}/1`,
    };
    const response = yield call(Axios.POST, payload);
    console.log('shrdjgdjdtdy', response.data);
    if (response.result === true && response.code === null) {
      console.log('####### paymentMethod : ', paymentMethod);
      const userCode = Config.USER_CODE;

      if (paymentType === 'simple') {
        // console.log('간편결제 진행합니다. : ', selcetedCardIdx);
        navigate('CheckPasswordScreen', {
          paymentIdx: response.data.Club.idx,
          billingIdx: myCardList[selcetedCardIdx - 1].idx,
        });
        yield put(AlbamonActions.fetchAlbamonReducer({ type: 'isAlbamonPayment', data: true }));
        yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
        return;
      }

      const paymentData = {
        pg: 'nice', // PG사
        pay_method: DATA_PAYMENT_METHOD[paymentMethod].key, // 결제수단
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
    // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_PLACE_URL}`,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionPlaceSearchList', data: response.data }));
      // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log('fetchCompetitionsPlaceSearch : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchCompetitionsPlaceSearch : ', e);
  }
}

export function* fetchCompetitionsClubSearch(data: any): any {
  try {
    // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: `${Config.COMPETITION_CLUB_URL}`,
    };
    const response = yield call(Axios.GET, payload);
    console.log(response.data);
    if (response.result === true && response.code === null) {
      yield put(AlbamonActions.fetchAlbamonReducer({ type: 'competitionClubSearchList', data: response.data }));
      // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      console.log('fetchCompetitionsClubSearch : ', response);
      yield put(CommonActions.fetchErrorHandler(response));
      // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    // yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
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
