import React from 'react';
import { View, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import InputView from '@/Containers/Auth/FindPasswordScreen/InputView';

const FindPasswordScreen = () => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? heightInfo.statusHeight : undefined}
    >
      <Header type={'back'} />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
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
                    비밀번호 찾기
                  </CustomText>
                </View>

                <View style={{ marginTop: 16 }}>
                  <CustomText
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      letterSpacing: -0.2,
                      color: Color.Gray800,
                    }}
                  >
                    가입하신 이메일 주소를 입력해주세요.
                  </CustomText>
                </View>
                <View style={{ marginTop: 4 }}>
                  <CustomText
                    style={{
                      fontSize: 13,
                      letterSpacing: -0.2,
                      color: Color.Gray800,
                    }}
                  >
                    이메일 주소로 임시비밀번호가 발송됩니다.
                  </CustomText>
                </View>
                {/* 이메일 & 비밀번호 입력 */}
                <InputView />
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
          keyboardShouldPersistTaps={'handled'}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default FindPasswordScreen;
