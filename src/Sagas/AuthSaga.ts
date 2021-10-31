import { put, call, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BadgeAndroid from 'react-native-android-badge';
import { Axios } from '@/Services/Axios';
import AuthActions from '@/Stores/Auth/Actions';
import Config from '@/Config';
import CommonActions from '@/Stores/Common/Actions';
import MyAcions from '@/Stores/My/Actions';
import { FirebaseTokenUpdate } from '@/Components/Firebase/messaging';
import { navigate, navigateGoBack } from '@/Services/NavigationService';

export function* fetchUserLogin(data: any): any {
  try {
    // yield put(CommonActions.fetchCommonReducer({ type: 'closeAllRBS' }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    AsyncStorage.setItem('userIdx', '');
    AsyncStorage.setItem('accessToken', '');
    AsyncStorage.setItem('refreshToken', '');
    console.log('login data : ', data.params);

    const type = data.params.type;
    let url = Config.AUTH_LOGIN_URL;
    if (type) {
      url = Config.AUTH_LOGIN_SOCIAL_URL;
    }
    const payload = {
      ...data,
      url,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      const { accessToken, refreshToken, idx } = response.data;
      console.log('Login token : ', accessToken);
      console.log('Login refresh token : ', refreshToken);
      console.log('Login user idx : ', idx);

      AsyncStorage.setItem('userIdx', idx.toString());
      AsyncStorage.setItem('accessToken', accessToken.toString());
      AsyncStorage.setItem('refreshToken', refreshToken.toString());

      yield put(AuthActions.fetchAuthReducer({ type: 'login', data: { userIdx: idx } }));
      FirebaseTokenUpdate();
      yield put(AuthActions.fetchUserInfo());
      yield put(
        AuthActions.fetchAuthReducer({
          type: 'tokenInfo',
          data: {
            tokenInfo: { accessToken, refreshToken },
          },
        }),
      );
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      navigate('HomeScreen', { expired: false });

      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'bottom',
            alertToastMessage: '로그인이 완료되었습니다.',
          },
        }),
      );
    } else {
      // yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchUserLogin : ', e);
  }
}

export function* fetchUserLogout(): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    const payload = {
      url: Config.AUTH_SIGN_OUT_URL,
    };
    const response = yield call(Axios.POST, payload);
    if (response.result === true && response.code === null) {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      FirebaseTokenUpdate();
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '로그아웃 처리되었습니다.',
          },
        }),
      );
      // 알림 뱃지 업데이트
      if (Platform.OS === 'android') {
        BadgeAndroid.setBadge(Number(0));
      } else if (Platform.OS === 'ios') {
        PushNotificationIOS.setApplicationIconBadgeNumber(Number(0));
      }
      // 로그아웃 시 마이왓플 탭 메뉴 데이터 초기화
      AsyncStorage.setItem('userIdx', '');
      AsyncStorage.setItem('accessToken', '');
      AsyncStorage.setItem('refreshToken', '');

      // yield put(
      //   AuthActions.fetchAuthReducer({
      //     type: 'userInfo',
      //     data: { userInfo: null },
      //   }),
      // );

      yield put(
        AuthActions.fetchAuthReducer({
          type: 'tokenInfo',
          data: {
            tokenInfo: {
              accessToken: null,
              refreshToken: null,
            },
          },
        }),
      );

      yield put(AuthActions.fetchAuthReducer({ type: 'logout' }));

      // yield put(CommonActions.fetchSkeletonNavigate({ routeName: 'HomeScreen', state: { expired: true } }));
      navigate('HomeScreen');
    } else {
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchUserLogout : ', e);
  }
}

export function* fetchUserJoin(data: any): any {
  try {
    // yield put(CommonActions.fetchCommonReducer({ type: 'closeAllRBS' }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    AsyncStorage.setItem('userIdx', '');
    AsyncStorage.setItem('accessToken', '');
    AsyncStorage.setItem('refreshToken', '');

    const payload = {
      ...data,
      url: Config.AUTH_SIGN_UP_URL,
    };
    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      const { access_token, refresh_token, idx } = response.data;
      console.log('회원가입 response.data : ', response.data);

      AsyncStorage.setItem('userIdx', idx.toString());
      AsyncStorage.setItem('accessToken', access_token.toString());
      AsyncStorage.setItem('refreshToken', refresh_token.toString());

      // 로그인 처리
      yield put(AuthActions.fetchAuthReducer({ type: 'login', data: { userIdx: idx } }));

      yield put(
        AuthActions.fetchAuthReducer({
          type: 'tokenInfo',
          data: {
            tokenInfo: {
              accessToken: access_token,
              refreshToken: refresh_token,
            },
          },
        }),
      );
      yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
      yield put(AuthActions.fetchUserInfo({ idx }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '회원가입을 완료하였습니다.',
          },
        }),
      );
    } else {
      yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchUserJoin : ', e);
  }
}

