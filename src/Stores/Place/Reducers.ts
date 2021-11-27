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

      case 'recentList': {
        try {
          if (actions.params.page === 1) {
            console.log('asdjfklsajfl: ', data);
            draft.recentList = data;
          } else {
            draft.recentList = data?.length > 0 ? draft.recentList.concat(data) : draft.recentList;
          }
          // console.log(current(draft));
        } catch (e) {
          console.log(e);
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
        draft.placeTicketList = INITIAL_STATE.placeTicketList;
        break;
      }

      case 'placeTicketList': {
        draft.placeTicketList.morning = data.morning;
        draft.placeTicketList.afternoon = data.afternoon;
        draft.placeTicketList.night = data.night;
        break;
      }

      case 'placeMyAroundDibsHandler': {
        try {
          const copyMyAroundList: any = state.myAroundList;
          if (data.status === 'dibs') {
            const FIND_IDX = copyMyAroundList?.findIndex((v: any) => v.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.myAroundList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.status === 'unDibs') {
            const FIND_IDX = copyMyAroundList?.findIndex((v: any) => v.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.myAroundList[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('내주변 리스트 볼링장 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'recentPlaceDibsHandler': {
        try {
          const copyRecentList: any = state.recentList;
          if (data.status === 'dibs') {
            const FIND_IDX = copyRecentList?.findIndex((v: any) => v.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.recentList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.status === 'unDibs') {
            const FIND_IDX = copyRecentList?.findIndex((v: any) => v.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.recentList[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('최근 본 볼링장 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'selectedTicket': {
        console.log('call reducer selectedTicket: ', data);
        draft.selectedTicket = data;
        break;
      }

      case 'clickedReviewItem': {
        draft.clickedReviewItem = data;
        break;
      }

      case 'placeReview': {
        try {
          if (actions.params.page === 1) {
            draft.placeReview = data;
          } else {
            draft.placeReview.review =
              data.review?.length > 0 ? draft.placeReview.review.concat(data.review) : draft.placeReview.review;
          }
        } catch (e) {
          console.log(e);
        }
        break;
      }

      case 'placeList': {
        if (actions.params.page === 1) {
          draft.placeList = data.PlaceResult;
          draft.placeList.map((item: any, index: number) => {
            draft.placeList[index].isSelected = false;
            return null;
          });
        } else {
          draft.placeList = data.PlaceResult?.length > 0 ? draft.placeList.concat(data.PlaceResult) : draft.placeList;
          draft.placeList.map((item: any, index: number) => {
            draft.placeList[index].isSelected = false;
            return null;
          });
        }
        break;
      }

      case 'reviewListPage': {
        draft.reviewListPage = data;
        break;
      }

      case 'reviewDelete': {
        const copyReviewList: any = state.placeReview.review;
        draft.placeReview.review = copyReviewList.filter((v: any) => v?.idx !== data.reviewIdx);
        break;
      }

      case 'placeListPage': {
        console.log('call reducer placeListPage : ', data);
        draft.placeListPage = data;
        break;
      }

      case 'placeListType': {
        console.log('call reducer placeListType : ', data);
        draft.placeListType = data;
        break;
      }

      case 'togglePlaceCheck': {
        console.log('call reducer togglePlaceCheck : ', data);
        const idx = draft.placeList.findIndex((item) => item.idx === data);
        if (idx > -1) {
          draft.placeList[idx].isSelected = !draft.placeList[idx].isSelected;
        }
        break;
      }

      case 'selectedPlaceIdx': {
        console.log('call reducer selectedPlaceIdx : ', data);
        draft.selectedPlaceIdx = data;
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [PlaceTypes.FETCH_PLACE_REDUCER]: fetchPlaceReducer,
});
