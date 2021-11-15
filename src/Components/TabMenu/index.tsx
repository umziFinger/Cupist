import React from 'react';
import SearchTabMenu from '@/Components/TabMenu/SearchTabMenu';
import NotificationTabMenu from '@/Components/TabMenu/NotificationTabMenu';
import QnaTabMenu from '@/Components/TabMenu/QnaTabMenu';
import MyTabMenu from '@/Components/TabMenu/MyTabMenu';
import ReservationTabMenu from '@/Components/TabMenu/ReservationTabMenu';

interface TabMenuProps {
  type: string;
  data: any;
}
const TabMenu = (props: TabMenuProps) => {
  const { type, data } = props;
  // console.log('type', type);
  switch (type) {
    case 'search':
      return <SearchTabMenu type={type} data={data} />;
    case 'notification':
      return <NotificationTabMenu type={type} data={data} />;
    case 'qna':
      return <QnaTabMenu type={type} data={data} />;
    case 'my':
      return <MyTabMenu type={type} data={data} />;
    case 'reservation':
      return <ReservationTabMenu type={type} data={data} />;
    default:
      return null;
  }
};

export default TabMenu;
