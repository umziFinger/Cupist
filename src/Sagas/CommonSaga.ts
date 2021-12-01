import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { Axios } from '@/Services/Axios';
import { navigate, navigateGoBack, navigateReplace } from '@/Services/NavigationService';
import HomeActions from '@/Stores/Home/Actions';
import PlaceActions from '@/Stores/Place/Actions';
import MyActions from '@/Stores/My/Actions';
import Config from '@/Config';

export type dibsType = 'dibs' | 'unDibs';

export type placeDibsDataType = {
  placeIdx: number;
  type: dibsType;
};
// --------------------------------------------------------------------------------------------------
// 최초 진입시 초기화 함수 입니다 맨 밑에 유지 새로운 saga 생성시 !!주의!!
// --------------------------------------------------------------------------------------------------
export function* fetchInitialHandler() {
  // userIdx 초기화 (임시)
  // yield put(
  //   AuthActions.fetchAuthReducer({
  //     type: 'logout',
  //   }),
  // );

  // 로딩 초기화
  yield put(
    CommonActions.fetchCommonReducer({
      type: 'isLoading',
      data: false,
    }),
  );

  // 스켈레톤 초기화
  yield put(
    CommonActions.fetchCommonReducer({
      type: 'isSkeleton',
      data: true,
    }),
  );

  // 토스트 초기화
  yield put(
    CommonActions.fetchCommonReducer({
      type: 'alertToastInit',
    }),
  );

  // 다이얼로그 초기화
  yield put(
    CommonActions.fetchCommonReducer({
      type: 'alertDialogInit',
    }),
  );

  yield put(
    CommonActions.fetchCommonReducer({
      type: 'codePushStatus',
      data: 'init',
    }),
  );

  // 회원 가입 form 초기화
  yield put(
    AuthActions.fetchAuthReducer({
      type: 'joinInfoInit',
    }),
  );

  // 홈 로드 완료 초기화
  yield put(
    HomeActions.fetchHomeReducer({
      type: 'isHomeLoaded',
      data: false,
    }),
  );

  // 홈 캘린더 날짜 초기화
  yield put(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(new Date()).toString() }));

  // 선결제 특가 날짜 필터 초기화
  yield put(
    HomeActions.fetchHomeReducer({
      type: 'prepaymentDate',
      data: moment().add('days', 1).format('YYYY-MM-D').toString(),
    }),
  );

  // 홈 바로예약 필터 초기화
  yield put(HomeActions.fetchHomeReducer({ type: 'areaFilterIdx', data: 1 }));
  yield put(HomeActions.fetchHomeReducer({ type: 'timeFilterIdx', data: 0 }));

  // RBSheet 초기화
  yield put(CommonActions.fetchCommonReducer({ type: 'closeAllRBS' }));
  yield put(CommonActions.fetchCommonReducer({ type: 'currentRBS', data: null }));

  // More screen render Item 초기화
  yield put(MyActions.fetchMyReducer({ type: 'moreScreenRenderItem' }));

  // attachFile 초기화
  yield put(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));

  // 선택한 티켓 정보 초기화
  yield put(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));

  // 선결제 특가 예약 가능일 목록 조회
  yield put(HomeActions.fetchHomeCheckEarly());
}

export function* fetchErrorHandler(data: any) {
  console.log('call Error handler');
  const { isRBS = false } = data.params; // RBS가 open 상태에서 api 에러 발생시 닫혔다가 다시 open 하기위한 flag

  yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
  yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
  yield put(CommonActions.fetchCommonReducer({ type: 'closeAllRBS' }));

  if (data.params.result === false && data.params.code) {
    // RBS error 경우만 수행
    if (isRBS) {
      if (data.params.data.message === '회원정보가 존재하지 않습니다.') {
        yield put(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: data.params.data.message,
            },
          }),
        );
        yield put(CommonActions.fetchCommonReducer({ type: 'openCurrentRBS' }));
        return false;
      }
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogDataType: 'errorRBS',
            alertDialogTitle: data.params.data.message,
          },
        }),
      );
    } else if (data.params.data.message === '이미 쇼핑백에 담은 상품입니다.') {
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: data.params.data.message,
          },
        }),
      );
    } else if (data.params.data.message === '') {
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogDataType: 'error',
            alertDialogTitle: `code명 ${data.params.code || ''} 관리자에게 문의해주세요`,
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
            alertDialogDataType: 'error',
            alertDialogTitle: data.params.data.message,
          },
        }),
      );
    }
  } else if (data?.params?.data?.message) {
    yield put(
      CommonActions.fetchCommonReducer({
        type: 'alertToast',
        data: {
          alertToast: true,
          alertToastPosition: 'top',
          alertToastMessage: data.params.data.message,
        },
      }),
    );
  } else {
    yield put(
      CommonActions.fetchCommonReducer({
        type: 'alertToast',
        data: {
          alertToast: true,
          alertToastPosition: 'top',
          alertToastMessage: '네트워크 에러가 발생하였습니다. 관리자에게 문의해주세요.',
        },
      }),
    );
  }

  return false;
}

