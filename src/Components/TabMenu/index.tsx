import React from 'react';
import SearchTabMenu from '@/Components/TabMenu/SearchTabMenu';

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
    default:
      return null;
  }
};

export default TabMenu;
