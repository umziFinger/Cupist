import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Auth/InitialState';
import { AuthTypes } from './Actions';

export const fetchAuthReducer = (state = INITIAL_STATE, actions: any) => {
  return produce(state, (draft) => {
    const { type, data } = actions.params;
    switch (type) {
      case 'login': {
        draft.userIdx = data.userIdx;
        draft.userInfo.idx = data.userIdx;
        draft.phoneNumber = '';
        draft.email = '';
        draft.password = '';
        draft.log_cert = null;
        break;
      }
      case 'logout': {
        draft.userInfo = INITIAL_STATE.userInfo;
        draft.userIdx = null;
        break;
      }
      case 'joinInfoInit': {
        console.log('call reducer joinInfoInit');
        const d = draft;
        d.agreeInfo = INITIAL_STATE.agreeInfo;
        d.phoneNumber = '';
        d.log_cert = null;
        d.email = '';
        d.password = '';
        d.userName = '';
        d.smsValueValid = false;
        d.smsValidText = '';
        d.emailValid = false;
        d.passwordValid = false;
        d.userNameValid = false;
        d.inputAuthNum = '';
        d.isReceived = false;
        d.nickName = '';

        break;
      }
      case 'smsInfoInit': {
        draft.log_cert = null;
        draft.smsValueValid = false;
        draft.smsValidText = '';
        break;
      }
      case 'agreeInfo': {
        draft.agreeInfo.checkedArr = data.checkedArr;
        break;
      }
      case 'agreeInfoItemCheck': {
        const { index } = data;
        draft.agreeInfo.checkedArr[index] = !draft.agreeInfo.checkedArr[index];
        break;
      }

      case 'agreeInfoAllCheck': {
        try {
          draft.agreeInfo.checkedArr[0] = data;
        } catch (e) {
          console.log(e);
        }
        break;
      }

      case 'selectedAgreeIdx': {
        draft.agreeInfo.selectedAgreeIdx = data.selectedAgreeIdx;
        break;
      }

      case 'agreeInfoInit': {
        draft.agreeInfo = INITIAL_STATE.agreeInfo;
        break;
      }
      case 'phoneNumber': {
        draft.phoneNumber = data.phoneNumber;

        break;
      }
      case 'log_cert': {
        console.log('call reducer log_cert : ', data);
        draft.log_cert = data;
        break;
      }
      case 'isReceived': {
        draft.isReceived = data;
        break;
      }
      case 'password': {
        draft.password = data.password;
        break;
      }
      case 'userInfo': {
        draft.userInfo = data.me;
        break;
      }
      case 'tokenInfo': {
        draft.tokenInfo = data.tokenInfo;
        break;
      }
      case 'smsValueValid': {
        draft.smsValueValid = data;
        break;
      }
      case 'smsValidText': {
        draft.smsValidText = data.smsValidText;
        break;
      }

      case 'inputAuthNum': {
        draft.inputAuthNum = data.inputAuthNum;
        break;
      }
      case 'mobile': {
        draft.userInfo.mobile = data.mobile;
        break;
      }

      case 'emailValid': {
        draft.emailValid = data;
        break;
      }
      case 'passwordValid': {
        draft.passwordValid = data;
        break;
      }
      case 'userName': {
        draft.userName = data;
        break;
      }
      case 'userNameValid': {
        draft.userNameValid = data;
        break;
      }
      case 'terms': {
        draft.terms = data.terms;
        break;
      }
      case 'email': {
        draft.email = data.email;
        break;
      }
      case 'nickName': {
        draft.nickName = data;
        break;
      }

      case 'notificationYN': {
        draft.userInfo.notificationYN = data;
        break;
      }

      case 'marketingYN': {
        draft.userInfo.marketingYN = data;
        break;
      }

      case 'eventYN': {
        draft.userInfo.eventYN = data;
        break;
      }
      case 'tempUserIdx': {
        draft.tempUserIdx = data;
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.FETCH_AUTH_REDUCER]: fetchAuthReducer,
});