export function* fetchAuthSocialJoin(data: any): any {
  try {
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));

    const payload = {
      ...data,
      url: Config.AUTH_SIGN_INFO,
    };
    const response = yield call(Axios.PATCH, payload);

    if (response.result === true && response.code === null) {
      const { access_token, refresh_token, idx } = response.data;
      console.log('회원가입 response.data : ', response.data);

      AsyncStorage.setItem('userIdx', idx.toString());
      AsyncStorage.setItem('accessToken', access_token.toString());
      AsyncStorage.setItem('refreshToken', refresh_token.toString());

      // 로그인 처리
      yield put(AuthActions.fetchAuthReducer({ type: 'login', data: { userIdx: idx } }));

      yield put(
        AuthActions.fetchAuthReducer({
          type: 'tokenInfo',
          data: {
            tokenInfo: {
              accessToken: access_token,
              refreshToken: refresh_token,
            },
          },
        }),
      );
      yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
      yield put(AuthActions.fetchUserInfo({ idx }));
      yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '회원가입을 완료하였습니다.',
          },
        }),
      );
    } else {
      yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    yield put(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    yield put(CommonActions.fetchCommonReducer({ type: 'isLoading', data: false }));
    console.log('occurred Error...fetchAuthSocialJoin : ', e);
  }
}

export function* fetchUserInfo(data: any): any {
  try {
    console.log('call saga fetchUserInfo data : ', data);
    const payload = {
      ...data,
      url: Config.MY_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'userInfo', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchUserInfo : ', e);
  }
}

export function* fetchAuthSmsSend(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.AUTH_SMS_SEND_URL,
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
    console.log('occurred Error...fetchAuthSmsSend : ', e);
  }
}

export function* fetchSmsAuth(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.AUTH_CERT_CHECK_URL,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      const { log_cert, profileState } = yield select((state) => state.auth);
      if (log_cert.toString() === data.params.cert) {
        yield put(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: true }));
        yield put(AuthActions.fetchAuthReducer({ type: 'isReceived', data: false }));

        if (data.params.providerScreen === 'SetSmsScreen') {
          if (profileState === 'N') {
            navigate('SetCharacterScreen');
            return;
          }
          navigate('SetPasswordScreen');
        } else if (data.params.providerScreen === 'MyEditMobileScreen') {
          const { phoneNumber } = yield select((state) => state.auth);
          yield put(MyAcions.fetchMyUserInfoPatch({ user_cel: phoneNumber }));
          navigateGoBack();
        } else if (data.params.providerScreen === 'MyEditPasswordScreen') {
          navigate('MyEditPasswordScreen');
        } else if (data.params.providerScreen === 'MyEditAddressScreen') {
          navigate('MyInfoModifyScreen');
          yield put(CommonActions.fetchCommonReducer({ type: 'isOpenMyAddressRBS', data: true }));
        }
      } else {
        yield put(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: '인증번호가 일치하지 않습니다.',
            },
          }),
        );
        yield put(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
      }
    } else {
      yield put(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
      yield put(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: '' }));
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchSmsAuth : ', e);
  }
}

export function* fetchAuthTerms(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.AUTH_TERMS_URL,
    };

    const response = yield call(Axios.GET, payload);

    if (response.result === true && response.code === null) {
      yield put(AuthActions.fetchAuthReducer({ type: 'terms', data: response.data }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchAuthTerms : ', e);
  }
}

export function* fetchAuthFindId(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.AUTH_FIND_ID_URL,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      console.log('fetchAuthFindId response : ', response.data.user_id);
      yield put(AuthActions.fetchAuthReducer({ type: 'foundId', data: response.data.user_id }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchAuthFindId : ', e);
  }
}

export function* fetchAuthFindPassword(data: any): any {
  try {
    const payload = {
      ...data,
      url: Config.AUTH_FIND_PW_URL,
    };

    const response = yield call(Axios.POST, payload);

    if (response.result === true && response.code === null) {
      console.log('fetchAuthFindsPassword response : ', response.data.tmp_pw);
      yield put(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '발급된 임시 비밀번호로 로그인해주세요.',
          },
        }),
      );
      yield put(AuthActions.fetchAuthReducer({ type: 'foundPw', data: response.data.tmp_pw }));
    } else {
      yield put(CommonActions.fetchErrorHandler(response));
    }
  } catch (e) {
    console.log('occurred Error...fetchAuthFindPassword : ', e);
  }
}
