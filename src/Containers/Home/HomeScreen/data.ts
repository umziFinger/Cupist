export const DATA_TIME_FILTER = [
  { idx: 0, key: 'all', startTime: '00:00:00', endTime: '24:00:00', content: '전체' },
  { idx: 1, key: 'normal', startTime: '00:00:00', endTime: '24:00:00', content: '시간제' },
  { idx: 2, key: 'free', startTime: '00:00:00', endTime: '24:00:00', content: '자유볼링' },
  // { idx: 1, key: '7to12', startTime: '07:00:00', endTime: '12:00:00', content: '오전 7시 - 12시' },
  // { idx: 2, key: '13to19', startTime: '13:00:00', endTime: '19:00:00', content: '오후 1시 - 7시' },
  // { idx: 3, key: '20to24', startTime: '20:00:00', endTime: '24:00:00', content: '야간 8시 - 12시' },
];

export const DATA_HOME_TOOLTIP = {
  normal: {
    height: 100,
    content: `1시간 단위로 예약하여 게임 수 상관없이 무제한으로 즐길 수 있는 상품입니다. (레인 렌털)\n소모임 또는 단체 회식으로 이용하게 된다면 너무 편리하겠죠?\n게임 수가 아닌 시간제라는 것을 잊지 마세요!`,
  },
  free: {
    height: 120,
    content: `자유볼링은 정해진 시간 동안 무제한으로 즐길 수 있는 상품입니다.\n단, 공유 레인으로 해당 시간 상품을 구매하신 볼러분들과 함께 칠 수 있습니다.\n볼링을 즐기는 볼러분들과 함께 볼링을 치고 싶을 때 이용하는 것을 추천합니다!`,
  },
  event: {
    content: `볼링장마다 캡슐, 솔로, 룰렛 등 수많은 이벤트가 있습니다.\n이벤트 진행을 확인 후 방문하세요!`,
  },
};
