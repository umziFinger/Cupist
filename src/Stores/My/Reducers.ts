import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/My/InitialState';
import { MyTypes } from './Actions';

export const fetchMyReducer = produce((draft, actions: any) => {
  const { type, data } = actions.params;

  switch (type) {
    case 'init': {
      return INITIAL_STATE;
    }

    case 'myReviewInit': {
      draft.myReviewPage = data;
      draft.myReviewList = [];
      break;
    }

    case 'myReviewPage': {
      draft.myReviewPage = data;
      break;
    }

    case 'myReviewList': {
      if (actions.params.page === 1) {
        draft.myReviewList = data;
      } else {
        draft.myReviewList.push(data !== '' ? data : []);
      }
      break;
    }

    case 'myCouponPage': {
      draft.myCouponPage = data;
      break;
    }

    case 'myCouponList': {
      if (actions.params.page === 1) {
        draft.myCouponList = data.promotion;
      } else {
        draft.myCouponList = data.promotion.length > 0 ? draft.myCouponList.concat(data.promotion) : draft.myCouponList;
      }
      break;
    }

    case 'myPointList': {
      if (actions.params.page === 1) {
        draft.myPointList = data.mileage.data;
        draft.total_mileage = data.total_mileage;
      } else {
        draft.myPointList =
          data.mileage.data.length > 0 ? draft.myPointList.concat(data.mileage.data) : draft.myPointList;
      }
      break;
    }

    case 'myPointListPage': {
      draft.myPointListPage = data;
      break;
    }

    case 'moreScreenRenderItem': {
      draft.moreScreenRenderItem = INITIAL_STATE.moreScreenRenderItem;
      break;
    }

    default:
      return draft;
  }
  return draft;
});

export const reducer = createReducer(INITIAL_STATE, {
  [MyTypes.FETCH_MY_REDUCER]: fetchMyReducer,
});
