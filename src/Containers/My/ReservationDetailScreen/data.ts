export const INFO_ITEM: Array<InfoItemProp> = [
  { name: '전화하기', icon: require('@/Assets/Images/Common/icCall.png'), type: 'call' },
  { name: '주소복사', icon: require('@/Assets/Images/Common/icCopy.png'), type: 'addressCopy' },
  { name: '지도보기', icon: require('@/Assets/Images/Common/icMap.png'), type: 'mapView' },
  { name: '길찾기', icon: require('@/Assets/Images/Common/icNavi.png'), type: 'getDirections' },
];

export interface InfoItemProp {
  name: string;
  icon: Required<any>;
  type: InfoItemButtonType;
}

export type InfoItemButtonType = 'call' | 'addressCopy' | 'mapView' | 'getDirections';