export function* fetchSkeletonNavigate(data: any): any {
  try {
    const routeName = data.params.routeName;

    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
    navigate(routeName, data.params.state);
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
  }
}

export function* fetchSkeletonNavigateReplace(data: any): any {
  try {
    const routeName = data.params.routeName;

    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: true }));
    navigateReplace(routeName, data.params.state);
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isSkeleton', data: false }));
  }
}

function* handlerPlaceDibs(type: dibsType, placeIdx: any) {
  try {
    yield put(PlaceActions.fetchPlaceReducer({ type: 'placeMyAroundDibsHandler', data: { placeIdx, type } }));
    yield put(PlaceActions.fetchPlaceReducer({ type: 'recentPlaceDibsHandler', data: { placeIdx, type } }));
    yield put(PlaceActions.fetchPlaceReducer({ type: 'dibListDibsHandler', data: { placeIdx, type } }));
    yield put(PlaceActions.fetchPlaceReducer({ type: 'placeListDibsHandler', data: { placeIdx, type } }));
    yield put(PlaceActions.fetchPlaceReducer({ type: 'hotPlaceListDibsHandler', data: { placeIdx, type } }));
    yield put(PlaceActions.fetchPlaceReducer({ type: 'placeDetailDibsHandler', data: { placeIdx, type } }));

    yield put(HomeActions.fetchHomeReducer({ type: 'directReservationDibsHandler', data: { placeIdx, type } }));
    yield put(HomeActions.fetchHomeReducer({ type: 'quickPriceDibsHandler', data: { placeIdx, type } }));
    yield put(HomeActions.fetchHomeReducer({ type: 'hotPlaceDibsHandler', data: { placeIdx, type } }));
  } catch (e) {
    console.log('occurred Error...handlerPlaceDibs : ', e);
  }
  return false;
}

export function* fetchCommonPlaceDibsHandler(data: any): any {
  try {
    const { placeIdx, type }: placeDibsDataType = data.params;
    yield handlerPlaceDibs(type, placeIdx);
    const payload = {
      ...data,
      url: `${Config.PLACE_URL}/${placeIdx}/dibs`,
    };

    const response = type === 'dibs' ? yield call(Axios.POST, payload) : yield call(Axios.DELETE, payload);

    if (response.result === true && response.code === null) {
      yield handlerPlaceDibs(type, placeIdx);
    } else if (response.data.message === '이미 찜 되어있는 볼링장입니다.') {
      console.log('이미 찜 되어있는 볼링장입니다.');
      yield handlerPlaceDibs(type, placeIdx);
    } else if (response.data.message === '찜이 존재하지 않습니다.') {
      console.log('찜이 존재하지 않습니다.');
      yield handlerPlaceDibs(type, placeIdx);
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
      console.log('볼링장 찜하기 실패 !!!: ', response);
    }
  } catch (e) {
    console.log('occurred Error...fetchCommonPlaceDibsHandler : ', e);
  }
}

export function* fetchCommonReport(data: any): any {
  try {
    let url;
    const { reportType, mainIdx, subIdx, reportCode } = data.params;
    // console.log(reportCode);
    switch (reportType) {
      case 'placeReview': {
        url = `place/${mainIdx}/review/${subIdx}/report`;
        break;
      }

      default:
        url = '';
    }

    const payload = {
      params: {
        reportCode,
      },
      url,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogMessage: '신고가 접수되었습니다.\n신고 접수건은 확인 후 24시간 이내에 처리될 예정입니다.',
          },
        }),
      );

      switch (reportType) {
        case 'placeReview': {
          navigateGoBack();
          break;
        }

        default:
          navigateGoBack();
      }
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchCommonReport : ', e);
  }
  return false;
}
