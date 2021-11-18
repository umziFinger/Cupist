export const INITIAL_STATE: CommonState['common'] = {
  isOpenQnaTypeRBS: false,
  isOpenTimeFilter: false,
  isOpenDirectReservationRBS: false,
  isOpenReservationRBS: false,
  isLoading: false,
  isSkeleton: false,
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
  homeTabRefreshYN: 'Y',
};
type typeYN = 'Y' | 'N';
export interface CommonState {
  common: {
    isOpenQnaTypeRBS: boolean | false;
    isOpenTimeFilterRBS: boolean | false;
    isOpenDirectReservationRBS: boolean | false;
    isOpenReservationRBS: boolean | false;
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
    homeTabRefreshYN: typeYN;
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
