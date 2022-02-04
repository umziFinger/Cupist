import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomCheckBox from '@/Components/Card/CustomCheckBox';
import CustomButton from '@/Components/CustomButton';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';

interface PropTypes {
  idx: number;
  ticketType: TICKET_TYPE;
  item: any;
  onValueChange: any;
}

const TicketTypeBox = (props: PropTypes) => {
  const { idx, ticketType, item, onValueChange } = props;
  const title = ticketType === TICKET_TYPE.NORMAL ? '시간제볼링' : '자유볼링';

  return (
    <CustomButton style={{ flex: 1 }} onPress={() => onValueChange({ checkType: idx, ticketType })}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 12,
          paddingRight: 8,
          paddingVertical: 8,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', marginRight: 3 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.2 }}>{title}</CustomText>
          </View>
          <View style={{ justifyContent: 'center', marginRight: 3 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
              {item[ticketType]?.length || 0}
            </CustomText>
          </View>
        </View>
        <CustomCheckBox
          type={item?.idx}
          value={ticketType === TICKET_TYPE.NORMAL ? item?.isSelectedNormal : item?.isSelectedFree}
          onValueChange={onValueChange}
          enableIcon={require('@/Assets/Images/Button/icArrowPdUp.png')}
          disableIcon={require('@/Assets/Images/Button/icArrowPdDw.png')}
        />
      </View>
    </CustomButton>
  );
};

export default TicketTypeBox;
