export const INITIAL_STATE = {
  aroundList: [],
  aroundListPage: 1,
  myAroundList: [],
  myAroundListPage: 1,
  placeDetail: {
    place: {},
    latestReview: [],
    starReview: [],
    together: [],
  },
  placeDetailIdx: -1,
  placeTicketList: {
    morning: [],
    afternoon: [],
    night: [],
  },
};

export interface PlaceState {
  place: {
    aroundList: Array<any>;
    aroundListPage: number | 1;
    myAroundList: Array<any>;
    myAroundListPage: number | 1;
    placeDetail: PlaceDetail;
    placeDetailIdx: number | -1;
    placeTicketList: PlaceTicketList;
  };
}

interface PlaceDetail {
  place: any | {};
  latestReview: Array<any> | [];
  starReview: Array<any> | [];
  together: Array<any> | [];
}

interface PlaceTicketList {
  morning: Array<any> | [];
  afternoon: Array<any> | [];
  night: Array<any> | [];
}
