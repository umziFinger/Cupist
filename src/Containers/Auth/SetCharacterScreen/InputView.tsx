import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Platform, TextInput, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import { navigate } from '@/Services/NavigationService';

function InputView() {
  const dispatch = useDispatch();
  const { userName, userBirth, userGender, userNameValid, userBirthValid, userGenderValid } = useSelector(
    (state: AuthState) => state.auth,
  );
  const [userNameValidText, setUerNameValidText] = useState<string>('');
  const [userBirthValidText, setUserBirthText] = useState<string>('');

  const onChangeUserName = (value: string) => {
    if (value) {
      const userNameRegExp1 = /^[가-힣]{2,4}$/; // 한글 이름 2~4자 이내
      // const userNameRegExp2 = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&♡☆×÷_♤₩\\\=\(\'\"]/gi; // 특수문자
      // const userNameRegExp = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // 영문 이름 2~10자 이내 : 띄어쓰기(\s)가 들어가며 First, Last Name 형식
      // const userNameRegExp = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // 한글, 영어 혼용

      if (value.match(userNameRegExp1)) {
        setUserBirthText('');
        dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'userNameValid', data: true }));
      } else {
        setUerNameValidText('올바른 형식이 아닙니다.');
        dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'userNameValid', data: false }));
      }
    } else {
      setUerNameValidText('');
      dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: null }));
      dispatch(AuthActions.fetchAuthReducer({ type: 'userNameValid', data: false }));
    }
  };

  const onChangeUserBirth = (value: string) => {
    if (value) {
      const userBirthRegExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

      if (value.match(userBirthRegExp)) {
        setUserBirthText('');
        dispatch(AuthActions.fetchAuthReducer({ type: 'userBirth', data: value }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'userBirthValid', data: true }));
      } else {
        setUserBirthText('올바른 형식이 아닙니다.');
        dispatch(AuthActions.fetchAuthReducer({ type: 'userBirth', data: value }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'userBirthValid', data: false }));
      }
    } else {
      setUserBirthText('');
      dispatch(AuthActions.fetchAuthReducer({ type: 'userBirth', data: null }));
      dispatch(AuthActions.fetchAuthReducer({ type: 'userBirthValid', data: false }));
    }
  };

  const onPressGender = (value: string) => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'userGender', data: value }));
  };

  const onPressNext = () => {
    if (userNameValid && userBirthValid && userGender) {
      navigate('SetBrandScreen');
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 29 }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              marginRight: 14.5,
              borderBottomColor: Color.grayLine,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 13,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  autoCompleteType="off"
                  placeholder="예) 김앤올"
                  placeholderTextColor={Color.grayDefault}
                  style={{
                    color: Color.Black1000,
                    fontSize: 15,
                    letterSpacing: -0.38,
                    padding: 0,
                  }}
                  autoFocus={false}
                  keyboardType={'default'}
                  onChangeText={onChangeUserName}
                  autoCorrect={false}
                  value={userName}
                  maxLength={Platform.OS === 'ios' ? 5 : 4}
                />
              </View>
              {/* {userName && ( */}
              {/*  <View style={{ width: 16, height: 16 }}> */}
              {/*    <CustomButton onPress={() => onPressDeleteBtn()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}> */}
              {/*      <FastImage */}
              {/*        style={{ width: '100%', height: '100%' }} */}
              {/*        source={require('@/Assets/Images/Common/icTxtDel.png')} */}
              {/*        resizeMode={FastImage.resizeMode.cover} */}
              {/*      /> */}
              {/*    </CustomButton> */}
              {/*  </View> */}
              {/* )} */}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CustomButton
              onPress={() => onPressGender('male')}
              style={{
                justifyContent: 'center',
                borderWidth: userGender === 'male' ? 2 : 1,
                borderColor: userGender === 'male' ? Color.Primary1000 : Color.grayLine,
                paddingHorizontal: 16,
              }}
            >
              <View>
                <CustomText
                  style={{
                    color: userGender === 'male' ? Color.Primary1000 : Color.grayLine,
                    fontSize: 15,
                    letterSpacing: -0.38,
                    fontWeight: userGender === 'male' ? 'bold' : '500',
                  }}
                >
                  남
                </CustomText>
              </View>
            </CustomButton>
            <CustomButton
              onPress={() => onPressGender('female')}
              style={{
                justifyContent: 'center',
                borderWidth: userGender === 'female' ? 2 : 1,
                borderColor: userGender === 'female' ? Color.Primary1000 : Color.grayLine,
                paddingHorizontal: 16,
              }}
            >
              <View>
                <CustomText
                  style={{
                    color: userGender === 'female' ? Color.Primary1000 : Color.grayLine,
                    fontSize: 15,
                    letterSpacing: -0.38,

                    fontWeight: userGender === 'female' ? 'bold' : '500',
                  }}
                >
                  여
                </CustomText>
              </View>
            </CustomButton>
          </View>
        </View>
        <View
          style={{
            marginRight: 14.5,
            borderBottomColor: Color.grayLine,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 13,
              marginTop: 9,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="예) 19900101"
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType={'number-pad'}
                onChangeText={onChangeUserBirth}
                autoCorrect={false}
                value={userBirth}
                maxLength={8}
              />
            </View>
            {/* {userBirth && ( */}
            {/*  <View style={{ width: 16, height: 16 }}> */}
            {/*    <CustomButton onPress={() => onPressDeleteBtn()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}> */}
            {/*      <FastImage */}
            {/*        style={{ width: '100%', height: '100%' }} */}
            {/*        source={require('@/Assets/Images/Common/icTxtDel.png')} */}
            {/*        resizeMode={FastImage.resizeMode.cover} */}
            {/*      /> */}
            {/*    </CustomButton> */}
            {/*  </View> */}
            {/* )} */}
          </View>
        </View>
      </View>
      <CustomButton style={{ alignItems: 'center' }} onPress={() => onPressNext()}>
        <View
          style={{
            width: '100%',
            paddingTop: 22,
            paddingBottom: Platform.OS === 'android' ? 22 : 53,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: userNameValid && userBirthValid && userGender ? Color.Primary1000 : Color.greyBtn,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <CustomText style={{ color: Color.White, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}>
                다음
              </CustomText>
            </View>
            <View style={{ width: 6.5, height: 11.2 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Arrow/icSmallRightArrowWhite.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </View>
      </CustomButton>
    </View>
  );
}

export default InputView;
