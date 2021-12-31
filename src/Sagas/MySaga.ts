import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { unlink } from '@react-native-seoul/kakao-login';
import { NaverLogin } from '@react-native-seoul/naver-login';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthAction from '@/Stores/Auth/Actions';
import { SCREEN_TYPE } from '@/Components/Card/Common/PlaceXSmallCard';
import PlaceActions from '@/Stores/Place/Actions';

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
    console.log('occurred Error...fetchMyProfileImagePatch : ', e);
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

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      console.log('문의하기 상세: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'myQnaDetail',
          data: response.data.qna,
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

    console.log('occurred Error...fetchMyQnaDetailInfo : ', e);
  }
}

export function* fetchMyNotificationPushYN(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_NOTIFICATION_YN_URL,
    };

    const response = yield call(Axios.PATCH, payload);
    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'notificationYN', data: data.params.pushYN }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyNotificationPushYN : ', e);
  }
}

export function* fetchMyMarketingPushYN(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_MARKETING_YN_URL,
    };

    const response = yield call(Axios.PATCH, payload);
    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'marketingYN', data: data.params.pushYN }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyMarketingPushYN : ', e);
  }
}

export function* fetchMyEventPushYN(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.MY_EVENT_YN_URL,
    };

    const response = yield call(Axios.PATCH, payload);
    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'eventYN', data: data.params.pushYN }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchMyEventPushYN : ', e);
  }
}

export function* fetchMyWithdraw(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const url = `${Config.MY_WITHDRAW_URL}`;
    const payload = {
      ...data,
      url,
    };
    const response = yield call(Axios.PATCH, payload);
    console.log('회원탈퇴: ', response.data);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '회원탈퇴가 완료되었습니다.',
          },
        }),
      );

      AsyncStorage.setItem('userIdx', '');
      AsyncStorage.setItem('accessToken', '');
      AsyncStorage.setItem('refreshToken', '');

      if (data.params.providerType === 'KAKAO') {
        const message = unlink();
        console.log('카카오 언 링크: ', message);
      } else if (data.params.providerType === 'NAVER') {
        NaverLogin.logout();
        console.log('네이버 로그 아웃: ');
      }

      yield put(CommonActions.fetchSkeletonNavigate({ routeName: 'HomeScreen', state: { expired: true } }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyWithdraw : ', e);
  }
}

export function* fetchMyReviewList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const params = {
      ...data,
      url: Config.MY_REVIEW,
    };
    const response = yield call(Axios.GET, params);
    console.log('마이 리뷰 데이터: ', response.data);
    if (response.result === true && response.code === null) {
      yield put(
        MyActions.fetchMyReducer({
          type: 'myReviewList',
          data: response.data,
          page: data.params.page,
        }),
      );
      yield put(MyActions.fetchMyReducer({ type: 'myReviewListPage', data: data.params.page + 1 }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyReviewList : ', e);
  }
}

export function* fetchMyReservationList(data: any): any {
  try {
    if (data.params.page === 1) yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.MY_RESERVATION_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      // console.log('마이 예약 리스트: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'reservationList',
          data: response.data?.reservation,
          state: data.params.state,
          page: data.params.page,
        }),
      );

      if (response.data.reservation?.length > 0) {
        yield put(
          MyActions.fetchMyReducer({
            type: 'reservationListPage',
            data: data.params.page + 1,
            state: data.params.state,
          }),
        );
      }

      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyReservationList : ', e);
  }
}

export function* fetchMyReservationDetailInfo(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    navigate('ReservationDetailScreen');
    const payload = {
      ...data,
      url: `${Config.MY_RESERVATION_URL}/${data.params.reservationIdx}`,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      // console.log('예약 상세: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'reservationDetail',
          data: response.data.payment,
        }),
      );
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyReservationDetailInfo : ', e);
  }
}

