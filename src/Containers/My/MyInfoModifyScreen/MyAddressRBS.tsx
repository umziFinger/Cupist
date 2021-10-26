import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Platform, TextInput, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import MyActions from '@/Stores/My/Actions';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';
import CustomButton from '@/Components/CustomButton';

const { height } = Dimensions.get('window');

const MyAddressRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { isOpenMyAddressRBS } = useSelector((state: CommonState) => state.common);
  const { myAddress, myAddressDetail, myAddressPost } = useSelector((state: AuthState) => state.auth);
  const [paddingBottom, setPaddingBottom] = useState<number>(45);

  useEffect(() => {
    if (isOpenMyAddressRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenMyAddressRBS]);

  const onPressSearchAddress = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'addressRbsType', data: 'my' }));
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenMyAddressRBS', data: false }));
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSearchAddressRBS', data: true }));
  };

  const onChangeDetailAddress = (value: string) => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'myAddressDetail', data: value }));
  };

  const onPressSave = () => {
    if (myAddress && myAddressDetail && myAddressPost) {
      const params = {
        address: myAddress,
        address_detail: myAddressDetail,
        address_post: myAddressPost,
      };
      dispatch(MyActions.fetchMyUserInfoPatch(params));
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenMyAddressRBS', data: false }));
    }
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.5}
      openDuration={500}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenMyAddressRBS', data: false }))}
    >
      <View style={{ height: height * 0.5 }}>
        <View style={{ flex: 1, marginTop: 26, paddingHorizontal: 24 }}>
          <View>
            <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}>
              배송지 정보
            </CustomText>
          </View>
          <View style={{ height: 1, backgroundColor: Color.grayDefault, marginTop: 14.5 }} />
          <View style={{ paddingHorizontal: 8, paddingTop: 23.5, flexDirection: 'row' }}>
            <View style={{ marginRight: 9 }}>
              <View style={{ flex: 1, paddingTop: 12 }}>
                <CustomText style={{ color: Color.black70, fontSize: 13, letterSpacing: -0.32 }}>주소</CustomText>
              </View>
              <View style={{ paddingBottom: 11.5 }}>
                <CustomText style={{ color: Color.black70, fontSize: 13, letterSpacing: -0.32 }}>상세주소</CustomText>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* 우편번호 영역 */}
                <CustomButton onPress={() => onPressSearchAddress()} style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: Color.grayLine,
                      paddingVertical: 10.5,
                      paddingHorizontal: 13.5,
                      borderRadius: 10,
                      marginRight: 16,
                    }}
                  >
                    <CustomText
                      style={{
                        color: Color.black70,
                        fontSize: 15,
                        letterSpacing: -0.38,
                      }}
                      numberOfLines={1}
                    >
                      {myAddressPost || ''}
                    </CustomText>
                  </View>
                </CustomButton>
                {/* 주소검색 버튼 */}
                <CustomButton onPress={() => onPressSearchAddress()} style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 14,
                      backgroundColor: Color.grayDefault,
                      borderRadius: 10,
                    }}
                  >
                    <CustomText style={{ color: Color.black70, fontSize: 13, fontWeight: '500', letterSpacing: -0.32 }}>
                      주소 검색
                    </CustomText>
                  </View>
                </CustomButton>
              </View>
              {/* 주소 영역 */}
              <CustomButton onPress={() => onPressSearchAddress()} style={{ marginTop: 16 }}>
                <View
                  style={{
                    backgroundColor: Color.grayLine,
                    paddingVertical: 10.5,
                    paddingHorizontal: 13.5,
                    borderRadius: 10,
                  }}
                >
                  <CustomText
                    style={{
                      color: Color.black70,
                      fontSize: 15,
                      letterSpacing: -0.38,
                    }}
                    numberOfLines={2}
                  >
                    {myAddress || '배송지를 입력해주세요'}
                  </CustomText>
                </View>
              </CustomButton>

              {/* 상세주소 */}
              <View
                style={{
                  backgroundColor: Color.grayLine,
                  paddingVertical: Platform.OS === 'ios' ? 12 : 6,
                  // paddingVertical: 10.5,
                  paddingHorizontal: 13.5,
                  borderRadius: 10,
                  marginTop: 16,
                }}
              >
                <TextInput
                  autoCompleteType="off"
                  placeholder="상세주소를 입력해주세요"
                  placeholderTextColor={Color.black70}
                  style={{
                    color: Color.black70,
                    fontSize: 15,
                    letterSpacing: -0.38,
                    padding: 0,
                  }}
                  autoFocus={false}
                  allowFontScaling={false}
                  keyboardType={'default'}
                  onChangeText={(value) => onChangeDetailAddress(value)}
                  onFocus={() => {
                    setPaddingBottom(30);
                  }}
                  onBlur={() => setPaddingBottom(45)}
                  autoCorrect={false}
                  value={myAddressDetail || ''}
                />
              </View>
            </View>
          </View>
        </View>
        <CustomButton onPress={() => onPressSave()}>
          <View
            style={{
              paddingTop: 30,
              paddingBottom: Platform.OS === 'ios' ? paddingBottom : 30,
              backgroundColor: myAddress && myAddressDetail && myAddressPost ? Color.Primary1000 : Color.grayLine,
              alignItems: 'center',
            }}
          >
            <CustomText style={{ color: Color.White, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}>
              저장
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </RBSheet>
  );
};

export default MyAddressRBS;
