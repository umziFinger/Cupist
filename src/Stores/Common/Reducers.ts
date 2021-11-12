import { createReducer } from 'reduxsauce';
import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_STATE } from '@/Stores/Common/InitialState';
import { CommonTypes } from '@/Stores/Common/Actions';

export const fetchCommonReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft: any) => {
    switch (type) {
      // RBS 추가 시 모두 추가해주세요.
      case 'openCurrentRBS': {
        draft.isOpenTimeFilterRBS = state.currentRBS === 'timeFilter';
        draft.isOpenDirectReservationRBS = state.currentRBS === 'directReservation';
        draft.isOpenAgreeDetailRBS = state.currentRBS === 'agreeDetail';
        break;
      }
      // RBS 추가 시 모두 추가해주세요.
      case 'closeAllRBS': {
        draft.isOpenTimeFilterRBS = false;
        draft.isOpenDirectReservationRBS = false;
        draft.isOpenAgreeDetailRBS = false;
        break;
      }
      case 'isOpenTimeFilterRBS': {
        draft.isOpenTimeFilterRBS = data;
        draft.currentRBS = data ? 'timeFilter' : state.currentRBS;
        break;
      }
      case 'isOpenDirectReservationRBS': {
        draft.isOpenDirectReservationRBS = data;
        draft.currentRBS = data ? 'directReservation' : state.currentRBS;
        break;
      }
      case 'isOpenAgreeDetailRBS': {
        draft.isOpenAgreeDetailRBS = data;
        draft.currentRBS = data ? 'agreeDetail' : state.currentRBS;
        break;
      }

      case 'isLoading': {
        draft.isLoading = data;
        break;
      }
      case 'isSkeleton': {
        AsyncStorage.getItem('currentScreen').then((page) => console.log('isSkeleton page', page, data));
        draft.isSkeleton = data;
        break;
      }

      case 'alertDialog': {
        draft.alertDialog = data.alertDialog;
        draft.alertDialogType = data.alertDialogType;
        draft.alertDialogDataType = data.alertDialogDataType;
        draft.alertDialogTitle = data.alertDialogTitle;
        draft.alertDialogMessage = data.alertDialogMessage;
        draft.alertDialogParams = data.alertDialogParams;
        break;
      }
      case 'alertDialogInit': {
        draft.alertDialog = false;
        draft.alertDialogType = null;
        draft.alertDialogDataType = null;
        draft.alertDialogTitle = null;
        draft.alertDialogMessage = null;
        draft.alertDialogParams = null;
        break;
      }
      case 'isConnected': {
        draft.isConnected = data.isConnected;
        break;
      }
      case 'heightInfo': {
        draft.heightInfo = data.info;
        break;
      }

      case 'versionInfo': {
        draft.versionInfo = data.versionInfo;
        break;
      }
      case 'currentLocationStatus': {
        draft.currentLocationStatus = data;
        break;
      }
      case 'permissionYN': {
        draft.permissionYN = data;
        break;
      }
      case 'codePushPercent': {
        draft.codePushPercent = data;
        break;
      }
      case 'codePushSyncMessage': {
        draft.codePushSyncMessage = data;
        break;
      }
      case 'codePushStatus': {
        draft.codePushStatus = data;
        break;
      }
      case 'myPosition': {
        draft.myLatitude = data.myLatitude;
        draft.myLongitude = data.myLongitude;
        break;
      }

      case 'attachFile': {
        if (state.attachFile) {
          draft.attachFile.concat(data);
        } else {
          draft.attachFile = data;
        }
        break;
      }
      case 'changeAttachFile': {
        draft.attachFile = data;
        break;
      }
      case 'attachFileViewableIdx': {
        draft.attachFileViewableIdx = data;
        break;
      }

      case 'attachFileInit': {
        draft.attachFile = null;
        draft.attachFileIdx = null;
        draft.attachFileViewableIdx = 0;
        break;
      }

      case 'attachFileDelete': {
        draft.attachFile.splice(data, 1);

        break;
      }

      case 'alertToast': {
        draft.alertToast = data.alertToast;
        draft.alertToastPosition = data.alertToastPosition;
        draft.alertToastMessage = data.alertToastMessage;
        break;
      }

      case 'alertToastInit': {
        draft.alertToast = false;
        draft.alertToastPosition = null;
        draft.alertToastMessage = null;
        break;
      }

      case 'dynamicLinkInfo': {
        draft.dynamicLinkUrl = data.dynamicLinkUrl;
        draft.dynamicLinkFlag = data.dynamicLinkFlag;
        break;
      }

      case 'dynamicLinkInfoInit': {
        draft.dynamicLinkUrl = INITIAL_STATE.dynamicLinkUrl;
        draft.dynamicLinkFlag = INITIAL_STATE.dynamicLinkFlag;
        break;
      }

      case 'handleFcmInfo': {
        draft.handleFcmInfoIdx = data.handleFcmInfoIdx;
        draft.handleFcmInfoFlag = data.handleFcmInfoFlag;
        break;
      }
      case 'totalImage': {
        draft.totalImageType = data.totalImageType;
        draft.totalImageList = data.totalImageList;
        break;
      }

      case 'totalSelectImageIndex': {
        draft.totalSelectImageIndex = data;
        break;
      }
      case 'isOpenKeyboard': {
        draft.isOpenKeyboard = data;
        break;
      }
      case 'homeTabRefreshYN': {
        draft.homeTabRefreshYN = data;
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [CommonTypes.FETCH_COMMON_REDUCER]: fetchCommonReducer,
});
