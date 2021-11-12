import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthAction from '@/Stores/Auth/Actions';
import { SCREEN_TYPE } from '@/Components/Card/Common/PlaceXSmallCard';

export function* fetchMyPushYN(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_PUSH_YN_URL,
    };

    const response = yield call(Axios.PATCH, payload);
    const date = new Date();
    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'pushYN', data: data.params.push_yn }));
      if (data.params.push_yn === 'Y') {
        yield put(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'confirm',
              alertDialogDataType: 'push',
              alertDialogTitle: 'App Push 수신 동의 완료',
              alertDialogMessage: moment().format('YYYY.MM.DD'),
            },
          }),
        );
      } else {
        yield put(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'confirm',
              alertDialogDataType: 'push',
              alertDialogTitle: 'App Push 수신 거부 완료',
              alertDialogMessage: moment().format('YYYY.MM.DD'),
            },
          }),
        );
      }
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyPushYN : ', e);
  }
}

export function* fetchMyUserInfoPatch(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_USER_URL,
    };

    const response = yield call(Axios.PATCH, payload);

    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'userInfo', data: response.data.user }));
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'bottom',
            alertToastMessage: '회원정보를 저장하였습니다.',
          },
        }),
      );

      navigate('MyInfoModifyScreen');
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyUserInfoPatch : ', e);
  }
}

export function* fetchMyReviewList(data: any): any {
  try {
    console.log('마이 리뷰 데이터: ', data);
    yield put(
      MyActions.fetchMyReducer({
        type: 'myReviewList',
        data: [0, 1, 2, 4, 5],
        page: data.params.page,
      }),
    );
    yield put(MyActions.fetchMyReducer({ type: 'myReviewPage', data: data.params.page + 1 }));
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyReviewList : ', e);
  }
}

export function* fetchMyCouponList(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      ...data,
      url: Config.MY_PROMOTION_URL,
    };
    const response = yield call(Axios.GET, payload);
    // console.log('마이 마일리지 데이터: ', data.mileage.data);
    if (response.result === true && response.code === null) {
      yield put(
        MyActions.fetchMyReducer({
          type: 'myCouponList',
          data: response.data,
          page: data.params.page,
        }),
      );
      yield put(MyActions.fetchMyReducer({ type: 'myCouponPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyCouponList : ', e);
  }
}

export function* fetchMyPointList(data: any): any {
  try {
    yield put(MyActions.fetchMyReducer({ type: 'myPointListPage', data: data.params.page + 1 }));
    const payload = {
      ...data,
      url: Config.MY_MILEAGES,
    };

    const response = yield call(Axios.GET, payload);
    console.log('마일리지 내역: ', response.data);
    if (response.result === true && response.code === null) {
      yield put(
        MyActions.fetchMyReducer({
          type: 'myPointList',
          data: response.data,
          page: data.params.page,
        }),
      );
      yield put(MyActions.fetchMyReducer({ type: 'myPointListPage', data: data.params.page + 1 }));

      // userInfo의 마일리지 정보 업데이트
      yield put(AuthActions.fetchAuthReducer({ type: 'myMileage', data: response.data.total_mileage }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyPointList : ', e);
  }
}

export function* fetchMySmsSend(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_CERT_GET_URL,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      console.log('call saga log_cert');

      yield put(AuthActions.fetchAuthReducer({ type: 'isReceived', data: true }));
      yield put(AuthActions.fetchAuthReducer({ type: 'log_cert', data: response.data.data }));
    } else {
      // 인증정보 초기화
      yield put(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: null } }));

      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMySmsSend : ', e);
  }
}

export function* fetchMyPlacePatch(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_URL,
    };

    const response = yield call(Axios.PATCH, payload);

    if (response.result === true && response.code === null) {
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '상주 볼링장 설정이 완료 되었습니다.',
          },
        }),
      );

      const { userIdx } = yield select((state: AuthState) => state.auth);
      yield put(AuthAction.fetchUserInfo({ idx: userIdx }));
      if (data.params.type === SCREEN_TYPE.JOIN) {
        navigate('HomeScreen');
      } else {
        navigateGoBack();
      }
    } else {
      // 인증정보 초기화
      // yield put(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: null } }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyPlacePatch : ', e);
  }
}

export function* fetchMyProfileImagePatch(data: any): any {
  try {
    const { image } = data.params;
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const url = `${Config.MY_PROFILE_URL}`;
    const formData = new FormData();

    const attachFileInfoArr: any = [];
    if (image) {
      image.map((v: any) => {
        if (v.idx) {
          // 수정된 s3 이미지 리스트
          return attachFileInfoArr.push(v.idx);
        }
        // 새로 추가된 이미지
        return formData.append('file', v);
      });
    }
    formData.append('attachFileInfo', JSON.stringify(attachFileInfoArr));

    const payload = {
      url,
      formData,
    };

    const response = yield call(Axios.PATCH, payload);

    if (response.result === true && response.code === null) {
      const { userIdx } = yield select((state) => state.auth);
      yield put(AuthActions.fetchUserInfo({ idx: userIdx }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyProfileImagePatch : ', e.message);
  }
}

export function* fetchMyProfilePatch(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_URL,
    };

    const response = yield call(Axios.PATCH, payload);

    if (response.result === true && response.code === null) {
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: response.data.message,
          },
        }),
      );
      const { userIdx } = yield select((state: AuthState) => state.auth);
      yield put(AuthAction.fetchUserInfo({ idx: userIdx }));
      navigateGoBack();
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyProfilePatch : ', e);
  }
}
