import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { DATA_PERMISSION_DETAILS } from '@/Components/Data/DATA_PERMISSION_DETAILS';

const CancelInfoArea = () => {
  const { reservationInfo } = useSelector((state: ReservationState) => state.reservation);
  const cancelLimit = reservationInfo?.cancelLimit || moment().format('YYYY년 MM월 DD일 HH시 mm분');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
          무료 취소 가능
        </CustomText>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 20 }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
          {moment(cancelLimit).format('YYYY년 MM월 DD일 HH시 mm분')}까지 취소가 가능합니다.
        </CustomText>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 8 }}>
        <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>
          이후 예약을 취소할 경우 전액 취소 수수료가 부과될 수 있습니다.
        </CustomText>
      </View>
      <CustomButton
        onPress={() => navigate('PermissionDetailScreen', { agreeIdx: 5, detailArr: DATA_PERMISSION_DETAILS })}
      >
        <View style={{ justifyContent: 'center', marginTop: 18 }}>
          <CustomText style={{ color: Color.Error, fontSize: 11, fontWeight: '500', textDecorationLine: 'underline' }}>
            나중에 예약을 취소하면 어떻게 되나요?
          </CustomText>
        </View>
      </CustomButton>
    </View>
  );
};

export default CancelInfoArea;