export function* fetchMyReservationCancelDetailInfo(data: any): any {
  try {
    navigate('ReservationCancelDetailScreen');
    const payload = {
      ...data,
      url: `${Config.MY_RESERVATION_URL}/${data.params.paymentIdx}/cancel`,
    };
    const response = yield call(Axios.GET, payload);
    if (response.result === true && response.code === null) {
      console.log('예약 취소 상세: ', response.data);
      yield put(
        MyActions.fetchMyReducer({
          type: 'reservationCancelDetail',
          data: response.data.payment,
        }),
      );
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyReservationCancelDetailInfo : ', e);
  }
}

export function* fetchMyReviewWrite(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const url = Config.MY_REVIEW;
    const formData = new FormData();
    // 이미지 첨부
    if (data.params.files) {
      data.params.files.map((v: any) => {
        return formData.append('files', v);
      });
    }

    formData.append('content', data.params.content);
    formData.append('paymentIdx', data.params.paymentIdx);
    formData.append('star', data.params.star);
    const payload = {
      url,
      formData,
    };

    const response = yield call(Axios.FILE, payload);

    if (response.result === true && response.code === null) {
      if (data.params.screenType === 'my') {
        navigate('MyScreen');
      } else if (data.params.screenType === 'placeDetail') {
        yield put(PlaceActions.fetchPlaceDetail({ idx: data.params.placeIdx }));
        navigateGoBack();
      } else if (data.params.screenType === 'placeReview') {
        yield put(PlaceActions.fetchPlaceDetail({ idx: data.params.placeIdx }));
        yield put(
          PlaceActions.fetchPlaceReviewList({
            perPage: 10,
            page: 1,
            sort: 'latest',
            placeIdx: data.params.placeIdx,
          }),
        );
        navigateGoBack();
      }
      yield put(CommonActions.fetchCommonReducer({ type: 'myTabRefreshYN', data: 'N' }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyReviewWrite : ', e);
  }
}

export function* fetchMyReviewModify(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const url = `${Config.MY_REVIEW}/${data.params.reviewIdx}`;
    const formData = new FormData();
    const attachFileInfoArr: any = [];
    // 이미지 첨부
    if (data.params.files) {
      data.params.files.map((v: any) => {
        if (v.idx) {
          return attachFileInfoArr.push(v.idx);
        }
        return formData.append('files', v);
      });
    }
    formData.append('attachFileInfo', JSON.stringify(attachFileInfoArr));
    formData.append('content', data.params.content);
    formData.append('star', data.params.star);

    const payload = {
      url,
      formData,
    };

    const response = yield call(Axios.PATCH, payload);

    if (response.result === true && response.code === null) {
      if (data.params.screenType === 'my') {
        navigate('MyScreen');
      } else if (data.params.screenType === 'placeDetail') {
        yield put(PlaceActions.fetchPlaceDetail({ idx: data.params.placeIdx }));
        navigateGoBack();
      } else if (data.params.screenType === 'placeReview') {
        yield put(PlaceActions.fetchPlaceDetail({ idx: data.params.placeIdx }));
        yield put(
          PlaceActions.fetchPlaceReviewList({
            perPage: 10,
            page: 1,
            sort: 'latest',
            placeIdx: data.params.placeIdx,
          }),
        );
        navigateGoBack();
      }
      yield put(CommonActions.fetchCommonReducer({ type: 'myTabRefreshYN', data: 'N' }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      console.log('occurred Error...fetchMyReviewModify : ', response);
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));

    console.log('occurred Error...fetchMyReviewModify : ', e);
  }
}

export function* fetchMyReviewDelete(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const url = `${Config.MY_REVIEW}/${data.params.reviewIdx}`;

    const payload = {
      url,
    };

    const response = yield call(Axios.DELETE, payload);
    console.log('리뷰 삭제: ', response);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'myTabRefreshYN', data: 'N' }));

      if (data.params.screenType === 'placeDetail') {
        yield put(PlaceActions.fetchPlaceDetail({ idx: data.params.placeIdx }));
      }

      if (data.params.screenType === 'placeReview') {
        yield put(PlaceActions.fetchPlaceDetail({ idx: data.params.placeIdx }));
        yield put(PlaceActions.fetchPlaceReducer({ type: 'reviewDelete', data: data.params }));
      }

      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyReviewDelete : ', e);
  }
}

export function* fetchMyPasswordModify(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const url = `${Config.MY_PASSWORD_URL}`;

    const payload = {
      ...data,
      url,
    };

    const response = yield call(Axios.PATCH, payload);
    console.log('비밀번호 변경: ', response);
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

      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      navigateGoBack();
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchMyPasswordModify : ', e);
  }
}
