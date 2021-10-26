import React from 'react';
import ChoiceDialog from '@/Components/Dialog/ChoiceDialog';
import ConfirmDialog from '@/Components/Dialog/ConfirmDialog';

export interface DialogProps {
  item: any;
}

const Dialog = (props: DialogProps) => {
  const { item } = props;
  switch (item.type) {
    case 'choice':
      return <ChoiceDialog item={item} />;
    case 'confirm':
      return <ConfirmDialog item={item} />;
    default:
      return <ConfirmDialog item={item} />;
  }
};

export default Dialog;
