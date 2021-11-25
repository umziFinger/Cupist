export const INITIAL_STATE = {
  isOpenQnaTypeRBS: false,
  isOpenTimeFilterRBS: false,
  isOpenDirectReservationRBS: false,
  isOpenReservationRBS: false,
  isOpenCalendarRBS: false,
  isOpenMyReviewMoreRBS: false,
  isLoading: false,
  isSkeleton: false,
  alertDialog: false,
  alertDialogType: null,
  alertDialogDataType: null,
  alertDialogTitle: null,
  alertDialogMessage: null,
  alertDialogParams: null,
  alertToast: false,
  alertToastPosition: '',
  alertToastMessage: '',
  isConnected: false,
  heightInfo: {
    mainBottomHeight: 0,
    subBottomHeight: 0,
    fixBottomHeight: 0,
    tabBarBottomHeight: 0,
    statusHeight: 0,
  },
  codePushPercent: 0,
  codePushSyncMessage: '',
  versionInfo: {
    currentVersion: '',
    minimumVersion: '',
  },
  currentLocationStatus: '',
  permissionYN: '',
  codePushStatus: null,
  myLatitude: 0,
  myLongitude: 0,
  attachFile: [] as any,
  attachFileIdx: [] as any,
  attachFileViewableIdx: 0,
  dynamicLinkUrl: '',
  dynamicLinkFlag: false,
  handleFcmInfoIdx: -1,
  handleFcmInfoFlag: false,
  totalImageType: '',
  totalImageList: [],
  totalSelectImageIndex: 0,
  isOpenAgreeDetailRBS: false,
  currentRBS: '',
  isOpenKeyboard: false,
  homeTabRefreshYN: 'Y',
  appCodePushVersion: '',
};

export interface CommonState {
  common: {
    isOpenQnaTypeRBS: boolean | false;
    isOpenTimeFilterRBS: boolean | false;
    isOpenDirectReservationRBS: boolean | false;
    isOpenReservationRBS: boolean | false;
    isOpenCalendarRBS: boolean | false;
    isOpenMyReviewMoreRBS: boolean | false;
    isLoading: boolean | false;
    isSkeleton: boolean | false;
    alertDialog: AlertInfo['alertDialog'];
    alertDialogType: AlertInfo['alertDialogType'];
    alertDialogDataType: AlertInfo['alertDialogDataType'];
    alertDialogTitle: AlertInfo['alertDialogTitle'];
    alertDialogMessage: AlertInfo['alertDialogMessage'];
    alertDialogParams: AlertInfo['alertDialogParams'];
    codePushPercent: CodePushInfo['codePushPercent'];
    codePushSyncMessage: CodePushInfo['codePushSyncMessage'];
    codePushStatus: string | null;
    heightInfo: HeightInfo;
    versionInfo: VersionInfo;
    permissionYN: string | 'N';
    myLatitude: LocationInfo['myLatitude'];
    myLongitude: LocationInfo['myLongitude'];
    latitude: LocationInfo['latitude'];
    longitude: LocationInfo['longitude'];
    attachFile: any[];
    attachFileIdx: string[];
    attachFileViewableIdx: number;
    alertToast: boolean | false;
    alertToastPosition: string;
    alertToastMessage: string;
    dynamicLinkUrl: string | '';
    dynamicLinkFlag: boolean | false;
    handleFcmInfoIdx: number | -1;
    handleFcmInfoFlag: boolean | false;
    totalImageType: string;
    totalImageList: any[];
    totalSelectImageIndex: number;
    isOpenAgreeDetailRBS: boolean | false;
    currentRBS: string | null;
    isOpenKeyboard: boolean | false;
    homeTabRefreshYN: typeYN;
    appCodePushVersion: string | '';
    isConnected: boolean | false;
    currentLocationStatus: any;
  };
}

interface LocationInfo {
  latitude?: number | 0;
  longitude?: number | 0;
  myLatitude: number | 0;
  myLongitude: number | 0;
}

interface HeightInfo {
  mainBottomHeight: number | 0;
  subBottomHeight: number | 0;
  fixBottomHeight: number | 0;
  tabBarBottomHeight: number | 0;
  statusHeight: number | 0;
}

interface CodePushInfo {
  codePushPercent?: number | 0;
  codePushSyncMessage?: string | null;
}

interface AlertInfo {
  alertDialog: boolean | false;
  alertDialogType: string | null;
  alertDialogDataType: string | null;
  alertDialogTitle: string | null;
  alertDialogMessage: string | Function | null;
  alertDialogParams: any;
}

interface VersionInfo {
  currentVersion: string | '';
  minimumVersion: string | '';
}

type typeYN = 'Y' | 'N';
