import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Place/InitialState';
import { PlaceTypes } from './Actions';

export const fetchPlaceReducer = (state = INITIAL_STATE, actions: any) => {
  return produce(state, (draft) => {
    const { type, data } = actions.params;

    switch (type) {
      case 'init': {
        return INITIAL_STATE;
      }
      case 'aroundList': {
        if (actions.params.page === 1) {
          draft.aroundList = data;
        } else {
          draft.aroundList = data?.length > 0 ? draft.aroundList.concat(data) : draft.aroundList;
        }
        break;
      }
      case 'aroundListPage': {
        draft.aroundListPage = data;
        break;
      }

      case 'myAroundList': {
        if (actions.params.page === 1) {
          draft.myAroundList = data;
        } else {
          draft.myAroundList = data?.length > 0 ? draft.myAroundList.concat(data) : draft.myAroundList;
        }
        break;
      }
      case 'myAroundListPage': {
        draft.myAroundListPage = data;
        break;
      }
      case 'location': {
        draft.location = data;
        break;
      }

      case 'locationInit': {
        draft.location.areaCode = INITIAL_STATE.location.areaCode;
        draft.location.lat = INITIAL_STATE.location.lat;
        draft.location.lng = INITIAL_STATE.location.lng;
        break;
      }

      case 'myAroundSort': {
        draft.myAroundSort = data;
        break;
      }

      default:
        return data;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [PlaceTypes.FETCH_PLACE_REDUCER]: fetchPlaceReducer,
});
