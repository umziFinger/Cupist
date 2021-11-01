import React, { useEffect, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import InputAuthPhone, { AuthPhoneEnum } from '@/Components/Input/AuthPhone';

import useInputPhoneNumber from '@/Hooks/useInputPhoneNumber';
import InputSmsAuthNumber from '@/Components/Input/SmsAuthNumber';
import useInputAuthNumber from '@/Hooks/useInputAuthNumber';

import InputName from '@/Components/Input/Name';
import InputNickname from '@/Components/Input/Nickname';
import useInputName from '@/Hooks/useInputName';
import useInputNickname from '@/Hooks/useInputNickname';

const JoinStepThreeScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  return (
    <KeyboardSpacerProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
          <FlatList
            data={[0]}
            renderItem={() => (
              <View style={{ flex: 1, paddingTop: 44 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <CustomText
                      style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}
                    >
                      상주 볼링장이 있으신가요?
                    </CustomText>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={7}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
          />

          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </View>
      </View>
    </KeyboardSpacerProvider>
  );
};
export default JoinStepThreeScreen;
