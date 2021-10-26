import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import AuthActions from '@/Stores/Auth/Actions';
import { fetchAuthFindPassword } from '@/Sagas/AuthSaga';

const TempPasswordInput = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>('');
  const [idValid, setIdValid] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string>('');
  const [mobileValid, setMobileValid] = useState<boolean>(false);

  const renderMobileRegEx = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(
        /(^0[0-9]{2}|^1[0-9]{2}|^2[0-9]{2}|^3[0-9]{2}|^4[0-9]{2}|^5[0-9]{2}|^6[0-9]{2}|^7[0-9]{2}|^8[0-9]{2}|^9[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
  };

  const debounceFunc = useRef(
    _.debounce((value: any) => {
      const tempValue1 = value.replace(/-/gi, '');
      if (tempValue1 && tempValue1.length > 10) {
        const tempValue2 = tempValue1.substr(0, 11);
        const regExResult = renderMobileRegEx(tempValue2);
        setMobile(regExResult);
        setMobileValid(true);
      }
    }, 200),
  );

  const debounceFunc2 = useRef(
    _.debounce((value: any) => {
      const tempValue1 = value.replace(/-/gi, '');
      if (tempValue1 && tempValue1.length > 10) {
        const tempValue2 = tempValue1.substr(0, 11);
        const regExResult = renderMobileRegEx(tempValue2);
        setId(regExResult);
        setIdValid(true);
      }
    }, 200),
  );

  const onChangeId = (value: string) => {
    setIdValid(false);
    if (value) {
      debounceFunc2.current(value);
      setId(value);
      setIdValid(true);
    } else {
      setId('');
      setIdValid(false);
    }
  };

  const onChangeMobile = (value: string) => {
    setMobileValid(false);
    if (value) {
      debounceFunc.current(value);
      setMobile(value);
      setIdValid(true);
    } else {
      setMobile('');
      setIdValid(false);
    }
  };

  const onPressTempPassword = () => {
    if (idValid && mobileValid) {
      const params = {
        userid: id,
        mobile: mobile.replace(/-/gi, ''),
      };
      console.log('onPressTempPassword params : ', params);
      dispatch(AuthActions.fetchAuthFindPassword(params));
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 29 }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View
          style={{
            borderBottomColor: Color.grayLine,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, paddingBottom: 13 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="아이디를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType={'default'}
                onChangeText={onChangeId}
                autoCorrect={false}
                value={id}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: Color.grayLine,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flexDirection: 'row', marginTop: 29 }}>
            <View style={{ flex: 1, paddingBottom: 13 }}>
              <TextInput
                autoCompleteType="off"
                placeholder="휴대폰 번호를 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType="number-pad"
                autoCorrect={false}
                maxLength={13}
                onChangeText={(e) => onChangeMobile(e)}
                value={mobile}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 29 }}>
          <CustomButton onPress={() => onPressTempPassword()}>
            <View
              style={{
                width: '100%',
                paddingVertical: 20,
                backgroundColor: Color.Primary1000,
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <CustomText
                style={{
                  color: Color.White,
                  fontSize: 17,
                  fontWeight: 'bold',
                  letterSpacing: -0.42,
                }}
              >
                임시비밀번호 발급
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default TempPasswordInput;
