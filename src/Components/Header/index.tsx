import React from 'react';
import BackHeader from '@/Components/Header/BackHeader';
import HomeHeader from '@/Components/Header/HomeHeader';
import CloseHeader from './CloseHeader';

import MyAroundHeader from '@/Components/Header/MyAroundHeader';
import PlaceDetailHeader from './PlaceDetailHeader';

import PlaceReviewHeader from '@/Components/Header/PlaceReviewHeader';
import PlaceListHeader from '@/Components/Header/PlaceListHeader';

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
  activeFilter?: boolean;
}

const Header = (props: HeaderProps) => {
  const { type, text, isScroll, isShow, activeFilter } = props;

  switch (type) {
    case 'back':
      return <BackHeader type={type} text={text} />;
    case 'home':
      return <HomeHeader isShow={isShow} />;
    case 'close':
      return <CloseHeader text={text} />;

    case 'myAround':
      return <MyAroundHeader text={text} isScroll={isScroll} activeFilter={activeFilter} />;

    case 'placeDetail':
      return <PlaceDetailHeader isShow={isShow} />;

    case 'placeReview':
      return <PlaceReviewHeader />;

    case 'placeList':
      return <PlaceListHeader text={text} isShow={isShow} />;

    default:
      return null;
  }
};

export default Header;
