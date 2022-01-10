import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Platform, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import InputAuthPhone, { AuthPhoneEnum } from '@/Components/Input/AuthPhone';

import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import InputSmsAuthNumber from '@/Components/Input/SmsAuthNumber';
import useInputAuthNumber from '@/Hooks/useInputAuthNumber';

import InputName from '@/Components/Input/Name';
import InputNickname from '@/Components/Input/Nickname';
import useInputName from '@/Hooks/useInputName';
import useInputNickname from '@/Hooks/useInputNickname';
import useDebounce from '@/Hooks/useDebounce';
import dev from '@/Config/dev';

const SocialJoinScreen = () => {
  const dispatch = useDispatch();
  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  const { isReceived, log_cert, tempUserIdx, agreeInfo } = useSelector((state: AuthState) => state.auth);
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const [touchCnt, setTouchCnt] = useState<number>(0);

  const { userName, onChangeName, nameValidText, isNameValid, onClearName } = useInputName();
  const { nickName, onChangeNickname, nicknameValidText, isNicknameValid, onClearNickName } = useInputNickname();
  const { phoneNumber, onChangePhoneNumber, isPhoneValid } = useInputPhoneNumber();
  const {
    smsAuthNumber,
    onChangeAuthNumber,
    smsValueValid,
    smsValidText,
    setSmsAuthNumber,
    setSmsAuthTime,
    smsAuthTime,
  } = useInputAuthNumber();

  const debounceContent = useDebounce({ value: touchCnt, delay: 500 });

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  useEffect(() => {
    if (debounceContent > 0) {
      onPressJoin();
    }
  }, [debounceContent]);

  /* 인증번호받기 */
  const onGetSmsAuth = () => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));

    setSmsAuthNumber('');
    setSmsAuthTime(300);

    dispatch(
      AuthActions.fetchAuthSmsSend({
        mobile: phoneNumber.replace(/-/g, ''),
        type: AuthPhoneEnum.JOIN,
      }),
    );
  };

  const onPressJoin = () => {
    if (isNameValid && isNicknameValid && isPhoneValid && smsValueValid) {
      const params = {
        type: 'join',
        mobile: phoneNumber.replace(/-/g, ''),
        authNum: smsAuthNumber.toString(),
        authIdx: log_cert.authIdx,
        screen: 'SocialJoinScreen',
        userName,
        nickName,
        tempUserIdx,
        agreeInfo,
      };
      dispatch(AuthActions.fetchSmsAuth(params));
      // if (debounceContent) {
      //   const params = { agreeInfo: JSON.stringify(agreeInfo.checkedArr), tempUserIdx };
      //   dispatch(AuthActions.fetchAuthSocialJoin(params));
      // }
    }
  };

  const onFocusNext = (currentFocusIndex: number) => {
    if (ref_input[currentFocusIndex] && ref_input[currentFocusIndex + 1]) {
      // ref_input[currentFocusIndex].current?.blur();
      ref_input[currentFocusIndex + 1].current?.focus();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1, paddingTop: 44 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
                    회원정보
                  </CustomText>
                </View>
              </View>

              {/* 이름 & 닉네임 & 휴대폰 번호 입력 */}

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

              <View style={{ paddingBottom: 32 - 18 }}>
                <InputNickname
                  ref={ref_input[1]}
                  nicknameValidText={nicknameValidText}
                  onChangeText={onChangeNickname}
                  value={nickName}
                  onTextClear={onClearNickName}
                  onSubmitEditing={() => {
                    onFocusNext(1);
                  }}
                />
              </View>

              <View style={{ paddingBottom: 32 }}>
                <InputAuthPhone
                  ref={ref_input[2]}
                  onChangeText={onChangePhoneNumber}
                  value={phoneNumber}
                  onPressAuth={onGetSmsAuth}
                  isPhoneValid={isPhoneValid}
                />
              </View>

              {isReceived && (
                <View style={{ paddingBottom: 32 - 18 }}>
                  <InputSmsAuthNumber
                    onChangeText={onChangeAuthNumber}
                    value={smsAuthNumber}
                    smsAuthTime={smsAuthTime}
                    smsValidText={smsValidText}
                  />
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={7}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<>{/* <View style={{ paddingBottom: heightInfo.statusHeight }} /> */}</>}
          keyboardShouldPersistTaps={'handled'}
        />

        <View
          style={{
            paddingBottom: Platform.OS === 'android' ? heightInfo.fixBottomHeight + 8 : heightInfo.fixBottomHeight,
          }}
        >
          <CustomButton onPress={() => setTouchCnt(touchCnt + 1)}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                borderRadius: 5,
                backgroundColor:
                  isNameValid && isNicknameValid && isPhoneValid && smsValueValid
                    ? Color.Primary1000
                    : Color.Grayyellow200,
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
                다음
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};
export default SocialJoinScreen;
