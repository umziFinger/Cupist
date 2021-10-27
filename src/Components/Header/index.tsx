import React from 'react';
import BackHeader from '@/Components/Header/BackHeader';
import HomeHeader from '@/Components/Header/HomeHeader';
import CloseHeader from './CloseHeader';

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
  style?: any;
  setStep?: any;
}

const Header = (props: HeaderProps) => {
  const { type, text, rightItem, mode, style, setStep } = props;

  switch (type) {
    case 'back':
      return <BackHeader type={type} text={text} mode={mode} />;
    case 'home':
      return <HomeHeader />;
    case 'close':
      return <CloseHeader />;
    default:
      return null;
  }
};

export default Header;
