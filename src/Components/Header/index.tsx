import React from 'react';
import BackHeader from '@/Components/Header/BackHeader';
import HomeHeader from '@/Components/Header/HomeHeader';
import CloseHeader from './CloseHeader';
import PlaceDetailHeader from './PlaceDetailHeader';

export enum MODE {
  DARK = 'dark',
  DARK2 = 'dark2',
  LIGHT = 'light',
  GRAY = 'gray',
}

export interface HeaderProps {
  type?: string;
  text?: string;
  action?: any;
  data?: any;
  showBackBtn?: boolean; // 백 버튼 유무(authHeader)
  showCancelBtn?: boolean; // 취소 버튼 유무(authHeader)
  screenType?: string;
  rightItem?: React.ReactNode;
  mode?: MODE;
}

const Header = (props: HeaderProps) => {
  const { type, text, mode } = props;

  switch (type) {
    case 'back':
      return <BackHeader type={type} text={text} mode={mode} />;
    case 'home':
      return <HomeHeader />;
    case 'close':
      return <CloseHeader text={text} />;
    case 'placeDetail':
      return <PlaceDetailHeader />;
    default:
      return null;
  }
};

export default Header;
