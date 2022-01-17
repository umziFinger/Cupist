import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AuthState } from '@/Stores/Auth/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

const HelloArea = () => {
  const { userIdx, userInfo } = useSelector((state: AuthState) => state.auth);

  const renderContent = () => {
    if (userIdx) {
      // 예약 건수가 없을때
      if (userInfo.reservationCnt === 0) {
        return (
          <>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: '500', letterSpacing: -0.4 }}>
                첫 예약
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 22, letterSpacing: -0.4 }}>
                을 도와드릴게요.
              </CustomText>
            </View>
          </>
        );
      }
      // 예약 건수가 있을때
      return (
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: '500', letterSpacing: -0.4 }}>
            새로운 볼링장을 예약해보세요.
          </CustomText>
        </View>
      );
    }
    // 로그인 전
    return (
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: '500', letterSpacing: -0.4 }}>
          로그인을 하여 예약을 진행해보세요.
        </CustomText>
      </View>
    );
  };
  return (
    <View style={{ justifyContent: 'center' }}>
      <View>
        <View style={{ height: 35, width: 64, marginBottom: 7 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            source={require('@/Assets/Images/Home/imgHomeRingmi.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <CustomText style={{ color: Color.Black1000, fontSize: 22, letterSpacing: -0.4 }}>
          {userIdx ? `${userInfo.nickname || ''}님, 반가워요.` : '반가워요.'}
        </CustomText>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 6 }}>{renderContent()}</View>
    </View>
  );
};

export default HelloArea;
