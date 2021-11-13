import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';

import ToggleItem from '@/Containers/More/ServiceSettingScreen/ToggleItem';
import { AuthState } from '@/Stores/Auth/InitialState';
import TermsItem from '@/Containers/More/ServiceSettingScreen/TermsItem';
import { navigate } from '@/Services/NavigationService';

enum enumYN {
  Y = 'Y',
  N = 'N',
}

const SettingList = ({ index }: any) => {
  const { userInfo } = useSelector((state: AuthState) => state.auth);

  const onWithdrawal = () => {
    navigate('WithdrawScreen');
  };
  switch (index) {
    case 0: {
      return (
        <>
          <View style={{ paddingBottom: 20, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
            <CustomText
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: -0.2,
                color: Color.Black1000,
              }}
            >
              알림
            </CustomText>
          </View>
          <ToggleItem
            title={'알림 설정'}
            subTitle={'볼링장 예약 및 리뷰 등 실시간 알림'}
            type={'notification'}
            status={userInfo?.notificationYN || enumYN.Y}
          />
          <ToggleItem
            title={'정보성 알림 설정'}
            subTitle={'공지사항, 앱정보 등 안내사항 알림'}
            type={'marketing'}
            status={userInfo?.marketingYN || enumYN.Y}
          />
          <ToggleItem
            title={'이벤트 혜택 알림'}
            subTitle={'이벤트 및 마케팅 정보 알림'}
            type={'event'}
            status={userInfo?.eventYN || enumYN.Y}
          />
        </>
      );
    }

    case 1: {
      return (
        <>
          <View style={{ marginTop: 48, paddingBottom: 20, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
            <CustomText
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: -0.2,
                color: Color.Black1000,
              }}
            >
              약관 및 정책
            </CustomText>
          </View>
          <TermsItem title={'서비스 이용 약관'} type={'service'} />
          <TermsItem title={'개인 정보처리 방침'} type={'personal'} />
          <TermsItem title={'위치기반서비스 이용약관'} type={'location'} />
        </>
      );
    }

    case 2: {
      return (
        <>
          <View style={{ marginTop: 48, paddingBottom: 20, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
            <CustomText
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: -0.2,
                color: Color.Black1000,
              }}
            >
              앱 버전
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 24,
              borderBottomColor: Color.Gray200,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomText
                style={{
                  fontSize: 16,
                  letterSpacing: -0.25,
                  color: Color.Black1000,
                }}
              >
                버전 정보 ( V 0.1 )
              </CustomText>
            </View>
            <View>
              <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Point1000 }}>
                업데이트
              </CustomText>
            </View>
          </View>
        </>
      );
    }

    case 3: {
      return (
        <>
          <View style={{ marginTop: 48, paddingBottom: 20, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
            <CustomText
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: -0.2,
                color: Color.Black1000,
              }}
            >
              계정관리
            </CustomText>
          </View>

          <CustomButton onPress={() => onWithdrawal()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 24,
              }}
            >
              <View style={{ flex: 1 }}>
                <CustomText
                  style={{
                    fontSize: 16,
                    letterSpacing: -0.25,
                    color: Color.Black1000,
                  }}
                >
                  회원탈퇴
                </CustomText>
              </View>
            </View>
          </CustomButton>
        </>
      );
    }

    default:
      return null;
  }
};

export default SettingList;
