import { put } from 'redux-saga/effects';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { Axios } from '@/Services/Axios';
import { navigate, navigateGoBack, navigateReplace } from '@/Services/NavigationService';
import HomeActions from '@/Stores/Home/Actions';
import SearchActions from '@/Stores/Search/Actions';
import Config from '@/Config';

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

  // 앱 버전 체크 YN 초기화
  yield put(
    CommonActions.fetchCommonReducer({
      type: 'splashStart',
      data: 'start',
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
