import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, Platform, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import produce from 'immer';
import Header from '@/Components/Header';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import CustomText from '@/Components/CustomText';
import CardDefaultInput from '@/Containers/Reservation/AddCardScreen/CardDefaultInput';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';

const SimplePasswordScreen = () => {
  const InputRef = useRef<any>();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const [paymentPwd, setPaymentPwd] = useState<string>('');
  const [showArr, setShowArr] = useState<Array<boolean>>([false, false, false, false, false, false]);

  const onChangeText = (text: string) => {
    setPaymentPwd(text);
    produce(showArr, (draft) => {
      if (text.length > 0) {
        if (!draft[text.length - 1]) {
          draft[text.length - 1] = true;
        } else {
          draft[text.length] = false;
        }
      } else {
        draft[text.length] = false;
      }
      setShowArr([...draft]);
    });
  };

  const onFocus = () => {
    // console.log(InputRef);
    InputRef.current.focus();
  };
  return (
    <CustomButton
      onPress={() => Keyboard.dismiss()}
      effect={false}
      style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.statusHeight + 44 }}
    >
      <Header type={'close'} />
      <KeyboardSpacerProvider>
        <View style={{ flex: 0.45 }} />
        <View style={{ flex: 0.55, alignItems: 'center' }}>
          <View style={{}}>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold', letterSpacing: -0.25 }}>
              비밀번호 등록
            </CustomText>
          </View>

          <CustomButton onPress={() => onFocus()} style={{ paddingTop: 24 }}>
            <FlatList
              data={[0, 1, 2, 3, 4, 5]}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: showArr[index] ? Color.Primary1000 : Color.Gray400,
                    borderRadius: 50,
                    marginHorizontal: 4,
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={6}
              maxToRenderPerBatch={9}
              windowSize={7}
              horizontal
            />
          </CustomButton>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </KeyboardSpacerProvider>
      <TextInput
        ref={InputRef}
        autoCompleteType="off"
        placeholderTextColor={Color.Gray300}
        style={{
          color: 'transparent',
          fontSize: 0,
          padding: 0,
        }}
        autoFocus
        keyboardType="number-pad"
        autoCorrect={false}
        maxLength={6}
        onChangeText={(text) => onChangeText(text)}
        value={paymentPwd}
        allowFontScaling={false}
      />
    </CustomButton>
  );
};

export default SimplePasswordScreen;
