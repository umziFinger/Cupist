import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';

import QnaWriteList from '@/Containers/More/QnaWriteScreen/QnaWriteList';
import CommonActions from '@/Stores/Common/Actions';

const QnaWriteScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, attachFile } = useSelector((state: CommonState) => state.common);
  const {
    writeQnaValid,
    writeQnaContent,
    qnaType = { key: '앱 사용 문의', content: '앱 사용 문의' },
  } = useSelector((state: MyState) => state.my);
  const onWrite = () => {
    if (writeQnaValid) {
      const params = {
        qnaType: qnaType.key,
        files: attachFile,
        content: writeQnaContent,
      };
      dispatch(MyActions.fetchMyQnaWrite(params));
    } else {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '글자수 최소 4자 이상 작성해주세요.',
          },
        }),
      );
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" text={'문의하기'} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={() => <QnaWriteList />}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={7}
          windowSize={7}
          contentContainerStyle={{}}
          // keyboardDismissMode={'interactive'}
          showsVerticalScrollIndicator={false}
        />

        <CustomButton onPress={() => onWrite()}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
              backgroundColor: writeQnaValid ? Color.Primary1000 : Color.Grayyellow200,
              paddingVertical: 15,
              marginBottom: heightInfo.statusHeight,
              marginHorizontal: 24,
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
              문의하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  );
};

export default QnaWriteScreen;
