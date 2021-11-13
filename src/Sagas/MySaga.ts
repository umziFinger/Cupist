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
import NotificationActions from '@/Stores/Notification/Actions';

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

export function* fetchMyNoticeList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.MY_NOTICE_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log('공지사항: ', response.data.notice);
      yield put(
        MyActions.fetchMyReducer({
          type: 'myNoticeList',
          data: response.data.notice,
          page: data.params.page,
        }),
      );
      yield put(MyActions.fetchMyReducer({ type: 'myNoticeListPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyNoticeList : ', e);
  }
}

export function* fetchMyNoticeDetailInfo(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    navigate('NoticeDetailScreen');
    const payload = {
      ...data,
      url: `${Config.MY_NOTICE_URL}/${data.params.noticeIdx}`,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      console.log('공지사항 상세: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'myNoticeDetail',
          data: response.data.notice,
        }),
      );
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyNoticeDetailInfo : ', e);
  }
}

export function* fetchMyEventList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.MY_EVENT_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log('이벤트: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'myEventList',
          data: [...response.data.ingEvent, ...response.data.endEvent],
          page: data.params.page,
        }),
      );
      yield put(MyActions.fetchMyReducer({ type: 'myEventListPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyEventList : ', e);
  }
}

export function* fetchMyEventDetailInfo(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    navigate('EventDetailScreen');
    const payload = {
      ...data,
      url: `${Config.MY_EVENT_URL}/${data.params.eventIdx}`,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log('이벤트 상세: ', response.data.event);
      yield put(
        MyActions.fetchMyReducer({
          type: 'myEventDetail',
          data: response.data.event,
          page: data.params.page,
        }),
      );
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyEventDetailInfo : ', e);
  }
}

export function* fetchMyQnaList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.MY_QNA_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log('문의하기: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'myQnaList',
          data: response.data.qna,
          page: data.params.page,
        }),
      );
      yield put(MyActions.fetchMyReducer({ type: 'myQnaListPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyQnaList : ', e);
  }
}

export function* fetchMyQnaWrite(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const url = Config.MY_QNA_URL;
    const formData = new FormData();
    // 이미지 첨부
    if (data.params.files) {
      data.params.files.map((v: any) => {
        return formData.append('files', v);
      });
    }
    formData.append('content', data.params.content);
    formData.append('qnaType', data.params.qnaType);
    const payload = {
      formData,
      url,
    };

    const response = yield call(Axios.FILE, payload);

    if (response.result === true && response.code === null) {
      const params = {
        perPage: 10,
        page: 1,
      };
      yield put(MyActions.fetchMyQnaList(params));
      navigateGoBack();
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyQnaWrite : ', e);
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
  }
}

export function* fetchMyQnaDetailInfo(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    navigate('QnaDetailScreen');
    const payload = {
      ...data,
      url: `${Config.MY_QNA_URL}/${data.params.qnaIdx}`,
    };

    // const response = yield call(Axios.GET, payload);
    //
    // if (response.result === true && response.code === null) {
    //   console.log('문의하기 상세: ', response.data);
    //   yield put(
    //     MyActions.fetchMyReducer({
    //       type: 'myQnaDetail',
    //       data: response.data,
    //       page: data.params.page,
    //     }),
    //   );
    //   yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    // } else {
    //   yield put(CommonActions.fetchErrorHandler(response));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    // }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyQnaDetailInfo : ', e);
  }
}
