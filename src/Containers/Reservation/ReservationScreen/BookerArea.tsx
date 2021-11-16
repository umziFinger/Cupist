import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PlaceState } from '@/Stores/Place/InitialState';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  item: any;
}

const BookerArea = (props: PropTypes) => {
  const { item } = props;
  const { placeDetail, selectedTicket } = useSelector((state: PlaceState) => state.place);
  const place: any = placeDetail?.place || {};

  const onPressEdit = () => {
    console.log('onPressEdit');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
              예약자정보
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13 }}>{item?.username} / </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13 }}>{item?.mobile}</CustomText>
            </View>
          </View>
        </View>
        <CustomButton onPress={() => onPressEdit()} style={{ justifyContent: 'center' }} hitSlop={10}>
          <View>
            <CustomText style={{ color: Color.Primary1000, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
              변경하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default BookerArea;
