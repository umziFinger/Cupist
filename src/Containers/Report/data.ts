export enum userReportType {
  COPYRIGHT = '저작권 침해 우려됨',
  DISGUSTING = '혐오스러움',
  OBSCENE = '외설적임',
  ADVERTISEMENT = '지나친 광고성 게시물',
  FRAUD = '사기 피해 우려가 있음',
}

export const REPORT_CODE: Array<reportType> = [
  {
    idx: 0,
    reportCode: userReportType.COPYRIGHT,
    check: false,
  },
  {
    idx: 1,
    reportCode: userReportType.DISGUSTING,
    check: false,
  },
  {
    idx: 2,
    reportCode: userReportType.OBSCENE,
    check: false,
  },
  {
    idx: 3,
    reportCode: userReportType.ADVERTISEMENT,
    check: false,
  },
  {
    idx: 4,
    reportCode: userReportType.FRAUD,
    check: false,
  },
];

export interface reportType {
  idx: number;
  reportCode: userReportType;
  check: boolean;
}
