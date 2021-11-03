export const INITIAL_STATE = {
  searchQuery: '',
  bowlingList: {
    place: [],
    placeCount: 0,
  },
  bowlingListPage: 1,
  areaList: [],
  searchedAreaList: [],
};
export interface SearchState {
  search: {
    bowlingList: {
      place: Array<any>;
      placeCount: number | 0;
    };
    searchQuery: string | '';
    bowlingListPage: number | 0;
    areaList: Array<any>;
    searchedAreaList: Array<any>;
  };
}
