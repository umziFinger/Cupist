export const INITIAL_STATE = {
  placeDetailSelectedTab: {
    title: '시간제/자유볼링',
    key: 'default',
  },
  albamonDate: '',
  competitionsRegistInfo: '',
  competitionsPaymentInfo: '',
  competitionsPaymentResult: '',
  competitionPlaceSearchList: [],
  competitionClubSearchList: [],
};

export interface AlbamonState {
  albamon: {
    placeDetailSelectedTab: PlaceDetailTabType;
    placeAlbamonTicketList: PlaceAlbamonTicketList;
    albamonDate: string | null;
    competitionsRegistInfo: any;
    competitionsPaymentInfo: any;
    competitionsPaymentResult: any;
    competitionPlaceSearchList: any;
    competitionClubSearchList: any;
  };
}

interface PlaceAlbamonTicketList {
  morning: Array<any> | [];
  afternoon: Array<any> | [];
  nighttime: Array<any> | [];
}

export interface PlaceDetailTabType {
  title: string;
  key: string;
}

export enum ALBAMON_TICKET_TYPE {
  ALL = 'all',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHTTIME = 'nighttime',
}
