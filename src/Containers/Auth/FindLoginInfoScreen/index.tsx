import React, { useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import { CommonState } from '@/Stores/Common/InitialState';
import FindIdInput from '@/Containers/Auth/FindLoginInfoScreen/FindIdInput';
import TempPasswordInput from '@/Containers/Auth/FindLoginInfoScreen/TempPasswordInput';
import CustomButton from '@/Components/CustomButton';
import { navigateGoBack } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';

const FindLoginInfoScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { foundId, foundPw } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'foundId', data: null }));
      dispatch(AuthActions.fetchAuthReducer({ type: 'foundPw', data: null }));
    };
  }, []);

  return (
    <KeyboardSpacerProvider>
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <Header type="back" />
        <FlatList
          data={[0]}
          renderItem={() => (
            <View
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <View style={{ flex: 1 }}>
                <View>
                  <View style={{ paddingLeft: 24 }}>
                    <CustomText
                      style={{
                        color: Color.Black1000,
                        fontSize: 21,
                        fontWeight: 'bold',
                        letterSpacing: -0.52,
                      }}
                    >
                      아이디 찾기
                    </CustomText>
                  </View>
                  {foundId && (
                    <View style={{ paddingLeft: 24, marginTop: 20 }}>
                      <View style={{ justifyContent: 'center' }}>
                        <CustomText style={{ color: Color.Black1000, fontSize: 14 }}>
                          {`회원님의 아이디는 `}
                          <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold' }}>
                            {foundId}
                          </CustomText>
                          <CustomText style={{ color: Color.Black1000, fontSize: 14 }}> 입니다.</CustomText>
                        </CustomText>
                      </View>
                    </View>
                  )}
                  <FindIdInput />
                </View>
                <View>
                  <View style={{ marginTop: 58, paddingLeft: 24 }}>
                    <CustomText
                      style={{
                        color: Color.Black1000,
                        fontSize: 21,
                        fontWeight: 'bold',
                        letterSpacing: -0.52,
                      }}
                    >
                      임시비밀번호 발급
                    </CustomText>
                  </View>
                  {foundPw && (
                    <View style={{ paddingLeft: 24, marginTop: 20 }}>
                      <View style={{ justifyContent: 'center' }}>
                        <CustomText style={{ color: Color.Black1000, fontSize: 14 }}>
                          {`임시 비밀번호가 발급되었습니다.\n발급된 임시 비밀번호로 로그인해주세요.`}
                        </CustomText>
                      </View>
                    </View>
                  )}
                  <TempPasswordInput />
                </View>

                {Platform.OS === 'ios' && <KeyboardSpacer />}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={7}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 40,
          }}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        />
        <CustomButton onPress={() => navigateGoBack()}>
          <View
            style={{
              backgroundColor: Color.Primary1000,
              width: '100%',
              height: Platform.OS === 'ios' ? 64 + heightInfo.fixBottomHeight : 64,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomText
              style={{
                color: Color.White,
                fontSize: 17,
                fontWeight: 'bold',
                letterSpacing: -0.42,
                marginBottom: Platform.OS === 'ios' ? 15 : 0,
              }}
            >
              취소
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </KeyboardSpacerProvider>
  );
};

export default FindLoginInfoScreen;
