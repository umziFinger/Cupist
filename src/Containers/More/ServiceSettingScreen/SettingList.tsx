import { Linking, Platform, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getVersion } from 'react-native-device-info';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';

import ToggleItem from '@/Containers/More/ServiceSettingScreen/ToggleItem';
import { AuthState } from '@/Stores/Auth/InitialState';
import TermsItem from '@/Containers/More/ServiceSettingScreen/TermsItem';
import { navigate } from '@/Services/NavigationService';
import { CommonState } from '@/Stores/Common/InitialState';
import Config from '@/Config';

enum enumYN {
  Y = 'Y',
  N = 'N',
}

const SettingList = ({ index }: any) => {
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const { versionInfo } = useSelector((state: CommonState) => state.common);
  const appVersion = getVersion();

  const onWithdrawal = () => {
    navigate('WithdrawScreen');
  };

  const compareVersionCheck = () => {
    // console.log('==========', versionInfo.currentVersion > appVersion.toString());
    return versionInfo.currentVersion > appVersion.toString();
  };

  const onPressVersionUpdate = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(Config.MARKET_URL_IOS)
        .then((result) => {
          console.log('result', result);
        })
        .catch((e) => {
          console.log('error', e);
        });
    } else {
      Linking.openURL(Config.MARKET_URL_ANDROID)
        .then((result) => {
          console.log('result', result);
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
  };

  console.log('$$$$$ userInfo : ', userInfo);
  console.log('$$$$$ userInfo?.notificationPushYN : ', userInfo?.notificationPushYN);
  console.log('$$$$$ userInfo?.marketingPushYN : ', userInfo?.marketingPushYN);
  console.log('$$$$$ userInfo?.eventYN : ', userInfo?.eventYN);

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
            status={userInfo?.notificationPushYN || enumYN.Y}
          />
          <ToggleItem
            title={'정보성 알림 설정'}
            subTitle={'공지사항, 앱정보 등 안내사항 알림'}
            type={'marketing'}
            status={userInfo?.marketingPushYN || enumYN.Y}
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
                버전 정보 ( V {appVersion?.toString()} )
              </CustomText>
            </View>
            <View>
              {compareVersionCheck() && (
                <CustomButton hitSlop={{ left: 7, top: 7, right: 7, bottom: 7 }} onPress={() => onPressVersionUpdate()}>
                  <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Point1000 }}>
                    업데이트
                  </CustomText>
                </CustomButton>
              )}
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
