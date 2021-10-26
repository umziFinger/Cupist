import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, View } from 'react-native';
import _ from 'lodash';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import AuthActions from '@/Stores/Auth/Actions';

const FindIdInput = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [nameValid, setNameValid] = useState<boolean>(false);
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

  const onChangeName = (value: string) => {
    setNameValid(false);
    console.log('onChangeName');
    if (value) {
      const userNameRegExp = /^[가-힣]{2,4}$/; // 한글 이름 2~4자 이내
      // const userNameRegExp = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // 영문 이름 2~10자 이내 : 띄어쓰기(\s)가 들어가며 First, Last Name 형식
      // const userNameRegExp = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // 한글, 영어 혼용

      if (value.match(userNameRegExp)) {
        setName(value);
        setNameValid(true);
      } else {
        setName(value);
        setNameValid(true);
      }
    } else {
      setName('');
      setNameValid(false);
    }
  };

  const onChangeMobile = (value: string) => {
    setMobileValid(false);
    if (value) {
      debounceFunc.current(value);
      setMobile(value);
      setMobileValid(false);
    } else {
      setMobile('');
    }
  };

  const onPressFindId = () => {
    console.log(mobileValid && nameValid);
    if (mobileValid && nameValid) {
      const params = {
        username: name,
        mobile: mobile.replace(/-/gi, ''),
      };
      console.log('onPressFindId params : ', params);
      dispatch(AuthActions.fetchAuthFindId(params));
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
                placeholder="고객명을 입력해주세요."
                placeholderTextColor={Color.grayDefault}
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.38,
                  padding: 0,
                }}
                autoFocus={false}
                keyboardType={'default'}
                onChangeText={onChangeName}
                autoCorrect={false}
                value={name}
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
          <CustomButton onPress={() => onPressFindId()}>
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
                아이디 찾기
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default FindIdInput;
