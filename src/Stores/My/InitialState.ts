export const INITIAL_STATE = {
  myReviewPage: 0,
  myReviewList: [],
  myCouponPage: 1,
  myCouponList: [],
  myPointList: [],
  myPointListPage: 0,
  total_mileage: 0,
};
export interface MyState {
  my: {
    myReviewPage: number;
    myReviewList: any[];
    myCouponPage: number;
    myCouponList: any[];
    myPointList: any[];
    myPointListPage: number;
    total_mileage: number;
  };
}
