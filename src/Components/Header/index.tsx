import React from 'react';
import BackHeader from '@/Components/Header/BackHeader';
import HomeHeader from '@/Components/Header/HomeHeader';
import CloseHeader from './CloseHeader';

import MyAroundHeader from '@/Components/Header/MyAroundHeader';
import PlaceDetailHeader from './PlaceDetailHeader';

export interface HeaderProps {
  type?: string;
  text?: string;
  action?: any;
  data?: any;
  showBackBtn?: boolean; // 백 버튼 유무(authHeader)
  showCancelBtn?: boolean; // 취소 버튼 유무(authHeader)
  screenType?: string;
  rightItem?: React.ReactNode;
  isScroll?: boolean;
  isShow?: boolean;
}

const Header = (props: HeaderProps) => {
  const { type, text, isScroll, isShow } = props;

  switch (type) {
    case 'back':
      return <BackHeader type={type} text={text} />;
    case 'home':
      return <HomeHeader isShow={isShow} />;
    case 'close':
      return <CloseHeader text={text} />;

    case 'myAround':
      return <MyAroundHeader text={text} isScroll={isScroll} />;

    case 'placeDetail':
      return <PlaceDetailHeader isShow={isShow} />;

    default:
      return null;
  }
};

export default Header;
