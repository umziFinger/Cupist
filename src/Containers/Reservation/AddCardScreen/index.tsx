import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CardNumberInput from '@/Containers/Reservation/AddCardScreen/CardNumberInput';
import CardDefaultInput from '@/Containers/Reservation/AddCardScreen/CardDefaultInput';
import CardPasswordInput from '@/Containers/Reservation/AddCardScreen/CardPasswordInput';
import AgreeArea from '@/Containers/Reservation/AddCardScreen/AgreeArea';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import ReservationActions from '@/Stores/Reservation/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';

const AddCardScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeCheckedArr, myCardList } = useSelector((state: ReservationState) => state.reservation);
  const addCardInfo = useSelector((state: ReservationState) => state.reservation.addCardInfo);
  const [validation, setValidation] = useState<boolean>(false);
  const [cardNum1, setCardNum1] = useState<string>('');
  const [cardNum2, setCardNum2] = useState<string>('');
  const [cardNum3, setCardNum3] = useState<string>('');
  const [cardNum4, setCardNum4] = useState<string>('');

  useEffect(() => {
    dispatch(
      ReservationActions.fetchReservationReducer({
        type: 'agreeCheckedArr',
        data: [false, false, false, false, false],
      }),
    );
    return () => {
      dispatch(ReservationActions.fetchReservationReducer({ type: 'addCardInfoInit' }));
      dispatch(
        ReservationActions.fetchReservationReducer({
          type: 'agreeCheckedArr',
          data: [false, false, false, false, false],
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (addCardInfo && agreeCheckedArr) {
      if (
        addCardInfo.cardNumber.length === 16 &&
        addCardInfo.expiry.length === 4 &&
        addCardInfo.pwd2Digit.length === 2 &&
        addCardInfo.birth.length === 6 &&
        !agreeCheckedArr.includes(false)
      ) {
        return setValidation(true);
      }
    }
    return setValidation(false);
  }, [addCardInfo, agreeCheckedArr]);

  useEffect(() => {
    console.log('cardNum1 : ', cardNum1, ' cardNum2 : ', cardNum2, ' cardNum3 : ', cardNum3, ' cardNum4 : ', cardNum4);
    dispatch(
      ReservationActions.fetchReservationReducer({
        type: 'addCardInfo',
        data: {
          ...addCardInfo,
          cardNumber: `${cardNum1}${cardNum2}${cardNum3}${cardNum4}`,
        },
      }),
    );
  }, [cardNum1, cardNum2, cardNum3, cardNum4]);

  const onChangeCardNumber = (text: string, index: number) => {
    if (index === 1) setCardNum1(text);
    if (index === 2) setCardNum2(text);
    if (index === 3) setCardNum3(text);
    if (index === 4) setCardNum4(text);
  };

  const onChangeExpiry = (text: string) => {
    dispatch(
      ReservationActions.fetchReservationReducer({
        type: 'addCardInfo',
        data: { ...addCardInfo, expiry: text || '' },
      }),
    );
  };

  const onChangePassword = (text: string) => {
    dispatch(
      ReservationActions.fetchReservationReducer({
        type: 'addCardInfo',
        data: { ...addCardInfo, pwd2Digit: text || '' },
      }),
    );
  };

  const onChangeBirth = (text: string) => {
    dispatch(
      ReservationActions.fetchReservationReducer({
        type: 'addCardInfo',
        data: { ...addCardInfo, birth: text || '' },
      }),
    );
  };

  const onPressAdd = () => {
    console.log('validation : ', validation);
    if (validation) {
      // 기존 등록된 카드가 없을때 비밀번호 등록
      if (myCardList?.length === 0) {
        console.log('간편 결제 비밀번호 등록 페이지 이동!');
        return navigate('RegisterPasswordScreen');
      }

      // 기존 등록된 카드가 있을때 바로 카드 등록
      if (myCardList?.length !== 0) {
        console.log('카드 등록 api 호출!');
        console.log('카드 등록 params :', addCardInfo);

        dispatch(ReservationActions.fetchReservationCard({ ...addCardInfo }));
      }
      return null;
    }

    return dispatch(
      CommonActions.fetchCommonReducer({
        type: 'alertDialog',
        data: {
          alertDialog: true,
          alertDialogType: 'confirm',
          alertDialogMessage: '카드 정보 및 약관동의를 확인해주세요',
        },
      }),
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ justifyContent: 'center', marginTop: 16 }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
                    카드 등록하기
                  </CustomText>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 6 }}>
                  <CustomText style={{ color: Color.Gray600, fontSize: 13, letterSpacing: -0.2 }}>
                    카드정보를 입력해주세요.
                  </CustomText>
                </View>

                {/* 카드정보 입력 영역 */}
                <View>
                  <View style={{ justifyContent: 'center', marginTop: 16 }}>
                    <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                      카드번호
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 8 }}>
                    <CardNumberInput
                      placeHolder={'0000'}
                      maxLength={4}
                      value={{ cardNum1, cardNum2, cardNum3, cardNum4 }}
                      onChangeText={onChangeCardNumber}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 12,
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        유효기간
                      </CustomText>
                    </View>
                    <View style={{ marginTop: 8 }}>
                      <CardDefaultInput
                        placeHolder={'MMYY'}
                        maxLength={4}
                        value={addCardInfo?.expiry}
                        onChangeText={onChangeExpiry}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        카드 비밀번호
                      </CustomText>
                    </View>
                    <View style={{ marginTop: 8 }}>
                      <CardPasswordInput
                        placeHolder={'비밀번호 앞 2자리'}
                        maxLength={2}
                        value={addCardInfo?.pwd2Digit}
                        onChangeText={onChangePassword}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{ justifyContent: 'center', marginTop: 16 }}>
                    <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                      생년월일
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 8 }}>
                    <CardDefaultInput
                      placeHolder={'생년월일 6자리'}
                      maxLength={6}
                      value={addCardInfo?.birth}
                      onChangeText={onChangeBirth}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 24 }} />
              <View style={{ flex: 1, marginTop: 24 }}>
                <AgreeArea />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />
        <CustomButton onPress={() => onPressAdd()}>
          <View style={{ marginHorizontal: 24, marginBottom: heightInfo.fixBottomHeight + 8 }}>
            <View
              style={{
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: validation ? Color.Primary1000 : Color.Grayyellow200,
                paddingVertical: 15,
              }}
            >
              <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                등록하기
              </CustomText>
            </View>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default AddCardScreen;
