export const INITIAL_STATE = {
  searchQuery: '',
  bowlingList: {
    place: [],
    placeCount: 0,
  },
  bowlingListPage: 1,
};
export interface SearchState {
  search: {
    bowlingList: {
      place: Array<any>;
      placeCount: number | 0;
    };
    searchQuery: string | '';
    bowlingListPage: number | 0;
  };
}
