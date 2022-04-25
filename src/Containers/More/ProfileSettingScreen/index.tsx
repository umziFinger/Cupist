import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import Header from '@/Components/Header';
import CommonActions from '@/Stores/Common/Actions';
import MyActions from '@/Stores/My/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import CallAttachFile from '@/Components/Picture/CallAttachFile';
import { inputMobileNumber } from '@/Components/Function';
import { fetchMyProfileImagePatch } from '@/Sagas/MySaga';
import { navigate } from '@/Services/NavigationService';
import { SCREEN_TYPE } from '@/Components/Card/Common/PlaceXSmallCard';
import AuthActions from '@/Stores/Auth/Actions';

const ProfileSettingScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: AuthState) => state.auth);

  const { heightInfo, attachFile } = useSelector((state: CommonState) => state.common);

  const [callAttachFile, setCallAttachFile] = useState(false);
  const [attachFileIdx, setAttachFileIdx] = useState(0);

  useEffect(() => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));

    return () => {
      dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
    };
  }, []);

  useEffect(() => {
    if (attachFile && attachFile.length > 0) {
      const params = {
        image: attachFile,
      };
      dispatch(MyActions.fetchMyProfileImagePatch(params));
      dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
    }
  }, [attachFile]);

  const onNameEdit = () => {
    navigate('NameEditScreen');
  };

  const onNickNameEdit = () => {
    navigate('NickNameEditScreen');
  };

  const onPhoneNumberEdit = () => {
    navigate('PhoneNumberEditScreen');
  };

  const onPressEditProfile = () => {
    setCallAttachFile(true);
  };
  const onPlaceEdit = () => {
    navigate('ResidentSearchScreen', { type: SCREEN_TYPE.MODIFY });
  };

  const onPasswordEdit = () => {
    navigate('PasswordEditScreen');
  };

  const renderMemberIcon = () => {
    if (userInfo?.providerType === 'KAKAO') {
      return require('@/Assets/Images/Common/icSocialKakao.png');
    }
    if (userInfo?.providerType === 'NAVER') {
      return require('@/Assets/Images/Common/icSocialNaver.png');
    }
    if (userInfo?.providerType === 'GOOGLE') {
      return require('@/Assets/Images/Common/icSocialGoogle.png');
    }
    if (userInfo?.providerType === 'APPLE') {
      return require('@/Assets/Images/Common/icSocialApple.png');
    }
    return '';
  };

  const onLogout = () => {
    dispatch(AuthActions.fetchUserLogout());
  };

  // console.log(attachFile[0]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.White,
      }}
    >
      <Header type={'back'} />
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View
              style={{
                backgroundColor: Color.White,
                paddingHorizontal: 24,
                paddingTop: 54,
                // flex: 1,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 66,
                  // backgroundColor: 'red',
                }}
              >
                <CustomButton onPress={() => onPressEditProfile()}>
                  <View style={{ width: 105, height: 84, borderRadius: 24 }}>
                    {attachFile?.length > 0 ? (
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 24 }}
                        source={{ uri: attachFile[attachFileIdx]?.url }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : (
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 24 }}
                        source={
                          userInfo?.profile
                            ? { uri: userInfo?.profile }
                            : require('@/Assets/Images/More/emptyProfile01.png')
                        }
                        // source={require('@/Assets/Images/More/emptyProfile01.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      width: 24,
                      height: 24,
                      opacity: 0.85,
                      backgroundColor: Color.Primary1000,
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      borderRadius: 24,
                    }}
                  >
                    <View
                      style={{
                        width: 12,
                        height: 10,
                        top: '25%',
                        left: '25%',
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Common/icPlusProfilePhoto.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </CustomButton>
              </View>

              <View
                style={{
                  paddingBottom: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.Gray300,
                  marginBottom: 16,
                }}
              >
                <View style={{ marginBottom: 8 }}>
                  <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow500 }}>
                    연결된 계정
                  </CustomText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {userInfo?.providerType !== 'email' && (
                    <View style={{ width: 20, height: 20, marginRight: 6 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 24 }}
                        source={renderMemberIcon()}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  )}
                  <CustomText
                    style={{
                      fontSize: 14,
                      color: Color.Black1000,
                    }}
                  >
                    {userInfo.email || ''}
                  </CustomText>
                </View>
              </View>
              <CustomButton onPress={() => onNameEdit()}>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.Gray300,
                    marginBottom: 16,
                  }}
                >
                  <View style={{ marginBottom: 8 }}>
                    <CustomText
                      style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow500 }}
                    >
                      이름
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <CustomText
                        style={{
                          fontSize: 14,
                          color: Color.Black1000,
                        }}
                      >
                        {userInfo?.username || ''}
                      </CustomText>
                    </View>

                    <View
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </View>
              </CustomButton>

              <CustomButton onPress={() => onNickNameEdit()}>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.Gray300,
                    marginBottom: 16,
                  }}
                >
                  <View style={{ marginBottom: 8 }}>
                    <CustomText
                      style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow500 }}
                    >
                      닉네임
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <CustomText
                        style={{
                          fontSize: 14,
                          color: Color.Black1000,
                        }}
                      >
                        {userInfo?.nickname || ''}
                      </CustomText>
                    </View>

                    <View
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </View>
              </CustomButton>

              <CustomButton onPress={() => onPhoneNumberEdit()}>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.Gray300,
                    marginBottom: 16,
                  }}
                >
                  <View style={{ marginBottom: 8 }}>
                    <CustomText
                      style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow500 }}
                    >
                      휴대폰번호
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <CustomText
                        style={{
                          fontSize: 14,
                          color: Color.Black1000,
                        }}
                      >
                        {inputMobileNumber(userInfo?.mobile || '')}
                      </CustomText>
                    </View>

                    <View
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </View>
              </CustomButton>

              {userInfo?.providerType === 'email' && (
                <CustomButton onPress={() => onPasswordEdit()}>
                  <View
                    style={{
                      paddingBottom: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.Gray300,
                      marginBottom: 16,
                    }}
                  >
                    <View style={{ marginBottom: 8 }}>
                      <CustomText
                        style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow500 }}
                      >
                        비밀번호
                      </CustomText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <CustomText
                          style={{
                            fontSize: 24,
                            color: Color.Black1000,
                          }}
                        >
                          {'\u2022'}
                          {'\u2022'}
                          {'\u2022'}
                          {'\u2022'}
                          {'\u2022'}
                        </CustomText>
                      </View>

                      <View
                        style={{
                          width: 16,
                          height: 16,
                        }}
                      >
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </View>
                </CustomButton>
              )}

              <CustomButton onPress={() => onPlaceEdit()}>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.Gray300,
                  }}
                >
                  <View style={{ marginBottom: 8 }}>
                    <CustomText
                      style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow500 }}
                    >
                      상주 볼링장
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {userInfo?.residentPlace?.placeIdx ? (
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 3,
                            backgroundColor: 'red',
                            marginRight: 12,
                          }}
                        >
                          <FastImage
                            style={{ width: '100%', height: '100%', borderRadius: 3 }}
                            source={
                              userInfo?.residentPlace?.mainPhoto
                                ? { uri: userInfo?.residentPlace?.mainPhoto }
                                : require('@/Assets/Images/Common/icNoImage.png')
                            }
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                        <View>
                          <View style={{ marginBottom: 4 }}>
                            <CustomText
                              style={{
                                fontSize: 14,
                                fontWeight: '500',
                                letterSpacing: -0.25,
                                color: Color.Black1000,
                              }}
                            >
                              {userInfo?.residentPlace?.name || ''}
                            </CustomText>
                          </View>
                          <View>
                            <CustomText
                              style={{
                                fontSize: 12,
                                letterSpacing: 0,
                                color: Color.Gray700,
                              }}
                            >
                              {userInfo?.residentPlace?.newAddress || ''}
                            </CustomText>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={{ flex: 1 }}>
                        <CustomText
                          style={{
                            fontSize: 14,
                            letterSpacing: -0.25,
                            color: Color.Gray600,
                          }}
                        >
                          상주볼링장을 등록해주세요.
                        </CustomText>
                      </View>
                    )}

                    <View
                      style={{
                        width: 16,
                        height: 16,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </View>
              </CustomButton>

              <CustomButton onPress={() => onLogout()}>
                <View style={{ marginTop: 24 }}>
                  <CustomText
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      letterSpacing: -0.2,
                      color: Color.Gray600,
                      textDecorationLine: 'underline',
                    }}
                  >
                    로그아웃
                  </CustomText>
                </View>
              </CustomButton>

              <CallAttachFile
                parentScreen={'profile'}
                setCallAttachFile={setCallAttachFile}
                isOpen={callAttachFile}
                setAttachFileIdx={setAttachFileIdx}
                attachFileIdx={attachFileIdx}
              />
            </View>
          )}
          maxToRenderPerBatch={3}
          initialNumToRender={1}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          // scrollEnabled={false}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
        />
      </View>
    </View>
  );
};

export default ProfileSettingScreen;
