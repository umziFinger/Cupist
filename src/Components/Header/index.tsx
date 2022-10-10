import React from 'react';
import BackHeader from '@/Components/Header/BackHeader';

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
    default:
      return null;
  }
};

export default Header;
