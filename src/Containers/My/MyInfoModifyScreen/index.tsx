import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import Header, { MODE } from '@/Components/Header';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import CustomSwitch from '@/Components/CustomSwitch';
import AuthActions from '@/Stores/Auth/Actions';
import MyActions from '@/Stores/My/Actions';
import CommonActions from '@/Stores/Common/Actions';

enum enumYN {
  Y = 'Y',
  N = 'N',
}

const MyInfoModifyScreen = () => {
  const dispatch = useDispatch();
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const { userName, mobile, email, memberType, address, addressDetail, addressPost, mileage, couponCnt, pushYN } =
    userInfo;

  const onPressLogout = () => {
    dispatch(AuthActions.fetchUserLogout());
    navigate('HomeScreen');
  };

  const togglePushYN = (value: string) => {
    const params = {
      push_yn: value === enumYN.Y ? enumYN.N : enumYN.Y,
    };
    dispatch(MyActions.fetchMyPushYN(params));
  };

  const renderMemberType = () => {
    if (memberType === 'KK') {
      return '카카오톡';
    }
    if (memberType === 'NV') {
      return '네이버';
    }
    if (memberType === 'GG') {
      return '구글';
    }
    if (memberType === 'AP') {
      return '애플';
    }
    return null;
  };

  const renderMemberIcon = () => {
    if (memberType === 'KK') {
      return require('@/Assets/Images/Button/kakaoBtn.png');
    }
    if (memberType === 'NV') {
      return require('@/Assets/Images/Button/naverBtn.png');
    }
    if (memberType === 'GG') {
      return require('@/Assets/Images/Button/googleBtn.png');
    }
    if (memberType === 'AP') {
      return require('@/Assets/Images/Button/appleBtn.png');
    }
    return null;
  };

  const onEditMobileBtn = () => {
    navigate('MyEditMobileScreen');
  };

  const onEditPasswordBtn = () => {
    navigate('MyCheckMobileScreen', { providerScreen: 'MyEditPasswordScreen' });
  };

  const onPressAddressBtn = () => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'myAddress', data: address }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'myAddressPost', data: addressPost }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'myAddressDetail', data: addressDetail }));
    // dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenMyAddressRBS', data: true }));
    navigate('MyCheckMobileScreen', { providerScreen: 'MyEditAddressScreen' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} text={`회원정보 수정`} mode={MODE.LIGHT} />

      <FlatList
        data={[0]}
        renderItem={() => (
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 25,
            }}
          >
            <View style={{ borderBottomColor: Color.grayDefault, borderBottomWidth: 1, paddingBottom: 15 }}>
              <CustomText style={{ fontSize: 17, fontWeight: 'bold', color: Color.Black1000 }}>회원 정보</CustomText>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
              <View style={{ marginRight: 41 }}>
                <CustomText style={{ fontSize: 13, color: Color.black70, letterSpacing: -0.25 }}>이름</CustomText>
              </View>
              <CustomText style={{ fontSize: 15, color: Color.Black1000, letterSpacing: -0.25 }}>{userName}</CustomText>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 30 }}>
                  <CustomText style={{ fontSize: 13, color: Color.black70, letterSpacing: -0.25 }}>연락처</CustomText>
                </View>
                <View style={{ flex: 1 }}>
                  <CustomText style={{ fontSize: 15, color: Color.Black1000, letterSpacing: -0.25 }}>
                    {mobile}
                  </CustomText>
                </View>
                {mobile !== '' && (
                  <CustomButton
                    onPress={() => onEditMobileBtn()}
                    style={{
                      backgroundColor: Color.Primary1000,
                      paddingLeft: 16,
                      paddingRight: 18,
                      paddingTop: 4,
                      paddingBottom: 5,
                      borderRadius: 10,
                    }}
                  >
                    <CustomText style={{ fontSize: 13, color: Color.Primary1000, letterSpacing: -0.25 }}>
                      인증 후 변경
                    </CustomText>
                  </CustomButton>
                )}
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
              <View style={{ marginRight: 30 }}>
                <CustomText style={{ fontSize: 13, color: Color.black70, letterSpacing: -0.25 }}>이메일</CustomText>
              </View>
              <View>
                <CustomText style={{ fontSize: 15, color: Color.Black1000, letterSpacing: -0.25 }}>{email}</CustomText>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
              <View style={{ marginRight: 17 }}>
                <CustomText
                  style={{
                    fontSize: 13,
                    color: Color.black70,
                    letterSpacing: -0.25,
                  }}
                >
                  비밀번호
                </CustomText>
              </View>
              {memberType !== 'LX' ? (
                <>
                  <View style={{ width: 19, height: 19, marginRight: 5 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%', borderRadius: 24 }}
                      source={renderMemberIcon()}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View>
                    <CustomText style={{ fontSize: 15, color: Color.Black1000, letterSpacing: -0.25 }}>
                      {renderMemberType()} 간편로그인
                    </CustomText>
                  </View>
                </>
              ) : (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <CustomText style={{ color: '#333', fontSize: 14 }}>********</CustomText>
                </View>
              )}
              {memberType === 'LX' && (
                <CustomButton
                  onPress={() => onEditPasswordBtn()}
                  style={{
                    backgroundColor: Color.Primary1000,
                    paddingLeft: 16,
                    paddingRight: 18,
                    paddingTop: 4,
                    paddingBottom: 5,
                    borderRadius: 10,
                  }}
                >
                  <CustomText style={{ fontSize: 13, color: Color.Primary1000, letterSpacing: -0.25 }}>수정</CustomText>
                </CustomButton>
              )}
            </View>
            <View>
              <View
                style={{
                  borderBottomColor: Color.grayDefault,
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  marginTop: 44,
                }}
              >
                <CustomText style={{ fontSize: 17, fontWeight: 'bold', color: Color.Black1000 }}>
                  배송지 정보
                </CustomText>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 30, flex: 1 }}>
                <View style={{ marginRight: 20, flex: 1 }}>
                  <CustomText style={{ fontSize: 15, color: Color.Black1000, letterSpacing: -0.25 }}>
                    {address || '배송지를 입력해주세요'} {addressDetail || ''}
                  </CustomText>
                </View>
                <CustomButton
                  onPress={() => onPressAddressBtn()}
                  style={{
                    backgroundColor: Color.Primary1000,
                    paddingLeft: 16,
                    paddingRight: 18,
                    paddingTop: 4,
                    paddingBottom: 5,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <CustomText style={{ fontSize: 13, color: Color.Primary1000, letterSpacing: -0.25 }}>
                      {address ? '수정' : '입력'}
                    </CustomText>
                  </View>
                </CustomButton>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: Color.grayDefault,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginTop: 44,
              }}
            >
              <CustomText style={{ fontSize: 17, fontWeight: 'bold', color: Color.Black1000 }}>푸시 알림</CustomText>
            </View>
            <View
              style={{
                marginTop: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <CustomText style={{ color: Color.black900, fontSize: 16, fontWeight: '500', letterSpacing: -0.25 }}>
                수선 관련 알림 및 마케팅 정보 수신
              </CustomText>
              <CustomSwitch
                style={{ width: 44, height: 26 }}
                trackColor={{ false: Color.grayLine, true: Color.Primary1000 }}
                onValueChange={() => togglePushYN(pushYN)}
                value={pushYN === 'Y'}
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <CustomText style={{ color: Color.black70, fontSize: 13 }}>
                * 아이폰 내 [설정] - [알림] 에서 푸시 설정을 허용해주시면 실시간으로 수선 진행 상황을 받아보실 수
                있습니다
              </CustomText>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 80, flex: 1 }}>
              <CustomButton onPress={() => onPressLogout()} hitSlop={20}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Color.grayDefault,
                    paddingBottom: 3,
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 13,
                      color: Color.grayDefault,
                    }}
                  >
                    로그아웃
                  </CustomText>
                </View>
              </CustomButton>
              <View style={{ flex: 1 }} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: statusHeight }} />}
      />
    </View>
  );
};

export default MyInfoModifyScreen;
