export const INITIAL_STATE = {
  loginCheckYN: 'N',
  homeList: {
    place: [],
    special: [],
    early: [],
    hotPlace: [],
    event: [],
  },
  isHomeLoaded: false,
  calendarDate: '',
  areaFilterIdx: 1,
  timeFilterIdx: 0,
};

export interface HomeState {
  home: {
    loginCheckYN: string | null;
    homeList: HomeList;
    isHomeLoaded: boolean | false;
    calendarDate: string | null;
    areaFilterIdx: number | 1;
    timeFilterIdx: number | 0;
  };
}

export interface HomeList {
  place: Array<any>;
  special: Array<any>;
  early: Array<any>;
  hotPlace: Array<any>;
  event: Array<any>;
}
