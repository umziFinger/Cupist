import React, { useEffect, useState } from 'react';
import { FlatList, Platform, ScrollView, TextInput, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import RowItem from '@/Containers/My/ReservationCancelDetailScreen/RowItem';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import { numberFormat } from '@/Components/Function';
import ReservationActions from '@/Stores/Reservation/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { fetchCommonCode } from '@/Sagas/CommonSaga';
import CustomDashed from '@/Components/CustomDashed';
import { AuthState } from '@/Stores/Auth/InitialState';

const ReservationCancelDetailScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { reservationCancelDetail, bankList } = useSelector((state: MyState) => state.my);
  const { userInfo } = useSelector((state: AuthState) => state.auth);

  const [focusIndex, setFocusIndex] = useState(-1);
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  const [name, setName] = useState('');
  const [bankInfo, setBankInfo]: any = useState(null);

  useEffect(() => {
    dispatch(CommonActions.fetchCommonCode({ code: 'vBankCode' }));
    setAccount(userInfo.refundBankNum || '');
    setName(userInfo.refundUserName);
  }, []);

  useEffect(() => {
    if (userInfo && bankList) {
      if (bankList?.findIndex((el: any) => el.type === userInfo?.refundBankCode) > -1) {
        setBank(bankList[bankList?.findIndex((el: any) => el.type === userInfo?.refundBankCode)]?.value || '');
        setBankInfo(bankList[bankList?.findIndex((el: any) => el.type === userInfo?.refundBankCode)]);
      }
    }
  }, [bankList]);

  const onFocus = (index: number) => {
    setFocusIndex(index);
  };

  const openSelectBox = (
    <CustomButton
      onPress={() => {
        console.log('@@@@@@@focusIndex : ', focusIndex);
        if (focusIndex === 1) {
          setFocusIndex(-1);
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
              : require('@/Assets/Images/Arrow/icArrowDw.png')
          }
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </CustomButton>
  );

  const onProgressCancel = () => {
    if (
      reservationCancelDetail?.type === '무통장입금' &&
      reservationCancelDetail?.stateText !== '입금대기' &&
      !(name && bankInfo && account)
    ) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '환불받을 계좌를 확인해주세요.',
          },
        }),
      );
      return;
    }
    const params = {
      paymentIdx: reservationCancelDetail?.idx,
      name: reservationCancelDetail?.username,
      reason: '예약 취소',
      refundBankCode: bankInfo?.type, // 추가
      refundBankNum: account, // 추가
      refundUserName: name, // 추가
    };
    dispatch(ReservationActions.fetchReservationCancel(params));
  };

  const accountClearBox = (
    <CustomButton
      onPress={() => {
        setAccount('');
      }}
      hitSlop={7}
      style={{ marginRight: 4 }}
    >
      <View style={{ width: 16, height: 16 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={require('@/Assets/Images/Search/icTxtDel.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </CustomButton>
  );

  const nameClearBox = (
    <CustomButton
      onPress={() => {
        setName('');
      }}
      hitSlop={7}
      style={{ marginRight: 4 }}
    >
      <View style={{ width: 16, height: 16 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={require('@/Assets/Images/Search/icTxtDel.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </CustomButton>
  );

  const renderCancelPercentNotice = (percent: number) => {
    return (
      <View
        style={{
          borderRadius: 3,
          backgroundColor: Color.Gray800,
          marginTop: 28,
          paddingVertical: 12,
          alignItems: 'center',
        }}
      >
        <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.White }}>
          {`환불 규정에 따라 예약금액의 ${percent}%가 차감됩니다.`}
        </CustomText>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <View style={{ backgroundColor: Color.White, flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={({ index }) => (
            <>
              <View style={{ paddingHorizontal: 24 }}>
                <View>
                  <CustomText
                    style={{
                      paddingTop: 28,
                      fontSize: 22,
                      fontWeight: 'bold',
                      letterSpacing: -0.4,
                      color: Color.Black1000,
                    }}
                  >
                    예약 취소 안내
                  </CustomText>
                </View>
                <View style={{ marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem title={'볼링장명'} content={reservationCancelDetail?.Place?.name || ''} />
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem title={'이용날짜'} content={reservationCancelDetail?.useDateText || ''} />
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem title={'이용시간'} content={`${reservationCancelDetail?.useTimeText || ''}`} />
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem title={'상품명'} content={reservationCancelDetail?.ticketName || ''} />
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem title={'예약인원'} content={`${reservationCancelDetail?.memberCnt || 0}명`} />
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', paddingBottom: 28 }}>
                  <RowItem title={'추가옵션'} content={`볼링화 ${reservationCancelDetail?.shoesCnt || 0}켤레`} />
                </View>

                <View style={{ height: 0.5 }}>
                  <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
                </View>

                <View style={{ marginTop: 28, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem title={'취소 가능 기한'} content={reservationCancelDetail?.cancelLimitDate || ''} />
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', paddingBottom: 28 }}>
                  <RowItem title={'결제방법'} content={reservationCancelDetail?.type || ''} />
                </View>
              </View>
              {reservationCancelDetail?.type === '무통장입금' && reservationCancelDetail?.stateText !== '입금대기' && (
                <View style={{ zIndex: 999 }}>
                  <View style={{ height: 8, backgroundColor: Color.Gray200 }} />
                  <View style={{}}>
                    {focusIndex === 1 && bankList?.length > 0 && (
                      <View
                        style={[
                          {
                            width: width - 48,
                            left: 24,
                            top: 256,
                            height: 250,
                            borderBottomWidth: 1,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderColor: Color.Gray300,
                            paddingHorizontal: 10,
                            borderBottomRightRadius: 3,
                            borderBottomLeftRadius: 3,
                            backgroundColor: 'white',
                            position: 'absolute',
                            paddingBottom: 10,
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
                          {bankList?.map((v: any, index: number) => {
                            return (
                              <CustomButton
                                key={index.toString()}
                                onPress={() => {
                                  setBank(v?.value);
                                  setBankInfo(v);
                                  setFocusIndex(-1);
                                }}
                              >
                                <View
                                  style={{
                                    paddingTop: index === 0 ? 22 : 8,
                                    paddingBottom: 8,
                                  }}
                                >
                                  <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>
                                    {v?.value || ''}
                                  </CustomText>
                                </View>
                              </CustomButton>
                            );
                          })}
                        </ScrollView>
                      </View>
                    )}
                    <View style={{ marginTop: 28, paddingHorizontal: 24 }}>
                      <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 }}>
                        환불받을 계좌
                      </CustomText>
                    </View>
                    <View style={{ marginTop: 41, paddingHorizontal: 24 }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        예금주
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
                        {focusIndex === 2 && nameClearBox}
                      </View>
                    </View>
                    <View style={{ marginTop: 28, zIndex: focusIndex === 1 ? 10 : 0, paddingHorizontal: 24 }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        은행선택
                      </CustomText>
                      <CustomButton
                        onPress={() => onFocus(focusIndex === 1 ? -1 : 1)}
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
                        <CustomText
                          style={{
                            flex: 1,
                            color: Color.Black1000,
                            fontSize: 14,
                            letterSpacing: -0.25,
                            padding: 0,
                          }}
                        >
                          {bank || '은행을 선택하세요.'}
                        </CustomText>
                        {openSelectBox}
                      </CustomButton>
                    </View>
                    <View style={{ marginTop: 28, paddingHorizontal: 24 }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        계좌번호
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
                          backgroundColor: 'white',
                        }}
                      >
                        <TextInput
                          autoCompleteType="off"
                          placeholder={`'-'없이 숫자만 입력해주세요.`}
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
                          onChangeText={(text) => setAccount(text)}
                          value={account}
                          allowFontScaling={false}
                          onFocus={() => onFocus(0)}
                          onBlur={() => onFocus(-1)}
                          keyboardType={'number-pad'}
                        />
                        {focusIndex === 0 && accountClearBox}
                      </View>
                    </View>
                    <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 28, zIndex: 1 }} />
                  </View>
                </View>
              )}
              {/* {reservationCancelDetail?.cancelType === '당일취소' && ( */}
              {/*  */}
              {/* )} */}
              {(reservationCancelDetail?.type !== '무통장입금' ||
                reservationCancelDetail?.stateText === '입금대기') && (
                <View style={{ height: 0.5, marginHorizontal: 24 }}>
                  <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
                </View>
              )}
              <View style={{ paddingHorizontal: 24 }}>
                {reservationCancelDetail?.cancelPercent !== 0 &&
                  renderCancelPercentNotice(reservationCancelDetail?.cancelPercent)}
                <View style={{ marginTop: 28, flexDirection: 'row', alignItems: 'center' }}>
                  <RowItem
                    title={'결제 금액'}
                    content={`${numberFormat(reservationCancelDetail?.totalPrice || '')}원`}
                    contentStyle={{
                      fontSize: 15,
                      fontWeight: '500',
                      letterSpacing: -0.2,
                      textAlign: 'right',
                      color: Color.Black1000,
                    }}
                  />
                </View>
                <View style={{ marginTop: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 28 }}>
                  <RowItem
                    title={'취소수수료 차감'}
                    content={`-${numberFormat(reservationCancelDetail?.fees || '')}원`}
                    contentStyle={{
                      fontSize: 15,
                      fontWeight: '500',
                      letterSpacing: -0.2,
                      textAlign: 'right',
                      color: Color.Black1000,
                    }}
                  />
                </View>

                <View style={{ height: 0.5 }}>
                  <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
                </View>

                <View style={{ marginTop: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 28 }}>
                  <RowItem
                    title={'환불 예정 금액'}
                    content={`${numberFormat(reservationCancelDetail?.cancelPrice || '')}원`}
                    contentStyle={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.24, color: Color.Error }}
                  />
                </View>

                <CustomButton onPress={() => onProgressCancel()}>
                  <View
                    style={{
                      borderRadius: 3,
                      backgroundColor: Color.White,
                      marginTop: 40,
                      paddingVertical: 12,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Color.Grayyellow200,
                    }}
                  >
                    <CustomText
                      style={{ fontSize: 14, letterSpacing: -0.25, textAlign: 'center', color: Color.Grayyellow1000 }}
                    >
                      예약 취소 진행하기
                    </CustomText>
                  </View>
                </CustomButton>
              </View>
            </>
          )}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: heightInfo.statusHeight }}
          keyboardShouldPersistTaps={'handled'}
        />
      </View>
    </View>
  );
};

export default ReservationCancelDetailScreen;
