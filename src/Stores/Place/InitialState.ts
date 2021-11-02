export const INITIAL_STATE = {
  aroundList: [],
  aroundListPage: 1,
};
export interface PlaceState {
  place: {
    aroundList: Array<any>;
    aroundListPage: number | 1;
  };
}
