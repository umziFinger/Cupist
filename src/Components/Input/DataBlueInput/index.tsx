import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

interface PropsType {
  title: string;
  data: string;
  onPressData?: Function;
  color?: any;
}

const DataBlueInput = (props: PropsType) => {
  const { title, data, onPressData, color } = props;
  return (
    <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
      <CustomText style={{ flex: 0.35, fontSize: 16 }}>{title || ''}</CustomText>
      <CustomButton
        onPress={() => (onPressData ? onPressData() : {})}
        style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}
      >
        <CustomText style={{ fontSize: 16, color: color || Color.GlamBlue }}>{data || ''}</CustomText>
      </CustomButton>
    </View>
  );
};
export default DataBlueInput;
