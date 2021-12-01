import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Home/InitialState';
import { HomeTypes } from '@/Stores/Home/Actions';

export const fetchHomeReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'loginCheckYN': {
        draft.loginCheckYN = data.loginCheckYN;
        break;
      }

      case 'homeList': {
        // draft.homeList.early = data.early;
        draft.homeList.special = data.special;
        draft.homeList.hotPlace = data.hotPlace;
        draft.homeList.event = data.event;
        draft.isHomeLoaded = true;
        break;
      }

      case 'isHomeLoaded': {
        draft.isHomeLoaded = data;
        break;
      }

      case 'calendarDate': {
        draft.calendarDate = data;
        break;
      }

      case 'prepaymentDate': {
        console.log('call reducer prepaymentDate : ', data);
        draft.prepaymentDate = data;
        break;
      }

      case 'directReservationList': {
        draft.homeList.place = data.place;
        break;
      }

      case 'prepaymentPriceList': {
        draft.homeList.early = data.early;
        break;
      }

      case 'areaFilterIdx': {
        draft.areaFilterIdx = data;
        break;
      }

      case 'timeFilterIdx': {
        draft.timeFilterIdx = data;
        break;
      }

      case 'possibleDirectDate': {
        draft.possibleDirectDate = data?.date || '';
        break;
      }

      case 'selectedDirectIdx': {
        draft.selectedDirectIdx = data;
        break;
      }

      case 'selectedDirectName': {
        draft.selectedDirectName = data;
        break;
      }

      case 'prepaymentDateList': {
        draft.prepaymentDateList = data.dateArray;
        break;
      }

      case 'directReservationDibsHandler': {
        try {
          const copyDirectReservationList: any = state.homeList.place;
          if (data.type === 'dibs') {
            const FIND_IDX = copyDirectReservationList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.homeList.place[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyDirectReservationList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.homeList.place[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('바로예약 볼링장 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'quickPriceDibsHandler': {
        try {
          const copyQuickPriceList: any = state.homeList.special;
          if (data.type === 'dibs') {
            const FIND_IDX = copyQuickPriceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.homeList.special[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyQuickPriceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.homeList.special[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('빨리 특가 볼링장 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'hotPlaceDibsHandler': {
        try {
          const copyHotPlaceList: any = state.homeList.hotPlace;
          if (data.type === 'dibs') {
            const FIND_IDX = copyHotPlaceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.homeList.hotPlace[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyHotPlaceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.homeList.hotPlace[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('HOT 볼링장 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [HomeTypes.FETCH_HOME_REDUCER]: fetchHomeReducer,
});
