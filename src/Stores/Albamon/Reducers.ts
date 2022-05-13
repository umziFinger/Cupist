import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Albamon/InitialState';
import { AlbamonTypes } from '@/Stores/Albamon/Actions';

export const fetchAlbamonReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft: any) => {
    switch (type) {
      case 'placeDetailSelectedTab': {
        draft.placeDetailSelectedTab = data;
        break;
      }
      case 'placeDetailSelectedTabInit': {
        draft.placeDetailSelectedTab = INITIAL_STATE.placeDetailSelectedTab;
        break;
      }
      case 'albamonDate': {
        draft.albamonDate = data;
        break;
      }
      case 'competitionsRegistInfo': {
        draft.competitionsRegistInfo = data;
        break;
      }
      case 'competitionsPaymentInfo': {
        draft.competitionsPaymentInfo = data;
        break;
      }
      case 'competitionsPaymentResult': {
        draft.competitionsPaymentResult = data;
        break;
      }
      case 'competitionPlaceSearchList': {
        draft.competitionPlaceSearchList = data;
        break;
      }
      case 'competitionClubSearchList': {
        draft.competitionClubSearchList = data;
        break;
      }
      case 'paymentVerifyData': {
        draft.paymentVerifyData = data;
        break;
      }
      case 'permissionCheck': {
        draft.permissionCheck = data;
        break;
      }
      case 'competitionVerifyData': {
        draft.competitionVerifyData = data;
        break;
      }
      // 간편결제 | 다른 결제수단
      case 'paymentType': {
        console.log('call reducer paymentType : ', data);
        if (data === 'simple') {
          draft.paymentMethod = -1;
        }
        draft.paymentType = data;
        break;
      }

      case 'paymentMethod': {
        console.log('call reducer paymentMethod : ', data);
        draft.paymentMethod = data;
        break;
      }
      case 'selcetedCardIdx': {
        console.log('call reducer selcetedCardIdx : ', data);
        draft.selcetedCardIdx = data;
        break;
      }
      case 'isCompetitionProgress': {
        draft.isCompetitionProgress = data;
        break;
      }
      case 'registData': {
        draft.registData = data;
        break;
      }
      case 'registDataInit': {
        draft.registData = INITIAL_STATE.registData;
        break;
      }
      case 'isReturn': {
        draft.isReturn = data;
        break;
      }
      case 'isAlbamonPayment': {
        draft.isAlbamonPayment = data;
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [AlbamonTypes.FETCH_ALBAMON_REDUCER]: fetchAlbamonReducer,
});
