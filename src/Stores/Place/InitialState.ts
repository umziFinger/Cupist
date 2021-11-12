export const INITIAL_STATE: PlaceState['place'] = {
  aroundList: [],
  aroundListPage: 1,
  myAroundList: [],
  myAroundListPage: 1,

  myAroundSort: { index: 0, key: 'distance', value: '거리순' },
  location: {
    areaCode: '',
    lat: '',
    lng: '',
    areaName: '',
  },

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
  recentList: [],
  recentListPage: 1,
};

export interface PlaceState {
  place: {
    aroundList: Array<any>;
    aroundListPage: number | 1;
    myAroundList: Array<any>;
    myAroundListPage: number | 1;
    myAroundSort: { index: number; key: string; value: string };
    location: {
      areaCode: string;
      lat: string;
      lng: string;
      areaName: string;
    };
    placeDetail: PlaceDetail;
    placeDetailIdx: number | -1;
    placeTicketList: PlaceTicketList;
    recentList: Array<any>;
    recentListPage: number | 1;
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
