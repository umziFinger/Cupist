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
import { AuthState } from '@/Stores/Auth/InitialState';

const EditBookerScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const reservationInfo = useSelector((state: ReservationState) => state.reservation.reservationInfo);

  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();

  useEffect(() => {
    onChangePhoneNumber(reservationInfo?.mobile);
  }, []);

  const onBookerInfoEdit = () => {
    if (isPhoneValid) {
      dispatch(
        ReservationActions.fetchReservationReducer({
          type: 'reservationInfoEdit',
          data: { username: reservationInfo?.username, mobile: phoneNumber },
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
                  <View>
                    <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow500 }}>
                      이름
                    </CustomText>
                  </View>

                  <View
                    style={{
                      paddingVertical: Platform.OS === 'ios' ? 15 : 7.5,
                      paddingLeft: 12,
                      borderRadius: 3,
                      borderColor: Color.Gray300,
                      borderWidth: 1,
                      marginTop: 8,
                      flexDirection: 'row',
                      paddingHorizontal: 12,
                      alignItems: 'center',
                    }}
                  >
                    <CustomText
                      style={{
                        color: Color.Black1000,
                        fontSize: 14,
                        letterSpacing: -0.25,
                      }}
                    >
                      {reservationInfo?.username}
                    </CustomText>
                  </View>
                </View>

                <View style={{ paddingBottom: 32 }}>
                  <InputAuthPhone onChangeText={onChangePhoneNumber} value={phoneNumber} isPhoneValid={isPhoneValid} />
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
                        backgroundColor: isPhoneValid ? Color.Primary1000 : Color.Grayyellow200,
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
