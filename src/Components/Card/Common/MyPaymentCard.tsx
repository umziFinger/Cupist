import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PAYMENT_CARD_IMAGE } from '@/Components/Data/PAYMENT_CARD_IMAGE';

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
      <FastImage
        style={{ width: '100%', height: '100%' }}
        source={PAYMENT_CARD_IMAGE(item?.cardCode)}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: -10,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View>
          <CustomText style={{ color: '#333', fontSize: 15, fontWeight: '500' }}>{item?.cardNo}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default MyPaymentCard;
