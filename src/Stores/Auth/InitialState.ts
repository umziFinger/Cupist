enum enumYN {
  Y = 'Y',
  N = 'N',
}

export const INITIAL_STATE: AuthState['auth'] = {
  userIdx: null,
  phoneNumber: '',
  log_cert: null,
  isReceived: false,
  smsValueValid: false,
  smsValidText: '',
  agreeInfo: {
    selectedAgreeIdx: 0,
    checkedArr: [],
  },
  email: '',
  password: '',
  userInfo: {
    idx: null,
    mobile: null,
    nickname: null,
    profile: null,
    username: null,
    reservationCnt: null,
    email: null,
    providerType: null,
    residentPlace: null,
    notificationCnt: null,
    placeViewCnt: null,
    notificationYN: enumYN.Y,
    marketingYN: enumYN.Y,
    eventYN: enumYN.Y,
  },
  tokenInfo: {
    token: '',
    refreshToken: '',
  },
  inputAuthNum: '',
  emailValid: false,
  passwordValid: false,
  userName: '',
  userNameValid: false,
  nickName: '',
  nickNameValid: false,
  terms: [],
};

export interface AuthState {
  auth: {
    userIdx: number | null;
    phoneNumber: string | '';
    log_cert: any;
    isReceived: boolean | false;
    smsValueValid: boolean | false;
    smsValidText: string | '';
    agreeInfo: AgreeInfo;
    email: string | '';
    password: string | '';
    userInfo: userInfo;
    tokenInfo: tokenInfo;
    inputAuthNum: string | '';
    emailValid: boolean | false;
    passwordValid: boolean | false;
    userName: string | '';
    userNameValid: boolean | false;
    nickName: string | '';
    nickNameValid: boolean | false;
    terms: Array<any> | [];
  };
}

interface AgreeInfo {
  selectedAgreeIdx: number | 0;
  checkedArr: Array<string | number>;
}

interface userInfo {
  idx: number | null;
  mobile: string | null;
  nickname: string | null;
  profile: string | null;
  username: string | null;
  reservationCnt: number | null;
  email: string | null;
  providerType: string | null;
  residentPlace: { placeIdx: number; name: string; newAddress: string; oldAddress: string; mainPhoto: string } | null;
  notificationCnt: number | null;
  placeViewCnt: number | null;
  notificationYN: enumYN;
  marketingYN: enumYN;
  eventYN: enumYN;
}

interface tokenInfo {
  token: string | '';
  refreshToken: string | '';
}
