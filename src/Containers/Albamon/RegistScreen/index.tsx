import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, Platform, ScrollView, TextInput, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { RouteProp } from '@react-navigation/native';
import _ from 'lodash';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color, Opacity } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { numberFormat } from '@/Components/Function';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { DATA_PERMISSION_DETAILS } from '@/Components/Data/DATA_PERMISSION_DETAILS';
import CommonActions from '@/Stores/Common/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import PaymentMethodArea from '@/Containers/Albamon/RegistScreen/PaymentMethodArea';
import ReservationActions from '@/Stores/Reservation/Actions';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'RegistScreen'>;
}

const RegistScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  ref_input[3] = useRef(null);
  const { placeDetailName = '', placeIdx = -1 } = route?.params;
  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { width } = useWindowDimensions();
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const { myCardList } = useSelector((state: ReservationState) => state.reservation);
  const {
    competitionsRegistInfo,
    competitionPlaceSearchList,
    competitionClubSearchList,
    permissionCheck = false,
    selcetedCardIdx,
    paymentMethod,
    paymentType,
    registData,
    isReturn,
  } = useSelector((state: AlbamonState) => state.albamon);
  console.log('@@@@@@@@@@@@@@@@@@@@', competitionsRegistInfo);
  const [gender, setGender] = useState('');
  const [clubName, setClubName] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [selectedPlaceIdx, setSelectedPlaceIdx] = useState<number>(placeIdx);
  const [name, setName] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);

  useEffect(() => {
    // dispatch(AlbamonActions.fetchCompetitionsRegistInfo());
    setPlaceName(placeDetailName || '');
    setName(userInfo?.username || '');
    onChangePhoneNumber(userInfo?.mobile || '');
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'competitionClubSearchList', data: [] }));
    dispatch(ReservationActions.fetchReservationCardList());
    Keyboard.addListener('keyboardDidHide', () => focusOut());
    dispatch(AlbamonActions.fetchCompetitionsPlaceSearch({ query: '' }));

    // isReturn : 카드추가하고 돌아온 상황인지 아닌지 구분
    if (registData && isReturn) {
      setClubName(registData?.clubName || '');
      setName(registData?.name || '');
      setPlaceName(registData?.placeName || '');
      setSelectedPlaceIdx(registData?.placeIdx || -1);
      onChangePhoneNumber(registData?.phoneNumber || '');
      setGender(registData?.gender || '');
    }

    return () => {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'permissionCheck', data: false }));
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'isReturn', data: false }));
    };
  }, []);

  useEffect(() => {
    validCheck();
    dispatch(
      AlbamonActions.fetchAlbamonReducer({
        type: 'registData',
        data: { gender, name, phoneNumber, placeIdx: selectedPlaceIdx, clubName, placeName },
      }),
    );
  }, [gender, permissionCheck, clubName, placeName, name, isPhoneValid, paymentMethod, selcetedCardIdx, paymentType]);

  const selectGender = (params: string) => {
    setGender(params);
  };

  const onPressAgreement = () => {
    if (!permissionCheck) {
      navigate('AlbamonPermissionDetailScreen', { agreeIdx: 2, detailArr: DATA_PERMISSION_DETAILS });
    }
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'permissionCheck', data: false }));
  };

  const focusOut = () => {
    setFocusIndex(-1);
    ref_input.map((el, index) => {
      return el.current?.isFocused() && el.current?.blur();
    });
  };
  const validCheck = () => {
    return (
      gender !== '' &&
      permissionCheck &&
      clubName !== '' &&
      placeName !== '' &&
      name !== '' &&
      isPhoneValid &&
      (paymentType === 'simple' ? selcetedCardIdx !== -1 : paymentMethod !== -1)
    );
  };

  const onFocus = (index: number) => {
    setFocusIndex(index);
    if (index === 0 && !clubName) {
      debounceFuncClub.current('');
    }
  };

  const onFocusNext = (index: number) => {
    if (focusIndex === 3) {
      ref_input[3].current?.blur();
    }
    if (ref_input[index]) {
      ref_input[index].current?.focus();
    }
  };
  // 클럽명 클리어버튼
  let clubNameClearBox: any = null;
  if (clubName !== '' && focusIndex === 0) {
    clubNameClearBox = (
      <CustomButton onPress={() => onChangeClubName('')} hitSlop={7}>
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
  let placeNameClearBox: any = null;

  placeNameClearBox = (
    <CustomButton
      onPress={() => {
        if (focusIndex === 1) {
          focusOut();
        } else {
          onFocus(1);
        }
      }}
      hitSlop={7}
    >
      <View style={{ width: 24, height: 24 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={
            focusIndex === 1
              ? require('@/Assets/Images/Arrow/icArrowUp.png')
              : placeName === ''
              ? require('@/Assets/Images/Arrow/icArrowDwGray.png')
              : require('@/Assets/Images/Arrow/icArrowDw.png')
          }
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </CustomButton>
  );

  // 선수이름 클리어 버튼
  const onClearName = () => {
    setName('');
  };

  let nameClearBox: any = null;
  if (name !== '' && focusIndex === 2) {
    nameClearBox = (
      <CustomButton onPress={() => onClearName()} hitSlop={7}>
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
    onChangePhoneNumber('');
  };

  let phoneNumberClearBox: any = null;
  if (phoneNumber !== '' && focusIndex === 3) {
    phoneNumberClearBox = (
      <CustomButton onPress={() => onClearPhoneNumber()} hitSlop={7}>
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

  const selectClubName = (item: string) => {
    setClubName(item);
    Keyboard.dismiss();
  };

  const selectPlaceName = (item: any) => {
    console.log('onPress selectPlaceName item : ', item);
    setPlaceName(item?.name);
    setSelectedPlaceIdx(item?.idx);
    // 키보드가 닫혀있는데 볼링장 선택을 하면 selectBox가 닫히지 않는 현상때문에 추가함
    focusOut();
    Keyboard.dismiss();
  };

  const onGoRegist = () => {
    const params = {
      clubName,
      placeIdx: selectedPlaceIdx,
      name,
      mobile: phoneNumber.split('-').join(''),
      sex: gender,
      agreeYn: permissionCheck ? 'Y' : 'N',
      compChildrenIdx: competitionsRegistInfo?.competitions?.idx,
    };
    console.log('params==========', params);
    if (validCheck()) {
      // navigate('PaymentScreen');
      if (paymentType === 'simple') {
        dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'isAlbamonPayment', data: true }));
        navigate('CheckPasswordScreen', {
          paymentIdx: -1,
          billingIdx: myCardList[selcetedCardIdx - 1]?.idx,
        });
        return;
      }
      dispatch(AlbamonActions.fetchCompetitionsRegist(params));
    }
  };

  const onChangeClubName = (text: string) => {
    setClubName(text);
    debounceFuncClub.current(text);
    if (text === '') {
      dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'competitionClubSearchList', data: [] }));
    }
  };

  const onChangePlaceName = (text: string) => {
    setPlaceName(text);
    debounceFuncPlace.current(text);
  };

  const debounceFuncClub = useRef(
    _.debounce((text: any) => {
      const params = {
        query: text,
      };
      if (text !== '') dispatch(AlbamonActions.fetchCompetitionsClubSearch(params));
    }, 500),
  );
  console.log(competitionClubSearchList);

  const debounceFuncPlace = useRef(
    _.debounce((text: any) => {
      const params = {
        query: text,
      };
      dispatch(AlbamonActions.fetchCompetitionsPlaceSearch(params));
    }, 500),
  );

  return (
    <View style={{ backgroundColor: Color.White, flex: 1 }}>
      <Header type={'close'} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={() => {
            return (
              <>
                <View style={{ flex: 1, marginTop: 18, paddingHorizontal: 16 }}>
                  <CustomText
                    style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.36 }}
                  >
                    {competitionsRegistInfo?.competitions?.title}
                  </CustomText>
                  {/* =========================== 본선/예선 일정 안내 =========================== */}
                  <View
                    style={[
                      {
                        marginHorizontal: 12,
                        marginTop: 27,
                        backgroundColor: Color.White,
                        borderRadius: 5,
                        paddingBottom: 25,
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
                      <View style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                        <CustomText
                          style={{ color: Color.pinkishOrange, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}
                        >
                          {competitionsRegistInfo?.competitions?.order || ''}차 예선
                        </CustomText>
                        <View style={{ width: 2, height: 13, backgroundColor: 'black', marginHorizontal: 6 }} />
                        <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}>
                          상위 8팀 본선 진출
                        </CustomText>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View
                          style={{
                            backgroundColor: Color.veryLightPink,
                            borderRadius: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                          }}
                        >
                          <CustomText
                            style={{
                              color: Color.pinkishOrange,
                              fontSize: 11,
                              fontWeight: 'bold',
                              letterSpacing: -0.38,
                            }}
                          >
                            모집기간
                          </CustomText>
                        </View>
                        <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                          {competitionsRegistInfo?.competitions?.joinDateView || ''}
                        </CustomText>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 9 }}>
                        <View
                          style={{
                            backgroundColor: '#ffefeb',
                            borderRadius: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                          }}
                        >
                          <CustomText
                            style={{
                              color: Color.pinkishOrange,
                              fontSize: 11,
                              fontWeight: 'bold',
                              letterSpacing: -0.38,
                            }}
                          >
                            예선기간
                          </CustomText>
                        </View>
                        <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                          {`${competitionsRegistInfo?.competitions?.qualifiersDateView}` || ''}
                        </CustomText>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#f4f4f4',
                        marginTop: 25,
                        marginLeft: 19,
                        marginRight: 13,
                      }}
                    />
                    <View style={{ marginHorizontal: 29, marginTop: 25 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText
                          style={{ color: Color.bluePurple, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}
                        >
                          {competitionsRegistInfo?.competitions?.order || ''}차 본선
                        </CustomText>
                        <View style={{ width: 2, height: 13, backgroundColor: 'black', marginHorizontal: 6 }} />
                        <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}>
                          상위 4팀 왕중왕전 진출
                        </CustomText>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View
                          style={{
                            backgroundColor: Color.paleLavender,
                            borderRadius: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                          }}
                        >
                          <CustomText
                            style={{ color: Color.bluePurple, fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                          >
                            본선기간
                          </CustomText>
                        </View>
                        <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                          {competitionsRegistInfo?.competitions?.roundDateView || ''} 예정
                        </CustomText>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 9 }}>
                        <View
                          style={{
                            backgroundColor: Color.paleLavender,
                            borderRadius: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                          }}
                        >
                          <CustomText
                            style={{ color: Color.bluePurple, fontSize: 11, fontWeight: 'bold', letterSpacing: -0.38 }}
                          >
                            대회장소
                          </CustomText>
                        </View>
                        <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                          피에스타 볼링경기장(인천)
                        </CustomText>
                      </View>
                      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Color.Grayyellow1000 }} />
                        <CustomText style={{ fontSize: 11, color: Color.Grayyellow1000, marginLeft: 4 }}>
                          볼링플러스 TV 중계 방송 및 유튜브 라이브 스트리밍
                        </CustomText>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#f4f4f4',
                        marginTop: 25,
                        marginLeft: 19,
                        marginRight: 13,
                      }}
                    />
                    <View style={{ marginHorizontal: 29, marginTop: 25 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.41 }}>
                          참가신청 금액 안내
                        </CustomText>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View
                          style={{
                            backgroundColor: `${Color.Gray400}${Opacity._10}`,
                            borderRadius: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                          }}
                        >
                          <CustomText
                            style={{
                              color: Color.Grayyellow500,
                              fontSize: 11,
                              fontWeight: 'bold',
                              letterSpacing: -0.38,
                            }}
                          >
                            금액안내
                          </CustomText>
                        </View>
                        <CustomText style={{ fontSize: 14, letterSpacing: -0.11, fontWeight: '500', marginLeft: 11 }}>
                          {numberFormat(competitionsRegistInfo?.competitions?.price) || ''}원
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{ height: 8, backgroundColor: '#f4f4f4', marginTop: 25 }} />
                  <View style={{ marginTop: 25 }}>
                    <View>
                      {/* =========================== selectBox =========================== */}
                      {focusIndex === 0 && competitionClubSearchList?.length > 0 && (
                        <View
                          style={[
                            {
                              width: width - 48,
                              left: 24,
                              top: 122,
                              height: 134,
                              borderBottomWidth: 1,
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderColor: Color.Gray300,
                              paddingHorizontal: 10,
                              borderBottomRightRadius: 3,
                              borderBottomLeftRadius: 3,
                              backgroundColor: 'white',
                              position: 'absolute',
                              zIndex: 9,
                            },

                            Platform.OS === 'android'
                              ? { elevation: 1 }
                              : {
                                  shadowOffset: {
                                    width: 0,
                                    height: 4,
                                  },
                                  shadowColor: 'rgba(176, 176, 176, 0.1)',
                                  shadowOpacity: 10,
                                },
                          ]}
                        >
                          <ScrollView
                            style={{ height: 134 }}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            keyboardShouldPersistTaps={'handled'}
                          >
                            {competitionClubSearchList?.map((v: any, index: number) => {
                              return (
                                <CustomButton key={index.toString()} onPress={() => selectClubName(v?.name)}>
                                  <View
                                    style={{
                                      paddingTop: index === 0 ? 22 : 8,
                                      paddingBottom: 8,
                                    }}
                                  >
                                    <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>
                                      {v?.name || ''}
                                    </CustomText>
                                  </View>
                                </CustomButton>
                              );
                            })}
                          </ScrollView>
                        </View>
                      )}
                      {focusIndex === 1 && competitionPlaceSearchList?.length > 0 && (
                        <View
                          style={[
                            {
                              width: width - 48,
                              height: 134,
                              left: 24,
                              top: 225,
                              borderBottomWidth: 1,
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderColor: Color.Gray300,
                              paddingHorizontal: 10,
                              borderBottomRightRadius: 3,
                              borderBottomLeftRadius: 3,
                              backgroundColor: 'white',
                              position: 'absolute',
                              zIndex: 9,
                            },

                            Platform.OS === 'android'
                              ? { elevation: 1 }
                              : {
                                  shadowOffset: {
                                    width: 0,
                                    height: 4,
                                  },
                                  shadowColor: 'rgba(176, 176, 176, 0.1)',
                                  shadowOpacity: 10,
                                },
                          ]}
                        >
                          <ScrollView
                            style={{ zIndex: 99 }}
                            showsVerticalScrollIndicator
                            nestedScrollEnabled
                            keyboardShouldPersistTaps={'handled'}
                          >
                            {competitionPlaceSearchList?.map((v: any, index: number) => {
                              return (
                                <CustomButton key={index.toString()} onPress={() => selectPlaceName(v)}>
                                  <View
                                    style={{
                                      paddingTop: index === 0 ? 30 : 8,
                                      paddingBottom: 8,
                                      // backgroundColor: 'red',
                                    }}
                                  >
                                    <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>
                                      {v?.name || ''}
                                    </CustomText>
                                  </View>
                                </CustomButton>
                              );
                            })}
                          </ScrollView>
                        </View>
                      )}
                      {/* =========================== 신청서 Input 영역 =========================== */}
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
                      <View style={{ paddingHorizontal: 24, marginTop: 29, zIndex: 10 }}>
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
                            zIndex: 999,
                            backgroundColor: 'white',
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
                              flex: 1,
                            }}
                            autoFocus={false}
                            autoCorrect={false}
                            onChangeText={(text) => onChangeClubName(text)}
                            value={clubName}
                            allowFontScaling={false}
                            onFocus={() => onFocus(0)}
                            onBlur={() => onFocus(-1)}
                          />
                          {clubNameClearBox}
                        </View>
                      </View>
                      <View style={{ paddingHorizontal: 24, marginTop: 32, zIndex: focusIndex === 1 ? 10 : 0 }}>
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
                            // paddingVertical: Platform.OS === 'ios' ? 14 : 7,
                            height: 48,
                            alignItems: 'center',
                            marginTop: 8,
                            flexDirection: 'row',
                            backgroundColor: 'white',
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
                            onChangeText={(text) => {
                              setSelectedPlaceIdx(-1);
                              onChangePlaceName(text);
                            }}
                            value={placeName}
                            allowFontScaling={false}
                            onFocus={() => onFocus(1)}
                            onBlur={() => {
                              if (selectedPlaceIdx === -1) {
                                dispatch(
                                  CommonActions.fetchCommonReducer({
                                    type: 'alertToast',
                                    data: {
                                      alertToast: true,
                                      alertToastPosition: 'top',
                                      alertToastMessage: '볼링장은 필수 선택 사항입니다.',
                                    },
                                  }),
                                );
                                setPlaceName('');
                              }
                              onFocus(-1);
                            }}
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

                    {/* =========================== 성별, 개인정보 동의 영역 =========================== */}

                    <View style={{ marginHorizontal: 24, marginTop: 32 }}>
                      <CustomText style={{ fontSize: 12, color: Color.Grayyellow500, fontWeight: '500' }}>
                        성별
                      </CustomText>
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
                          <CustomText
                            style={{
                              color: gender === 'M' ? Color.White : Color.Gray400,
                              fontWeight: '500',
                              fontSize: 14,
                              letterSpacing: -0.25,
                            }}
                          >
                            남자
                          </CustomText>
                        </CustomButton>
                        <CustomButton
                          style={{
                            marginLeft: 10,
                            paddingVertical: 11,
                            backgroundColor: gender === 'F' ? Color.Primary1000 : Color.White,
                            borderWidth: gender === 'F' ? 0 : 1,
                            borderColor: Color.Gray300,
                            alignItems: 'center',
                            borderRadius: 3,
                            flex: 1,
                          }}
                          onPress={() => selectGender('F')}
                        >
                          <CustomText
                            style={{
                              color: gender === 'F' ? Color.White : Color.Gray400,
                              fontWeight: '500',
                              fontSize: 14,
                              letterSpacing: -0.25,
                            }}
                          >
                            여자
                          </CustomText>
                        </CustomButton>
                      </View>
                    </View>
                    <View style={{ height: 8, backgroundColor: '#f4f4f4', marginTop: 32 }} />
                    <PaymentMethodArea list={myCardList} />
                    <View style={{ height: 8, backgroundColor: '#f4f4f4', marginTop: 32 }} />
                    <View
                      style={{
                        marginHorizontal: 24,
                        marginTop: 32,
                        borderColor: permissionCheck ? Color.Primary1000 : Color.Gray300,
                        borderRadius: 3,
                        borderWidth: 1,
                        paddingVertical: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <CustomButton
                        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                        onPress={() => onPressAgreement()}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                          <View style={{ width: 24, height: 24, marginLeft: 12 }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={
                                permissionCheck
                                  ? require('@/Assets/Images/Button/icCheckCircleOn.png')
                                  : require('@/Assets/Images/Button/icCheckCircleOff.png')
                              }
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
                          <CustomText
                            style={{
                              marginLeft: 7,
                              color: permissionCheck ? Color.Black1000 : Color.Gray400,
                              fontSize: 14,
                              fontWeight: '500',
                              letterSpacing: -0.19,
                            }}
                          >
                            개인정보 수집 및 이용동의(필수)
                          </CustomText>
                        </View>
                        <View style={{ width: 24, height: 24, marginRight: 14 }}>
                          <FastImage
                            style={{ width: '100%', height: '100%' }}
                            source={
                              permissionCheck
                                ? require('@/Assets/Images/Arrow/icArrowRightHeavy.png')
                                : require('@/Assets/Images/Arrow/icArrowRiGray400.png')
                            }
                            // source={require('@/Assets/Images/Arrow/icArrowRiGray400.png')}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      </CustomButton>
                    </View>
                    <CustomText style={{ color: Color.Gray400, fontSize: 10, marginLeft: 24, marginTop: 12 }}>
                      {'*본 대회에 대한 궁금사항은 1:1문의사항으로 문의해주세요.'}
                    </CustomText>
                  </View>
                </View>

                {/* =========================== 참가 신청하기 버튼 영역 =========================== */}

                <View
                  style={{
                    marginHorizontal: 24,
                    marginTop: 36,
                    paddingBottom: heightInfo.statusHeight,
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, fontWeight: '500' }}>
                      위 내용은 사실과 다름이 없으며 본 대회 참가를 신청합니다.
                    </CustomText>
                  </View>
                  <CustomButton
                    style={{
                      paddingVertical: 15,
                      backgroundColor: validCheck() ? Color.Primary1000 : Color.Grayyellow200,
                      borderRadius: 3,
                      alignItems: 'center',
                      marginTop: 14,
                    }}
                    onPress={() => onGoRegist()}
                  >
                    <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold' }}>
                      참가 신청하기
                    </CustomText>
                  </CustomButton>
                </View>
              </>
            );
          }}
          ListFooterComponent={<View style={{ height: heightInfo.fixBottomHeight }} />}
          keyboardShouldPersistTaps={'handled'}
          maxToRenderPerBatch={10}
          initialNumToRender={5}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        {focusIndex !== -1 && (
          <View style={{ paddingTop: 7, paddingBottom: 8 }}>
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
              <CustomText style={{ fontSize: 14, color: Color.White, fontWeight: 'bold', letterSpacing: -0.25 }}>
                다음
              </CustomText>
            </CustomButton>
          </View>
        )}
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    </View>
  );
};
export default RegistScreen;
