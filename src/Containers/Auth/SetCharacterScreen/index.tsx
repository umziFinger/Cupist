import React, { useEffect } from 'react';
import { FlatList, View, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonState } from '@/Stores/Common/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import InputView from './InputView';
import AuthRightSideItem from '@/Components/Header/AuthRightSideItem';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import { AuthState } from '@/Stores/Auth/InitialState';

const { height } = Dimensions.get('window');

function SetCharacterScreen() {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { profileState } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    return () => {
      // dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
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
                <View style={{ paddingLeft: 24 }}>
                  <CustomText
                    style={{
                      color: Color.Black1000,
                      fontSize: 21,
                      fontWeight: 'bold',
                      letterSpacing: -0.52,
                    }}
                  >
                    이름과 생년월일을 입력해주세요
                  </CustomText>
                </View>
                <InputView />
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
            // paddingHorizontal: 24,
            // paddingBottom: 20,
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

export default SetCharacterScreen;
