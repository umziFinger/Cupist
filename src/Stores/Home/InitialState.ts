export const INITIAL_STATE: HomeState['home'] = {
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
  prepaymentDate: '',
  areaFilterIdx: 1,
  timeFilterIdx: 0,
  possibleDirectDate: '',
  selectedDirectIdx: -1,
  selectedDirectName: '',
  prepaymentDateList: [],
};

export interface HomeState {
  home: {
    loginCheckYN: string | null;
    homeList: HomeList;
    isHomeLoaded: boolean | false;
    calendarDate: string | null;
    prepaymentDate: string | null;
    areaFilterIdx: number | 1;
    timeFilterIdx: number | 0;
    possibleDirectDate: string | null;
    selectedDirectIdx: number | -1;
    selectedDirectName: string | '';
    prepaymentDateList: Array<any>;
  };
}

interface HomeList {
  place: Array<any>;
  special: Array<any>;
  early: Array<any>;
  hotPlace: Array<any>;
  event: Array<any>;
}
