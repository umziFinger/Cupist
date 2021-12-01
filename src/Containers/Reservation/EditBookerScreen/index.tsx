import React, { useEffect, useRef } from 'react';
import { FlatList, Platform, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import InputName from '@/Components/Input/Name';
import InputAuthPhone from '@/Components/Input/AuthPhone';
import useInputName from '@/Hooks/useInputName';
import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import CustomButton from '@/Components/CustomButton';
import { ReservationState } from '@/Stores/Reservation/InitialState';
import ReservationActions from '@/Stores/Reservation/Actions';
import { navigateGoBack } from '@/Services/NavigationService';

const EditBookerScreen = () => {
  const dispatch = useDispatch();

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);
  const reservationInfo = useSelector((state: ReservationState) => state.reservation.reservationInfo);

  const { userName, onChangeName, nameValidText, isNameValid, onClearName } = useInputName();
  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();

  useEffect(() => {
    onChangeName(reservationInfo?.username || '');
    onChangePhoneNumber(reservationInfo?.mobile);
  }, []);

  const onFocusNext = (currentFocusIndex: number) => {
    if (ref_input[currentFocusIndex] && ref_input[currentFocusIndex + 1]) {
      // ref_input[currentFocusIndex].current?.blur();
      ref_input[currentFocusIndex + 1].current?.focus();
    }
  };

  const onBookerInfoEdit = () => {
    if (isNameValid && isPhoneValid) {
      dispatch(
        ReservationActions.fetchReservationReducer({
          type: 'reservationInfoEdit',
          data: { username: userName, mobile: phoneNumber },
        }),
      );
      navigateGoBack();
    }
  };

  return (
    <KeyboardSpacerProvider>
      <View style={{ flex: 1 }}>
        <Header type={'back'} text={'예약자 정보'} />
        <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
          <FlatList
            data={[0]}
            renderItem={() => (
              <View style={{}}>
                <View style={{ marginTop: 48, paddingBottom: 32 - 18 }}>
                  <InputName
                    ref={ref_input[0]}
                    nameValidText={nameValidText}
                    onChangeText={onChangeName}
                    value={userName}
                    onSubmitEditing={() => {
                      onFocusNext(0);
                    }}
                    onTextClear={onClearName}
                  />
                </View>

                <View style={{ paddingBottom: 32 }}>
                  <InputAuthPhone
                    ref={ref_input[1]}
                    onChangeText={onChangePhoneNumber}
                    value={phoneNumber}
                    isPhoneValid={isPhoneValid}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={7}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
            ListFooterComponent={
              <>
                <View
                  style={[
                    { paddingBottom: heightInfo.fixBottomHeight },
                    {
                      transform: [{ translateY: isOpenKeyboard ? -8 : 0 }],
                    },
                  ]}
                >
                  <CustomButton onPress={() => onBookerInfoEdit()}>
                    <View
                      style={{
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderRadius: 5,
                        backgroundColor: isNameValid && isPhoneValid ? Color.Primary1000 : Color.Grayyellow200,
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          letterSpacing: -0.25,
                          textAlign: 'center',
                          color: Color.White,
                        }}
                      >
                        설정완료
                      </CustomText>
                    </View>
                  </CustomButton>
                </View>
                {Platform.OS === 'ios' && <KeyboardSpacer />}
              </>
            }
            keyboardShouldPersistTaps={'handled'}
          />
        </View>
      </View>
    </KeyboardSpacerProvider>
  );
};

export default EditBookerScreen;
