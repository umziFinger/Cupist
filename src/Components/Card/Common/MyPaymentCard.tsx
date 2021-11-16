import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { navigate } from '@/Services/NavigationService';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  item: any;
}

const MyPaymentCard = (props: PropTypes) => {
  const { width } = useWindowDimensions();
  const { item } = props;

  return (
    <View
      style={{
        borderRadius: 5,
        borderColor: Color.Grayyellow200,
        backgroundColor: Color.Primary1000,
        width: width * 0.6,
        height: width * 0.6 * 0.62,
      }}
    >
      <View style={{}}>
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: '#333', fontSize: 20 }}>{item?.cardName}</CustomText>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: '#333', fontSize: 20 }}>{item?.cardNo}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default MyPaymentCard;
