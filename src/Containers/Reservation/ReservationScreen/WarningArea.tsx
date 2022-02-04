import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PlaceState } from '@/Stores/Place/InitialState';
import Config from '@/Config';

const WarningArea = () => {
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
          유의 사항
        </CustomText>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 8 }}>
        <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>
          {selectedTicket?.caution
            ? selectedTicket?.caution
            : selectedTicket?.eventType === 'normal'
            ? Config.NORMAL_CAUTION_INFO
            : Config.FREE_CAUTION_INFO}
        </CustomText>
      </View>
    </View>
  );
};

export default WarningArea;
