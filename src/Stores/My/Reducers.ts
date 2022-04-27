import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE, reservationTabType } from '@/Stores/My/InitialState';
import { MyTypes } from './Actions';

export const fetchMyReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'init': {
        return INITIAL_STATE;
      }

      case 'myReviewInit': {
        draft.myReviewPage = data;
        draft.myReviewList = INITIAL_STATE.myReviewList;
        break;
      }

      case 'myReviewPage': {
        draft.myReviewPage = data;
        break;
      }

      case 'myReviewList': {
        if (actions.params.page === 1) {
          draft.myReviewList.writeableReview = data?.writeableReview;
          draft.myReviewList.writeReview = data?.writeReview;
        } else {
          draft.myReviewList.writeReview.concat(data.writeReview !== '' ? data.writeReview : []);
        }
        break;
      }

      case 'myCouponList': {
        if (actions.params.page === 1) {
          draft.myCouponList = data;
        } else {
          draft.myCouponList.coupon =
            data.coupon.length > 0
              ? draft.myCouponList?.coupon.concat(data.myCouponList.coupon)
              : draft.myCouponList.coupon;
        }
        break;
      }

      case 'usableCouponPage': {
        draft.usableCouponPage = data;
        break;
      }

      case 'expiredCouponPage': {
        draft.expiredCouponPage = data;
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

      case 'myNoticeList': {
        if (actions.params.page === 1) {
          draft.myNoticeList = data;
        } else {
          draft.myNoticeList = data.length > 0 ? draft.myNoticeList.concat(data) : draft.myNoticeList;
        }
        break;
      }

      case 'myNoticeListPage': {
        draft.myNoticeListPage = data;
        break;
      }

      case 'noticeListInit': {
        draft.myNoticeList = INITIAL_STATE.myNoticeList;
        draft.myNoticeListPage = INITIAL_STATE.myNoticeListPage;
        break;
      }

      case 'myNoticeDetail': {
        draft.myNoticeDetail = data;
        break;
      }

      case 'myEventList': {
        if (actions.params.page === 1) {
          draft.myEventList = data;
        } else {
          draft.myEventList = data.length > 0 ? draft.myEventList.concat(data) : draft.myEventList;
        }
        break;
      }

      case 'myEventListPage': {
        draft.myEventListPage = data;
        break;
      }

      case 'eventListInit': {
        draft.myEventList = INITIAL_STATE.myEventList;
        draft.myEventListPage = INITIAL_STATE.myEventListPage;
        break;
      }

      case 'myEventDetail': {
        draft.myEventDetail = data;
        break;
      }

      case 'qnaSelectedTab': {
        draft.qnaSelectedTab = data;
        break;
      }

      case 'myQnaList': {
        if (actions.params.page === 1) {
          draft.myQnaList = data;
        } else {
          draft.myQnaList = data.length > 0 ? draft.myQnaList.concat(data) : draft.myQnaList;
        }
        break;
      }

      case 'myQnaListPage': {
        draft.myQnaListPage = data;
        break;
      }

      case 'myQnaListInit': {
        draft.myQnaList = INITIAL_STATE.myEventList;
        draft.myQnaListPage = INITIAL_STATE.myEventListPage;
        draft.qnaSelectedTab = INITIAL_STATE.qnaSelectedTab;
        break;
      }

      case 'myQnaDetail': {
        draft.myQnaDetail = data;
        break;
      }
      case 'writeQnaContent': {
        draft.writeQnaContent = data;
        break;
      }
      case 'writeQnaValid': {
        draft.writeQnaValid = data;
        break;
      }
      case 'qnaType': {
        draft.qnaType = data;
        break;
      }
      case 'mySelectedTab': {
        draft.mySelectedTab = data;
        break;
      }

      case 'reservationList': {
        try {
          const key: reservationTabType['key'] = actions.params.state;
          if (actions.params.page === 1) {
            draft.reservationList[key] = data;
          } else {
            draft.reservationList[key] =
              data?.length > 0 ? draft.reservationList[key].concat(data) : draft.reservationList[key];
          }
        } catch (e) {
          console.log('reservationList Error: ', e);
        }

        break;
      }

      case 'reservationListPage': {
        try {
          const key: reservationTabType['key'] = actions.params.state;
          draft.reservationListPage[key] = data;
        } catch (e) {
          console.log(e);
        }

        break;
      }
      case 'reservationListPageInit': {
        draft.reservationListPage = INITIAL_STATE.reservationListPage;
        break;
      }
      case 'reservationSelectedTab': {
        draft.reservationSelectedTab = data;
        break;
      }
      case 'reservationDetail': {
        draft.reservationDetail = data;
        break;
      }
      case 'reservationCancelDetail': {
        draft.reservationCancelDetail = data;
        break;
      }

      case 'writeReviewInfo': {
        draft.writeReviewInfo = data;
        break;
      }

      case 'setWriteReview': {
        const key = data.key;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        draft.writeReviewInfo[key] = data.value;
        // console.log(draft.writeReviewInfo);
        break;
      }
      case 'clickedReviewItem': {
        draft.clickedReviewItem = data;
        break;
      }

      case 'myTabInit': {
        draft.reservationSelectedTab = INITIAL_STATE.reservationSelectedTab;
        draft.mySelectedTab = INITIAL_STATE.mySelectedTab;
        break;
      }

      case 'couponSelectedTab': {
        draft.couponSelectedTab = data;
        draft.myCouponList.coupon = INITIAL_STATE.myCouponList.coupon;
        break;
      }
      case 'selectedCouponGuide': {
        draft.selectedCouponGuide = data;
        break;
      }

      case 'ringmeList': {
        draft.ringmeList = data.commonCode;
        break;
      }

      case 'bankList': {
        draft.bankList = data.commonCode;
        break;
      }

      case 'isCheckedReservationDetail': {
        console.log('call reduer isCheckedReservationDetail : ', data);
        draft.isCheckedReservationDetail = data;
        break;
      }

      default:
        return draft;
    }

    return draft;
  });
};
export const reducer = createReducer(INITIAL_STATE, {
  [MyTypes.FETCH_MY_REDUCER]: fetchMyReducer,
});
