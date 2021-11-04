export const INITIAL_STATE = {
  isOpenTimeFilter: false,
  isOpenDirectReservationRBS: false,
  isLoading: false,
  isSkeleton: null,
  alertDialog: false,
  alertDialogType: null,
  alertDialogDataType: null,
  alertDialogTitle: null,
  alertDialogMessage: null,
  alertDialogParams: null,
  alertToast: false,
  alertToastPosition: null,
  alertToastMessage: null,
  isConnected: null,
  heightInfo: {
    mainBottomHeight: 0,
    subBottomHeight: 0,
    fixBottomHeight: 0,
    tabBarBottomHeight: 0,
    statusHeight: 0,
  },
  codePushPercent: null,
  codePushSyncMessage: null,
  splashStart: null,
  versionInfo: null,
  currentLocationStatus: null,
  permissionYN: null,
  codePushStatus: null,
  myLatitude: null,
  myLongitude: null,
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
};

export interface CommonState {
  common: {
    isOpenTimeFilterRBS: boolean | false;
    isOpenDirectReservationRBS: boolean | false;
    isLoading: boolean | false;
    isSkeleton: boolean | false;
    alertDialog: AlertInfo;
    alertDialogType: AlertInfo;
    alertDialogDataType: AlertInfo;
    alertDialogTitle: AlertInfo;
    alertDialogMessage: AlertInfo;
    alertDialogParams: AlertInfo;
    codePushPercent: number | 0;
    codePushSyncMessage: CodePushInfo;
    codePushStatus: string | null;
    heightInfo: HeightInfo;
    splashStart: string | null;
    versionInfo: VersionInfo;
    permissionYN: string | 'N';
    myLatitude: LocationInfo;
    myLongitude: LocationInfo;
    latitude: LocationInfo;
    longitude: LocationInfo;
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
  alertDialogMessage: string | null;
  alertDialogParams: any;
}

interface VersionInfo {
  currentVersion: string | '';
  minimumVersion: string | '';
}
