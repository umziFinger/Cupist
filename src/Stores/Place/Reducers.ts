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

      case 'placeDetail': {
        console.log('call reducer placeDetail : ', data.place);
        draft.placeDetail.place = data.place;
        draft.placeDetail.latestReview = data.latestReview;
        draft.placeDetail.starReview = data.starReview;
        draft.placeDetail.together = data.together;
        break;
      }

      case 'placeDetailIdx': {
        draft.placeDetailIdx = data;
        break;
      }

      case 'placeDetailInit': {
        console.log('call reducer placeDetailInit');
        draft.placeDetail = INITIAL_STATE.placeDetail;
        draft.placeDetailIdx = INITIAL_STATE.placeDetailIdx;
        break;
      }

      case 'placeMyAroundDibs': {
        try {
          const copyMyAroundList: any = state.myAroundList;

          const FIND_IDX = copyMyAroundList.findIndex((v: any) => v.idx === data.placeIdx);

          if (FIND_IDX !== -1) {
            draft.myAroundList[FIND_IDX].isPlaceDibs = true;
          }
        } catch (e) {
          console.log('내주변 리스트 볼링장 찜하기 에러: ', e);
        }
        break;
      }

      case 'placeMyAroundUnDibs': {
        try {
          const copyMyAroundList: any = state.myAroundList;

          const FIND_IDX = copyMyAroundList.findIndex((v: any) => v.idx === data.placeIdx);

          if (FIND_IDX !== -1) {
            draft.myAroundList[FIND_IDX].isPlaceDibs = false;
          }
        } catch (e) {
          console.log('내주변 리스트 볼링장 찜하기 해제 에러: ', e);
        }
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
