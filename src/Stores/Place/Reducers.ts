import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Place/InitialState';
import { PlaceTypes } from './Actions';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';

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
        draft.placeDetail.event = data.event;
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
        draft.placeTicketList.normal = data.normal;
        draft.placeTicketList.free = data.free;
        break;
      }

      case 'placeMyAroundDibsHandler': {
        try {
          const copyMyAroundList: any = state.myAroundList;
          if (data.type === 'dibs') {
            const FIND_IDX = copyMyAroundList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.myAroundList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyMyAroundList?.findIndex((v: any) => v?.idx === data.placeIdx);
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
          if (data.type === 'dibs') {
            const FIND_IDX = copyRecentList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.recentList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyRecentList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.recentList[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('최근 본 볼링장 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'dibListDibsHandler': {
        try {
          const copyDibList: any = state.dibsList;
          if (data.type === 'dibs') {
            const FIND_IDX = copyDibList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.dibsList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyDibList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.dibsList[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'placeDetailDibsHandler': {
        try {
          const copyPlaceDetail: any = state?.placeDetail;
          if (data.type === 'dibs') {
            if (copyPlaceDetail !== undefined) {
              draft.placeDetail.place.isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            if (copyPlaceDetail !== undefined) {
              draft.placeDetail.place.isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('볼링장 상세 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'placeListDibsHandler': {
        try {
          const copyPlaceList: any = state.placeList;
          if (data.type === 'dibs') {
            const FIND_IDX = copyPlaceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.placeList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyPlaceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.placeList[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'hotPlaceListDibsHandler': {
        try {
          const copyHotPlaceList: any = state.hotPlaceList;
          if (data.type === 'dibs') {
            const FIND_IDX = copyHotPlaceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.hotPlaceList[FIND_IDX].isPlaceDibs = true;
            }
          } else if (data.type === 'unDibs') {
            const FIND_IDX = copyHotPlaceList?.findIndex((v: any) => v?.idx === data.placeIdx);
            if (FIND_IDX !== undefined && FIND_IDX !== -1) {
              draft.hotPlaceList[FIND_IDX].isPlaceDibs = false;
            }
          }
        } catch (e) {
          console.log('HOT 플레이스 리스트 찜하기 핸들러 에러: ', e);
        }
        break;
      }

      case 'selectedTicket': {
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
            draft.placeList[index].isSelectedNormal = false;
            draft.placeList[index].isSelectedFree = false;
            return null;
          });
        } else {
          draft.placeList = data.PlaceResult?.length > 0 ? draft.placeList.concat(data.PlaceResult) : draft.placeList;
          draft.placeList.map((item: any, index: number) => {
            if (draft.placeList[index].isSelectedNormal) {
              return null;
            }
            if (draft.placeList[index].isSelectedFree) {
              return null;
            }
            draft.placeList[index].isSelectedNormal = false;
            draft.placeList[index].isSelectedFree = false;
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
        draft.placeListPage = data;
        break;
      }

      case 'placeListType': {
        console.log('call reducer placeListType : ', data);
        draft.placeListType = data;
        break;
      }

      case 'isOpenTicketSlider': {
        let list = draft.placeList;
        if (data.type === 'dibs') {
          list = draft.dibsList;
        }
        const idx = list.findIndex((item) => item.idx === data.idx);
        if (idx > -1) {
          if (data.ticketType === TICKET_TYPE.NORMAL) {
            if (list[idx].isSelectedFree) {
              list[idx].isSelectedFree = false;
            }
            list[idx].isSelectedNormal = !list[idx].isSelectedNormal;
          }
          if (data.ticketType === TICKET_TYPE.FREE) {
            if (list[idx].isSelectedNormal) {
              list[idx].isSelectedNormal = false;
            }
            list[idx].isSelectedFree = !list[idx].isSelectedFree;
          }
        }
        break;
      }

      case 'selectedPlaceIdx': {
        draft.selectedPlaceIdx = data;
        break;
      }

      case 'hotPlaceList': {
        if (actions.params.page === 1) {
          draft.hotPlaceList = data.event;
        } else {
          draft.hotPlaceList = data.event?.length > 0 ? draft.hotPlaceList.concat(data.event) : draft.hotPlaceList;
        }
        break;
      }

      case 'hotPlaceListPage': {
        draft.hotPlaceListPage = data;
        break;
      }

      case 'hotPlaceListInit': {
        draft.hotPlaceList = [];
        break;
      }

      case 'eventHotDetail': {
        draft.eventHotDetail = data.event;
        break;
      }

      case 'dibsList': {
        if (actions.params.page === 1) {
          draft.dibsList = data.dibsResult;
          draft.dibsList.map((item: any, index: number) => {
            draft.dibsList[index].isSelectedNormal = false;
            draft.dibsList[index].isSelectedFree = false;
            return null;
          });
        } else {
          draft.dibsList = data.dibsResult?.length > 0 ? draft.dibsList.concat(data.dibsResult) : draft.dibsList;
          draft.dibsList.map((item: any, index: number) => {
            if (draft.dibsList[index].isSelectedNormal) {
              return null;
            }
            if (draft.dibsList[index].isSelectedFree) {
              return null;
            }
            draft.dibsList[index].isSelectedNormal = false;
            draft.dibsList[index].isSelectedFree = false;
            return null;
          });
        }
        break;
      }

      case 'dibsListPage': {
        draft.dibsListPage = data;
        break;
      }

      case 'selectedEventHotTab': {
        draft.selectedEventHotTab = data;
        break;
      }

      case 'homeAlbamonList': {
        if (actions.params.page === 1) {
          draft.homeAlbamonList = data;
        } else {
          draft.homeAlbamonList = data?.length > 0 ? draft.homeAlbamonList.concat(data) : draft.homeAlbamonList;
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
  [PlaceTypes.FETCH_PLACE_REDUCER]: fetchPlaceReducer,
});
