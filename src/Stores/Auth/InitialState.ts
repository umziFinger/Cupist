export const INITIAL_STATE = {
  userIdx: null,
  phoneNumber: null,
  log_cert: null,
  isReceived: false,
  smsValueValid: false,
  smsValidText: null,
  agreeInfo: {
    selectedAgreeIdx: null,
    checkedArr: [],
  },
  id: null,
  eamil: null,
  password: null,
  userInfo: {
    address: null,
    addressDetail: null,
    addressPost: null,
    email: null,
    idx: null,
    memberType: null,
    mileage: 0,
    mobile: null,
    userId: null,
    userName: null,
    couponCnt: 0,
    pushYN: 'N',
  },
  tokenInfo: {
    token: null,
    refreshToken: null,
  },
  foundId: null,
  foundPw: null,
  inputAuthNum: null,
  emailValid: false,
  passwordValid: false,
  userName: null,
  userBirth: null,
  userGender: null,
  userNameValid: false,
  userBirthValid: false,
  userGenderValid: false,
  terms: [],
  myAddress: null,
  myAddressDetail: null,
  myAddressPost: null,
  userBrand: [],
  profileState: null,
};

export interface AuthState {
  auth: {
    userIdx: number | null;
    phoneNumber: string | '';
    log_cert: string | '';
    isReceived: boolean | false;
    smsValueValid: boolean | false;
    smsValidText: string | '';
    agreeInfo: AgreeInfo;
    id: string | '';
    email: string | '';
    password: string | '';
    userInfo: userInfo;
    tokenInfo: tokenInfo;
    foundId: string | '';
    foundPw: string | '';
    inputAuthNum: string | '';
    emailValid: boolean | false;
    passwordValid: boolean | false;
    userName: string | '';
    userBirth: string | '';
    userGender: string | '';
    userNameValid: boolean | false;
    userBirthValid: boolean | false;
    userGenderValid: boolean | false;
    terms: Array<any> | [];
    myAddress: string | '';
    myAddressDetail: string | '';
    myAddressPost: string | '';
    userBrand: Array<any> | [];
    profileState: string | '';
  };
}

interface AgreeInfo {
  selectedAgreeIdx: number | 0;
  checkedArr: Array<string | number>;
}

interface userInfo {
  address: string | null;
  addressDetail: string | null;
  addressPost: string | null;
  email: string | null;
  idx: number | null;
  memberType: string | null;
  mileage: number | 0;
  mobile: string | null;
  userId: string | null;
  userName: string | null;
  couponCnt: number | 0;
  pushYN: string | 'N';
}

interface tokenInfo {
  token: string | '';
  refreshToken: string | '';
}
