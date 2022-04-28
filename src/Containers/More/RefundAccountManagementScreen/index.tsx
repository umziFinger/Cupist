import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Platform, TextInput, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect, useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import CommonActions from '@/Stores/Common/Actions';
import MyActions from '@/Stores/My/Actions';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import { MyState } from '@/Stores/My/InitialState';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';

const RefundAccountManagementScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { bankList } = useSelector((state: MyState) => state.my);
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);

  const [focusIndex, setFocusIndex] = useState(-1);
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('');
  const [name, setName] = useState('');
  const [bankInfo, setBankInfo]: any = useState(null);
  const { userInfo } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    dispatch(CommonActions.fetchCommonCode({ code: 'vBankCode' }));
    setAccount(userInfo?.refundBankNum || '');
    setName(userInfo?.refundUserName);
  }, []);

  useEffect(() => {
    if (userInfo && bankList?.length > 0) {
      if (bankList?.findIndex((el: any) => el?.type === userInfo?.refundBankCode) > -1) {
        setBank(bankList[bankList?.findIndex((el: any) => el?.type === userInfo?.refundBankCode)]?.value || '');
        setBankInfo(bankList[bankList?.findIndex((el: any) => el?.type === userInfo?.refundBankCode)]);
      }
    }
  }, [bankList]);

  useEffect(() => {
    validCheck();
  }, [account, bank, name]);

  const onFocus = (index: number) => {
    setFocusIndex(index);
  };
  console.log('userInfo?.competitionsYn : ', userInfo);

  const validCheck = () => {
    return (
      name &&
      bank &&
      account &&
      (userInfo.refundUserName !== name ||
        userInfo.refundBankNum !== account ||
        userInfo?.refundBankCode !== bankList[bankList?.findIndex((el: any) => el.value === bank)]?.type)
    );
  };

  const patchRefundBank = () => {
    if (!validCheck()) return;
    const params = {
      refundBankCode: bankInfo?.type, // 추가
      refundBankNum: account, // 추가
      refundUserName: name, // 추가
    };
    dispatch(MyActions.fetchMyRefundBank(params));
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

  return (
    <View style={{ backgroundColor: Color.White, flex: 1 }}>
      <Header type={'close'} />
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View>
              <View style={{ marginTop: 16 }}>
                <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 }}>환불받을 계좌</CustomText>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: -0.18, marginTop: 9 }}>
                  무통장입금으로 결제 후 취소시 환불받을 계좌를 입력해주세요.
                </CustomText>
              </View>
              {focusIndex === 1 && bankList?.length > 0 && (
                <View
                  style={[
                    {
                      width: width - 48,
                      top: 280,
                      height: 150,
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
                    style={{ flex: 1, height: 150 }}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    // keyboardShouldPersistTaps={'handled'}
                  >
                    {bankList?.map((v: any, vIndex: number) => {
                      return (
                        <CustomButton
                          key={vIndex.toString()}
                          onPress={() => {
                            setBank(v?.value);
                            setBankInfo(v);
                            setFocusIndex(-1);
                          }}
                        >
                          <View
                            style={{
                              paddingTop: vIndex === 0 ? 22 : 8,
                              paddingBottom: 8,
                              // backgroundColor: 'red',
                            }}
                          >
                            <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>{v?.value || ''}</CustomText>
                          </View>
                        </CustomButton>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
              <View style={{ marginTop: 53 }}>
                <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                  환불받을 계좌
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
                    ref={ref_input[0]}
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
              <View style={{ marginTop: 28, zIndex: focusIndex === 1 ? 10 : 0 }}>
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
                      color: bank !== '' ? Color.Black1000 : Color.Gray400,
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
              <View style={{ marginTop: 32 }}>
                <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>예금주</CustomText>
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
                  {focusIndex === 2 && nameClearBox}
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={1}
          windowSize={7}
          scrollEnabled={false}
          ListFooterComponent={<View style={{ height: heightInfo.mainBottomHeight }} />}
          keyboardShouldPersistTaps={'handled'}
        />
        <CustomButton
          onPress={() => patchRefundBank()}
          style={{
            height: 48,
            backgroundColor: validCheck() ? Color.Primary1000 : Color.Grayyellow200,
            borderRadius: 3,
            marginBottom: heightInfo.statusHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomText style={{ fontSize: 14, color: Color.White, fontWeight: 'bold' }}>저장하기</CustomText>
        </CustomButton>
      </View>
    </View>
  );
};
export default RefundAccountManagementScreen;
