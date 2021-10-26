export const INITIAL_STATE = {
  searchQuery: '',
  selectMenu: '',
  recentSearch: [],
  all: {
    place: [],
    artist: [],
    drama: [],
  },
  artistList: [],
  dramaList: [],
  placeList: [],
  artistPage: 1,
  dramaPage: 1,
  placePage: 1,
  artistCnt: null,
  dramaCnt: null,
  placeCnt: null,
};
export interface SearchState {
  search: {
    searchQuery: string | '';
    selectMenu: string | '';
    recentSearch: Array<any>;
    all: any;
    artistList: Array<any>;
    dramaList: Array<any>;
    placeList: Array<any>;
    artistCnt: number | 0;
    dramaCnt: number | 0;
    placeCnt: number | 0;
    artistPage: number | 0;
    dramaPage: number | 0;
    placePage: number | 0;
  };
}
