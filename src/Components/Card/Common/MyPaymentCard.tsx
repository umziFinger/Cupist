import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PAYMENT_CARD_IMAGE } from '@/Components/Data/PAYMENT_CARD_IMAGE';
import CustomButton from '@/Components/CustomButton';
import ReservationActions from '@/Stores/Reservation/Actions';

interface PropTypes {
  item: any;
}

const MyPaymentCard = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { item } = props;

  const onPressDelete = () => {
    console.log('onPressDelete');
    dispatch(ReservationActions.fetchReservationDeleteCard({ idx: item?.idx }));
  };

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
        source={item?.cardImage ? { uri: item?.cardImage || '' } : require('@/Assets/Images/CreditCard/imgCardN.png')}
        resizeMode={FastImage.resizeMode.cover}
      />
      <CustomButton
        onPress={() => onPressDelete()}
        style={{
          position: 'absolute',
          top: -7,
          right: -7,
          zIndex: 999,
        }}
        hitSlop={10}
      >
        <View style={{ width: 26, height: 26 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Button/icCardDelect.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
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
