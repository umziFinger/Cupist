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
        draft.phoneNumber = null;
        draft.id = null;
        draft.password = null;
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
        d.phoneNumber = null;
        d.log_cert = null;
        d.id = null;
        d.password = null;
        d.userName = null;
        d.userBirth = null;
        d.userGender = null;
        d.userBrand = INITIAL_STATE.userBrand;
        d.smsValueValid = false;
        d.smsValidText = null;
        d.emailValid = false;
        d.passwordValid = false;
        d.userNameValid = false;
        d.userBirthValid = false;
        d.userGenderValid = false;
        d.inputAuthNum = null;
        break;
      }
      case 'smsInfoInit': {
        draft.log_cert = null;
        draft.smsValueValid = false;
        draft.smsValidText = null;
        break;
      }
      case 'agreeInfo': {
        draft.agreeInfo.checkedArr = data.checkedArr;
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
        draft.log_cert = data.log_cert;
        break;
      }
      case 'isReceived': {
        draft.isReceived = data;
        break;
      }
      case 'id': {
        draft.id = data.id;
        break;
      }
      case 'password': {
        draft.password = data.password;
        break;
      }
      case 'userInfo': {
        draft.userInfo.idx = data.user_no;
        draft.userInfo.memberType = data.member_type;
        draft.userInfo.userId = data.user_id;
        draft.userInfo.userName = data.user_name;
        draft.userInfo.mobile = data.user_cel;
        draft.userInfo.mileage = data.mileage;
        draft.userInfo.email = data.user_email;
        draft.userInfo.address = data.address;
        draft.userInfo.addressDetail = data.address_detail;
        draft.userInfo.addressPost = data.address_post;
        draft.userInfo.pushYN = data.push_yn;
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
        draft.smsValidText = data.message;
        break;
      }
      case 'pushYN': {
        draft.userInfo.pushYN = data;
        break;
      }
      case 'foundId': {
        draft.foundId = data;
        break;
      }
      case 'foundPw': {
        draft.foundPw = data;
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
      case 'userBirth': {
        draft.userBirth = data;
        break;
      }
      case 'userBirthValid': {
        draft.userBirthValid = data;
        break;
      }
      case 'userGender': {
        draft.userGender = data;
        break;
      }
      case 'userGenderValid': {
        draft.userGenderValid = data;
        break;
      }
      case 'terms': {
        draft.terms = data.terms;
        break;
      }
      case 'myAddress': {
        // draft.userInfo.address = data;
        draft.myAddress = data;
        break;
      }
      case 'myAddressDetail': {
        draft.myAddressDetail = data;
        break;
      }
      case 'myAddressPost': {
        draft.myAddressPost = data;
        break;
      }
      case 'userBrand': {
        draft.userBrand = data;
        break;
      }
      case 'myMileage': {
        draft.userInfo.mileage = data;
        break;
      }
      case 'profileState': {
        draft.profileState = data;
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
