export const REVIEW_DATA_ME_MORE: Array<ReviewMoreItemProp> = [
  {
    idx: 1,
    title: '글 수정하기',
    selectKey: 'modify',
  },
  {
    idx: 2,
    title: '글 삭제하기',
    selectKey: 'remove',
  },
];
export const REVIEW_DATA_OTHER_MORE: Array<ReviewMoreItemProp> = [
  {
    idx: 1,
    title: '부적절한 리뷰로 신고하기',
    selectKey: 'report',
  },
];

export interface ReviewMoreItemProp {
  idx: number;
  title: string;
  selectKey: SelectKeyType;
}

type SelectKeyType = 'modify' | 'remove' | 'report';
