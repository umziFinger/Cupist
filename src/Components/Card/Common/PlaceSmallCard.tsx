import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

interface PropTypes {
  item: any;
}
const PlaceSmallCard = (props: PropTypes) => {
  const { item } = props;
  return (
    <View style={{ borderRadius: 4, borderWidth: 1, borderColor: Color.Grayyellow200, backgroundColor: Color.White }}>
      <CustomText style={{ color: '#333', fontSize: 14 }}>PlaceSmallCard</CustomText>
    </View>
  );
};

export default PlaceSmallCard;
