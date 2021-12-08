import React, { useEffect } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

import InputName from '@/Components/Input/Name';

import useInputName from '@/Hooks/useInputName';

import MyActions from '@/Stores/My/Actions';

const NameEditScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, isOpenKeyboard } = useSelector((state: CommonState) => state.common);
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const { userName, onChangeName, nameValidText, isNameValid, onClearName, setUserName } = useInputName();

  useEffect(() => {
    if (setUserName) {
      setUserName(userInfo?.username || '');
    }
  }, [setUserName]);

  useEffect(() => {
    return () => {
      dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  const onPressSave = () => {
    if (isNameValid) {
      const params = {
        username: userName,
      };
      dispatch(MyActions.fetchMyProfilePatch(params));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header type="close" />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1, paddingTop: 44 }}>
              {/* 이름 & 닉네임 & 휴대폰 번호 입력 */}

              <View style={{ marginTop: 48, paddingBottom: 32 - 18 }}>
                <InputName
                  nameValidText={nameValidText}
                  onChangeText={onChangeName}
                  onTextClear={onClearName}
                  value={userName}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={7}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
        />

        <View
          style={[
            { paddingBottom: heightInfo.fixBottomHeight },
            {
              transform: [{ translateY: isOpenKeyboard ? -8 : 0 }],
            },
          ]}
        >
          <CustomButton onPress={() => onPressSave()}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                borderRadius: 5,
                backgroundColor: isNameValid ? Color.Primary1000 : Color.Grayyellow200,
              }}
            >
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  letterSpacing: -0.25,
                  textAlign: 'center',
                  color: Color.White,
                }}
              >
                저장하기
              </CustomText>
            </View>
          </CustomButton>
        </View>

        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    </View>
  );
};
export default NameEditScreen;
