export const INITIAL_STATE = {
  placeDetailSelectedTab: {
    title: '시간제/자유볼링',
    key: 'default',
  },
};

export interface AlbamonState {
  albamon: {
    placeDetailSelectedTab: PlaceDetailTabType;
    placeAlbamonTicketList: PlaceAlbamonTicketList;
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
