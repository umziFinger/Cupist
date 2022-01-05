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
    checkedArr: [false, false, false, false, false, false],
  },
  email: '',
  password: '',
  userInfo: {
    idx: null,
    mobile: '',
    nickname: '',
    profile: '',
    username: '',
    reservationCnt: null,
    email: null,
    providerType: null,
    residentPlace: null,
    notificationCnt: null,
    placeViewCnt: null,
    notificationPushYN: enumYN.Y,
    marketingPushYN: enumYN.Y,
    eventPushYN: enumYN.Y,
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
  tempUserIdx: '',
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
    tempUserIdx: any; // 처음 소셜 로그인 시 이용약관 동의를 위한 tempUserIdx 가 발행됨
  };
}

interface AgreeInfo {
  selectedAgreeIdx: number | 0;
  checkedArr: Array<boolean>;
}

interface userInfo {
  idx: number | null;
  mobile: string | '';
  nickname: string | '';
  profile: string | '';
  username: string | '';
  reservationCnt: number | null;
  email: string | null;
  providerType: string | null;
  residentPlace: { placeIdx: number; name: string; newAddress: string; oldAddress: string; mainPhoto: string } | null;
  notificationCnt: number | null;
  placeViewCnt: number | null;
  notificationPushYN: enumYN;
  marketingPushYN: enumYN;
  eventPushYN: enumYN;
}

interface tokenInfo {
  token: string | '';
  refreshToken: string | '';
}
