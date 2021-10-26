import React, { useEffect } from 'react';
import { FlatList, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import AuthActions from '@/Stores/Auth/Actions';
import SmsSendView from '@/Components/SmsSendView';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthRightSideItem from '@/Components/Header/AuthRightSideItem';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';

function SetSmsScreen() {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { phoneNumber, inputAuthNum, profileState } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);

  const renderBottomComponent = (smsValueValid: boolean) => {
    return (
      <View
        style={{
          width: '100%',
          paddingTop: 22,
          paddingBottom: Platform.OS === 'android' ? 22 : 53,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: smsValueValid ? Color.Primary1000 : Color.greyBtn,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginRight: 10 }}>
            <CustomText style={{ color: Color.White, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.42 }}>
              다음
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

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
                <View style={{ paddingLeft: 24 }}>
                  <CustomText
                    style={{
                      color: Color.Black1000,
                      fontSize: 21,
                      fontWeight: 'bold',
                      letterSpacing: -0.52,
                    }}
                  >
                    휴대폰 번호를 입력해주세요
                  </CustomText>
                </View>
                <SmsSendView
                  onPressNextAction={() => {
                    dispatch(
                      AuthActions.fetchSmsAuth({
                        mobile: phoneNumber.replace(/-/g, ''),
                        cert: inputAuthNum.toString(),
                        providerScreen: 'SetSmsScreen',
                      }),
                    );
                  }}
                  bottomComponent={renderBottomComponent}
                  type={profileState === 'N' ? '' : 'join'}
                />
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
          ListFooterComponent={<View style={{ marginBottom: heightInfo.fixBottomHeight }} />}
        />
      </View>
    </KeyboardSpacerProvider>
  );
}

export default SetSmsScreen;
