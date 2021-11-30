export const INITIAL_STATE = {
  searchQuery: '',
  bowlingList: {
    place: [],
    placeCount: 0,
  },
  bowlingListPage: 1,
  areaList: [],
  searchedAreaList: [],
  recentSearch: [],
  popularList: [],
};
export interface SearchState {
  search: {
    bowlingList: {
      place: Array<any>;
      placeCount: number | 0;
    };
    searchQuery: string | '';
    bowlingListPage: number | 0;
    areaList: any;
    searchedAreaList: Array<any>;
    recentSearch: Array<any>;
    popularList: Array<any>;
  };
}
