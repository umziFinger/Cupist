import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, ScrollView, TextInput, useWindowDimensions, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import FastImage from 'react-native-fast-image';
import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import { navigate } from '@/Services/NavigationService';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HTML from 'react-native-render-html';

const RegistScreen = () => {
  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  ref_input[3] = useRef(null);
  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const {width} = useWindowDimensions()
  const [gender, setGender] = useState('F')
  const [agreement, setAgreement] = useState<boolean>(true)
  const [clubName, setClubName] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [name, setName] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)

  const selectGender = (gender: string) => {
    setGender(gender)
  }

  const selectAgreement = (agreement: boolean) => {
    setAgreement(agreement)
  }

  useEffect(() => {
    validCheck()
  }, [gender, agreement, clubName, placeName, name, phoneNumber])

  const validCheck = () => {
    return(
      gender && agreement && clubName && placeName && name && isPhoneValid && phoneNumber
    )
  }

  const onFocus = (index: number) => {

    setFocusIndex(index)
  }

  const onFocusNext = (index: number) => {
    if (ref_input[index]) {
      ref_input[index].current?.focus();
    }
  };

  // 클럽명 클리어버튼
  const onClearClubName = () => {
    setClubName('')
  }

  let clubNameClearBox: any = null;
  if (clubName !== '' && focusIndex === 0) {
    clubNameClearBox = (
      <CustomButton onPress={() => onClearClubName()} hitSlop={7}>
        <View style={{ width: 16, height: 16, marginTop: Platform.OS === 'android' ? 7.5 : 0 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Search/icTxtDel.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
    );
  }

  // 참가 볼링장 클리어버튼
  const onClearPlaceName = () => {
    setPlaceName('')
  }

  let placeNameClearBox: any = null;
  if (placeName !== '' && focusIndex === 1) {
    placeNameClearBox = (
      <CustomButton onPress={() => onClearPlaceName()} hitSlop={7} >
        <View style={{ width: 16, height: 16, marginTop: Platform.OS === 'android' ? 7.5 : 0 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Search/icTxtDel.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
    );
  }

  // 선수이름 클리어 버튼
  const onClearName = () => {
    setName('')
  }

  let nameClearBox: any = null;
  if (name !== '' && focusIndex === 2) {
    nameClearBox = (
      <CustomButton onPress={() => onClearName()} hitSlop={7} >
        <View style={{ width: 16, height: 16, marginTop: Platform.OS === 'android' ? 7.5 : 0 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Search/icTxtDel.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
    );
  }

  // 전화번호 클리어 버튼
  const onClearPhoneNumber = () => {
    onChangePhoneNumber('')
  }

  let phoneNumberClearBox: any = null;
  if (phoneNumber !== '' && focusIndex === 3) {
    phoneNumberClearBox = (
      <CustomButton onPress={() => onClearPhoneNumber()} hitSlop={7} >
        <View style={{ width: 16, height: 16, marginTop: Platform.OS === 'android' ? 7.5 : 0 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Search/icTxtDel.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

      </CustomButton>
    );
  }

  const list = [0,1,2]
  const renderItem = (item: number) => {
    switch (item) {
      case 0: {
        return (
          <View style={{ paddingHorizontal: 16, marginTop: 18, paddingBottom: 29 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.36 }}>
              알바몬 코리아 볼링왕
            </CustomText>
            {/* 본선/예선 일정 안내 */}
            <View
              style={[
                {
                  marginHorizontal: 12,
                  marginTop: 27,
                  backgroundColor: Color.White,
                  borderRadius: 5,
                  paddingTop: 24,
                  paddingBottom: 30,
                  shadowRadius: 10,
                },
                Platform.OS === 'android'
                  ? { elevation: 2.5 }
                  : {
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowColor: 'rgba(234, 234, 234, 0.5)',
                      shadowOpacity: 10,
                    },
              ]}
            >
              <View style={{ marginHorizontal: 29 }}>
                <View style={{ flexDirection: 'row' }}>
                  <CustomText
                    style={{ color: 'rgb(255,99,67)', fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}
                  >
                    예선
                  </CustomText>
                  <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}> 일정 안내</CustomText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <View
                    style={{
                      backgroundColor: 'rgb(255,239,235)',
                      borderRadius: 2,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText
                      style={{ color: 'rgb(255,99,67)', fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                    >
                      모집기간
                    </CustomText>
                  </View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                    22.04.30(토) - 05.06(금)
                  </CustomText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 9 }}>
                  <View
                    style={{
                      backgroundColor: 'rgb(255,239,235)',
                      borderRadius: 2,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText
                      style={{ color: 'rgb(255,99,67)', fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                    >
                      예선기간
                    </CustomText>
                  </View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                    22.05.06(금) - 05.16(일)
                  </CustomText>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgb(244,244,244)',
                  marginTop: 20,
                  marginLeft: 19,
                  marginRight: 13,
                }}
              />
              <View style={{ marginHorizontal: 29, marginTop: 17 }}>
                <View style={{ flexDirection: 'row' }}>
                  <CustomText
                    style={{ color: 'rgb(113,7,255)', fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}
                  >
                    본선
                  </CustomText>
                  <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}> 일정 안내</CustomText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <View
                    style={{
                      backgroundColor: 'rgb(243,234,255)',
                      borderRadius: 2,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText
                      style={{ color: 'rgb(113,7,255)', fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                    >
                      본선진출
                    </CustomText>
                  </View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                    예선 상위 8팀
                  </CustomText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 9 }}>
                  <View
                    style={{
                      backgroundColor: 'rgb(243,234,255)',
                      borderRadius: 2,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText
                      style={{ color: 'rgb(113,7,255)', fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                    >
                      본선기간
                    </CustomText>
                  </View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                    22.06.11(토) 예정
                  </CustomText>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgb(244,244,244)',
                  marginTop: 20,
                  marginLeft: 19,
                  marginRight: 13,
                }}
              />
              <View style={{ marginHorizontal: 29, marginTop: 17 }}>
                <View style={{ flexDirection: 'row' }}>
                  <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}>참가신청 금액 안내</CustomText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(184,184,184,0.1)',
                      borderRadius: 2,
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText
                      style={{ color: Color.Grayyellow500, fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                    >
                      금액안내
                    </CustomText>
                  </View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                    10,000원
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        );
      }
      case 1: {
        return (
          <>
            <View style={{ height: 8, backgroundColor: 'rgb(243,243,243)' }} />
            <View style={{ marginTop: 25 }}>
              <View>
                {focusIndex === 0 &&
                  <View style={[
                    {
                      width: width - 48,
                      left: 24,
                      top: 122,
                      height: 134,
                      // borderWidth: 1,
                      borderBottomWidth:1,
                      borderLeftWidth:1,
                      borderRightWidth:1,
                      borderColor:Color.Gray300,
                      paddingTop: 22,
                      paddingBottom: 18,
                      paddingHorizontal: 10,
                      borderBottomRightRadius:3,
                      borderBottomLeftRadius:3,
                      // borderRadius: 3,
                      backgroundColor: 'white',
                      position: 'absolute',
                      zIndex: 9
                    },

                    Platform.OS === 'android'
                      ? {elevation: 1}
                      : {
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowColor: 'rgba(176, 176, 176, 0.1)',
                        shadowOpacity: 10,
                      },
                  ]}>
                    <ScrollView
                      style={{ height: 134 }}
                      showsVerticalScrollIndicator={true}
                      nestedScrollEnabled={true}
                    >
                      {[0,1,2,3,4,5].map((v, index) => {
                        // 검색어 하이라이트 처리
                        return (
                          <CustomButton key={index.toString()}>
                            <View style={{ marginTop: index === 0 ? 0 : 17 }}>
                              <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>
                                볼리볼리 볼링장
                              </CustomText>
                            </View>
                          </CustomButton>
                        );
                      })}
                    </ScrollView>
                  </View>
                }
                {focusIndex === 1 &&
                  <View style={[
                    {
                      width: width - 48,
                      height: 134,
                      left: 24,
                      top: 222,
                      // borderWidth: 1,
                      borderBottomWidth:1,
                      borderLeftWidth:1,
                      borderRightWidth:1,
                      borderColor:Color.Gray300,
                      paddingTop: 30,
                      paddingBottom: 18,
                      paddingHorizontal: 10,
                      borderBottomRightRadius:3,
                      borderBottomLeftRadius:3,

                      // borderRadius: 3,
                      backgroundColor: 'white',
                      position: 'absolute',
                      zIndex: 9
                    },

                    Platform.OS === 'android'
                      ? {elevation: 1}
                      : {
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowColor: 'rgba(176, 176, 176, 0.1)',
                        shadowOpacity: 10,
                      },
                  ]}>
                    <ScrollView
                      style={{ zIndex: 99, height: 142 }}
                      showsVerticalScrollIndicator={true}
                      nestedScrollEnabled={true}
                    >
                      {[0,1,2,3,4,5].map((v, index) => {
                        // 검색어 하이라이트 처리
                        return (
                          <CustomButton key={index.toString()}>
                              <View style={{ marginTop: index === 0 ? 0 : 17 }}>
                                <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>
                                  볼리볼리 볼링장
                                </CustomText>
                              </View>
                          </CustomButton>
                        );
                      })}
                    </ScrollView>
                  </View>
                }
                <CustomText
                  style={{
                    color: Color.Black1000,
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: -0.36,
                    marginLeft: 16,
                  }}
                >
                  참가신청서
                </CustomText>
                <View style={{ paddingHorizontal: 24, marginTop: 29 , zIndex: 10}}>
                  <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                    클럽명
                  </CustomText>
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: focusIndex === 0 ? Color.Primary1000 : Color.Gray300,
                      borderRadius: 3,
                      paddingHorizontal: 12,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
                      marginTop: 8,
                      flexDirection: 'row',
                      zIndex: 999
                    }}
                  >
                    <TextInput
                      ref={ref_input[0]}
                      autoCompleteType="off"
                      placeholder={'클럽명을 입력해주세요'}
                      placeholderTextColor={Color.Gray400}
                      style={{
                        color: Color.Black1000,
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.25,
                        padding: 0,
                        flex: 1
                      }}
                      autoFocus={false}
                      autoCorrect={false}
                      onChangeText={(text) => setClubName(text)}
                      value={clubName}
                      allowFontScaling={false}
                      onFocus={() => onFocus(0)}
                      onBlur={() => onFocus(-1)}
                    />
                    {clubNameClearBox}
                  </View>
                </View>
                <View style={{ paddingHorizontal: 24, marginTop: 32 , zIndex: focusIndex === 1 ? 10 : 0 }}>
                  <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                    참가 볼링장(변경불가)
                  </CustomText>
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: focusIndex === 1 ? Color.Primary1000 : Color.Gray300,
                      borderRadius: 3,
                      paddingHorizontal: 12,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
                      marginTop: 8,
                      flexDirection: 'row',
                    }}
                  >
                    <TextInput
                      ref={ref_input[1]}
                      autoCompleteType="off"
                      placeholder={'볼링장명을 입력해주세요'}
                      placeholderTextColor={Color.Gray400}
                      style={{
                        color: Color.Black1000,
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.25,
                        padding: 0,
                        flex: 1,
                      }}
                      autoFocus={false}
                      autoCorrect={false}
                      onChangeText={(text) => setPlaceName(text)}
                      value={placeName}
                      allowFontScaling={false}
                      onFocus={() => onFocus(1)}
                      onBlur={() => onFocus(-1)}
                    />
                    {placeNameClearBox}
                  </View>
                </View>
                <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
                  <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                    선수이름
                  </CustomText>
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: focusIndex === 2 ? Color.Primary1000 : Color.Gray300,
                      borderRadius: 3,
                      paddingHorizontal: 12,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
                      marginTop: 8,
                      flexDirection: 'row',
                    }}
                  >
                    <TextInput
                      ref={ref_input[2]}
                      autoCompleteType="off"
                      placeholder={'이름을 입력해주세요'}
                      placeholderTextColor={Color.Gray400}
                      style={{
                        color: Color.Black1000,
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.25,
                        padding: 0,
                        flex: 1,
                      }}
                      autoFocus={false}
                      autoCorrect={false}
                      onChangeText={(text) => setName(text)}
                      value={name}
                      allowFontScaling={false}
                      onFocus={() => onFocus(2)}
                      onBlur={() => onFocus(-1)}
                    />
                    {nameClearBox}
                  </View>
                </View>
                <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
                  <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                    휴대폰번호
                  </CustomText>
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: focusIndex === 3 ? Color.Primary1000 : Color.Gray300,
                      borderRadius: 3,
                      paddingHorizontal: 12,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
                      marginTop: 8,
                      flexDirection: 'row',
                    }}
                  >
                    <TextInput
                      ref={ref_input[3]}
                      autoCompleteType="off"
                      placeholder={'휴대폰번호를 입력해주세요'}
                      placeholderTextColor={Color.Gray400}
                      style={{
                        color: Color.Black1000,
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.25,
                        padding: 0,
                        flex: 1,
                      }}
                      autoFocus={false}
                      autoCorrect={false}
                      onChangeText={(text) => onChangePhoneNumber(text)}
                      value={phoneNumber}
                      allowFontScaling={false}
                      keyboardType={'number-pad'}
                      onFocus={() => onFocus(3)}
                      onBlur={() => onFocus(-1)}
                    />
                    {phoneNumberClearBox}
                  </View>
                </View>
              </View>
              <View style={{ marginHorizontal: 24, marginTop: 32 }}>
                <CustomText style={{ fontSize: 12, color: Color.Grayyellow500, fontWeight: '500' }}>성별</CustomText>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <CustomButton
                    style={{
                      paddingVertical: 11,
                      backgroundColor: gender === 'M' ? Color.Primary1000 : Color.White,
                      borderWidth: gender === 'M' ? 0 : 1,
                      borderColor: Color.Gray300,
                      alignItems: 'center',
                      borderRadius: 3,
                      flex: 1,
                    }}
                    onPress={() => selectGender('M')}
                  >
                    <CustomText style={{ color: gender === 'M' ? Color.White : Color.Gray400, fontWeight: '500', fontSize: 14, letterSpacing: -0.25 }}>
                      남자
                    </CustomText>
                  </CustomButton>
                  <CustomButton
                    style={{
                      marginLeft: 10,
                      paddingVertical: 11,
                      backgroundColor: gender === 'F' ? Color.Primary1000 : Color.White,
                      borderWidth: gender === 'F' ?  0 : 1,
                      borderColor: Color.Gray300,
                      alignItems: 'center',
                      borderRadius: 3,
                      flex: 1,
                    }}
                    onPress={() => selectGender('F')}
                  >
                    <CustomText style={{  color: gender === 'F' ? Color.White : Color.Gray400, fontWeight: '500', fontSize: 14, letterSpacing: -0.25 }}>
                      여자
                    </CustomText>
                  </CustomButton>
                </View>
              </View>
              <View style={{ marginHorizontal: 24, marginTop: 32 }}>
                <CustomText style={{ fontSize: 12, color: Color.Grayyellow500, fontWeight: '500' }}>
                  개인정보 활용 동의
                </CustomText>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <CustomButton
                    style={{
                      paddingVertical: 11,
                      backgroundColor: agreement ? Color.Primary1000 : Color.White,
                      borderWidth: agreement ? 0 : 1,
                      borderColor: Color.Gray300,
                      alignItems: 'center',
                      borderRadius: 3,
                      flex: 1,
                    }}
                    onPress={() => selectAgreement(true)}
                  >
                    <CustomText style={{ color: agreement ? Color.White : Color.Gray400, fontWeight: '500', fontSize: 14, letterSpacing: -0.25 }}>
                      동의
                    </CustomText>
                  </CustomButton>
                  <CustomButton
                    style={{
                      marginLeft: 10,
                      paddingVertical: 11,
                      backgroundColor: agreement ? Color.White : Color.Primary1000,
                      borderWidth: agreement ? 1 : 0,
                      borderColor: Color.Gray300,
                      alignItems: 'center',
                      borderRadius: 3,
                      flex: 1,
                    }}
                    onPress={() => selectAgreement(false)}
                  >
                    <CustomText style={{ color: !agreement ? Color.White : Color.Gray400, fontWeight: '500', fontSize: 14, letterSpacing: -0.25 }}>
                      미동의
                    </CustomText>
                  </CustomButton>
                </View>
              </View>
              <CustomText style={{color: Color.Gray400, fontSize: 10, marginLeft: 24, marginTop: 12}}>
                *본 대회에 대한 자세한 내용은 볼리미 홈화면 > 더보기 > 공지사항을 확인해 주세요.
              </CustomText>
            </View>
          </>
        );
      }
      case 2: {
        return(
          <View style={{marginHorizontal: 24, marginTop: 36, paddingBottom: Platform.OS === 'ios' ? heightInfo.fixBottomHeight : heightInfo.fixBottomHeight + 12,}}>
            <View style={{alignItems: 'center'}}>
              <CustomText style={{color: Color.Grayyellow1000, fontSize: 12, fontWeight: '500' }}>위 내용은 사실과 다름이 없으며 본 대회 참가를 신청합니다.</CustomText>
            </View>
            <CustomButton
              style={{paddingVertical: 15, backgroundColor: validCheck() ? Color.Primary1000 : Color.Grayyellow200, borderRadius: 3, alignItems: 'center', marginTop: 14}}
              onPress={() => validCheck() && navigate('RegistCompleteScreen')}
            >
              <CustomText style={{color:Color.White, fontSize: 14, fontWeight: 'bold'}}>참가 신청하기</CustomText>
            </CustomButton>
          </View>
        )
      }
      default:
        return null;
    }
  };

  return (
    <View style={{ backgroundColor: Color.White, flex: 1 }}>
      <Header type={'close'} />
      <FlatList
        data={[0, 1, 2]}
        renderItem={({ item }: any) => renderItem(item)}
        ListFooterComponent={<View style={{height: heightInfo.fixBottomHeight}}/>}
        keyboardShouldPersistTaps={focusIndex === 0 || focusIndex === 1 ? 'always' : 'handled'}
      />
      {focusIndex !== -1 &&
        <View
          style={{paddingTop: 7, paddingBottom: 8}}
        >
          <CustomButton
            onPress={() => onFocusNext(focusIndex + 1)}
            style={{
              marginHorizontal: 24,
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
              alignItems: 'center',
              borderRadius: 3,
            }}
          >
            <CustomText style={{fontSize: 14, color: Color.White, fontWeight: 'bold', letterSpacing: -0.25}}>다음</CustomText>
          </CustomButton>
        </View>
      }
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  );
};

export default RegistScreen;
