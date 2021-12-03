import React, { useEffect } from 'react';
import { View, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import { Color } from '@/Assets/Color';
import InputView from './InputView';
import { navigate } from '@/Services/NavigationService';
import Header from '@/Components/Header';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  const onPressJoin = () => {
    navigate('AgreeScreen');
  };

  const onPressFindPassword = () => {
    console.log('onPressFindPassword');
    navigate('FindPasswordScreen');
  };

  return (
    <>
      <Header type={'back'} />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: '#ffffff' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? heightInfo.statusHeight : undefined}
        >
          <FlatList
            data={[0]}
            renderItem={() => (
              <View
                style={{
                  flex: 1,
                }}
              >
                <View style={{ paddingTop: 44, flex: 1 }}>
                  <View style={{}}>
                    <CustomText
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        letterSpacing: -0.4,
                        color: Color.Black1000,
                      }}
                    >
                      이메일로 시작하기
                    </CustomText>
                  </View>

                  {/* 이메일 & 비밀번호 입력 */}
                  <InputView />

                  <CustomButton onPress={() => onPressFindPassword()}>
                    <View style={{ alignItems: 'center', marginTop: 16 }}>
                      <CustomText
                        style={{
                          fontSize: 12,
                          letterSpacing: 0,
                          color: Color.Gray400,
                          textDecorationLine: 'underline',
                          textDecorationColor: Color.Gray400,
                        }}
                      >
                        비밀번호를 잊으셨나요?
                      </CustomText>
                    </View>
                  </CustomButton>
                </View>
              </View>
            )}
            // contentContainerStyle={{ backgroundColor: 'red', flex: 1 }}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={3}
            maxToRenderPerBatch={6}
            windowSize={7}
            showsVerticalScrollIndicator={false}
            renderToHardwareTextureAndroid
            ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
          />
        </KeyboardAvoidingView>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: heightInfo.fixBottomHeight + 16,
          }}
        >
          <CustomButton onPress={() => onPressJoin()} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
            <View style={{ alignItems: 'center' }}>
              <CustomText
                style={{
                  fontSize: 12,
                  letterSpacing: 0,
                  color: Color.Gray700,
                }}
              >
                아직 볼리미 회원이 아니신가요?
              </CustomText>
              <View style={{ marginTop: 8 }}>
                <CustomText style={{ fontSize: 15, fontWeight: '500', letterSpacing: -0.2, color: Color.Black1000 }}>
                  이메일로 가입
                </CustomText>
              </View>
            </View>
          </CustomButton>
        </View>
      </View>
    </>
  );
};
export default LoginScreen;
