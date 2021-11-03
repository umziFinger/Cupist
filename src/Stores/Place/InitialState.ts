export const INITIAL_STATE = {
  aroundList: [],
  aroundListPage: 1,
  myAroundList: [],
  myAroundListPage: 1,
};
export interface PlaceState {
  place: {
    aroundList: Array<any>;
    aroundListPage: number | 1;
    myAroundList: Array<any>;
    myAroundListPage: number | 1;
  };
}
