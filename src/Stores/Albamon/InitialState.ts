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
  paymentVerifyData: {
    impUid: '',
    merchantUid: '',
    competitionJoinIdx: -1,
  },
  permissionCheck: false,
  competitionVerifyData: {},
  paymentType: '',
  paymentMethod: -1,
  selcetedCardIdx: -1,
  isCompetitionProgress: true,
  registData: {
    gender: '',
    name: '',
    phoneNumber: '',
    placeIdx: -1,
    clubName: '',
    placeName: '',
  },
  isReturn: false,
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
    paymentVerifyData: PaymentVerifyDataType;
    permissionCheck: boolean;
    competitionVerifyData: any;
    paymentType: string;
    paymentMethod: number | -1;
    selcetedCardIdx: number | -1;
    isCompetitionProgress: boolean;
    registData: {
      gender: string;
      name: string;
      phoneNumber: string;
      placeIdx: number;
      clubName: string;
      placeName: string;
    };
    isReturn: boolean;
  };
}

interface PaymentVerifyDataType {
  impUid: string;
  merchantUid: string;
  competitionJoinIdx: number;
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
