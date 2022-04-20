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
      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [AlbamonTypes.FETCH_ALBAMON_REDUCER]: fetchAlbamonReducer,
});
