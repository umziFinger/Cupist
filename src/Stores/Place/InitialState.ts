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
    event: [],
    user: {
      isWriteable: false,
      paymentIdx: null,
      ticketName: '',
    },
  },
  placeDetailIdx: -1,
  placeTicketList: {
    normal: [],
    free: [],
  },
  recentList: [],
  recentListPage: 1,
  selectedTicket: null,
  clickedReviewItem: null,
  placeReview: {
    review: [],
    user: {
      isWriteable: false,
      paymentIdx: null,
      ticketName: '',
    },
    reviewCnt: 0,
  },
  reviewListPage: 1,
  placeList: [],
  placeListPage: 1,
  placeListType: '',
  selectedPlaceIdx: -1,
  hotPlaceList: [],
  hotPlaceListPage: 1,
  dibsList: [],
  dibsListPage: 1,
  eventHotDetail: null,
  selectedEventHotTab: null,
  homeAlbamonList: [],
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
    selectedTicket: any | null;
    clickedReviewItem: any;
    placeReview: placeReview;
    reviewListPage: number | 1;
    placeList: Array<any>;
    placeListPage: number | 1;
    placeListType: string;
    selectedPlaceIdx: number;
    hotPlaceList: Array<any>;
    hotPlaceListPage: number | 1;
    dibsList: Array<any>;
    dibsListPage: 1;
    eventHotDetail: EventHotType | null;
    selectedEventHotTab: EventHotSortType | null;
    homeAlbamonList: Array<any>;
  };
}

interface placeReview {
  review: Array<any> | [];
  user: {
    isWriteable: true | false;
    paymentIdx: number | null;
    ticketName: string | '';
  };
  reviewCnt: number | 0;
}

export interface PlaceDetail {
  place: any | {};
  latestReview: Array<any> | [];
  starReview: Array<any> | [];
  together: Array<any> | [];
  event: Array<any> | [];
  user: {
    isWriteable: true | false;
    paymentIdx: number | null;
    ticketName: string | '';
  };
}

interface PlaceTicketList {
  normal: Array<any> | [];
  free: Array<any> | [];
}

interface EventHotType {
  idx: number;
  type: string;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
  hitCnt: number;
  regDate: string;
  updateDate: string;
  deleteDate: null;
  PlaceEventPhoto: any;
  placeIdx: number;
  placeName: string;
  placePhoto: string;
  area: string;
}

export type EventHotSortType =
  | { name: '최신순'; category: 'latest' }
  | { name: '인기순'; category: 'hit' }
  | { name: '추천순'; category: 'recommend' };
