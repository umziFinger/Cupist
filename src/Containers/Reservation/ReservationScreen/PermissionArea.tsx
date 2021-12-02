import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

const PermissionArea = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
          이용 동의
        </CustomText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <CustomText style={{ lineHeight: 20 }}>
          <CustomButton
            onPress={() => navigate('PermissionDetailScreen', { agreeIdx: 5 })}
            style={{ flexDirection: 'row' }}
          >
            <CustomText
              style={{
                fontSize: 12,
                color: Color.Point1000,
                fontWeight: '500',
                letterSpacing: -0.1,
                textDecorationLine: 'underline',
              }}
            >
              취소 / 이용규정
            </CustomText>
            <CustomText style={{ fontSize: 12, color: Color.Black1000, fontWeight: '500' }}>{', '}</CustomText>
          </CustomButton>
          <CustomButton
            onPress={() => navigate('PermissionDetailScreen', { agreeIdx: 2 })}
            style={{ flexDirection: 'row' }}
          >
            <CustomText
              style={{
                fontSize: 12,
                color: Color.Point1000,
                fontWeight: '500',
                letterSpacing: -0.1,
                textDecorationLine: 'underline',
              }}
            >
              개인 정보 수집 / 이용 방침
            </CustomText>
            <CustomText style={{ fontSize: 12, color: Color.Black1000, fontWeight: '500' }}>{' 및 '}</CustomText>
          </CustomButton>
          <CustomButton
            onPress={() => navigate('PermissionDetailScreen', { agreeIdx: 3 })}
            style={{ flexDirection: 'row' }}
          >
            <CustomText
              style={{
                fontSize: 12,
                color: Color.Point1000,
                fontWeight: '500',
                letterSpacing: -0.1,
                textDecorationLine: 'underline',
              }}
            >
              개인정보 제 3자 제공
            </CustomText>
            <CustomText style={{ fontSize: 12, color: Color.Black1000, fontWeight: '500' }}>{'을 '}</CustomText>
          </CustomButton>
        </CustomText>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 12, fontWeight: '500', letterSpacing: -0.1 }}>
          모두 읽었으며 이에 동의하실 경우 예약하기를 클릭해주세요
        </CustomText>
      </View>
    </View>
  );
};

export default PermissionArea;
